import React, { useEffect, useState, useCallback } from 'react';
import { courseAPI } from '../services/api';
import CourseCard from '../components/CourseCard';

const CATEGORIES = ['all', 'AI', 'Web Development', 'Data Science', 'Cybersecurity', 'Cloud', 'Mobile'];
const LEVELS = ['all', 'beginner', 'intermediate', 'advanced'];
const SORTS = [{ value: 'popular', label: 'Most Popular' }, { value: 'rating', label: 'Top Rated' }, { value: 'newest', label: 'Newest' }, { value: 'price', label: 'Price: Low' }];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await courseAPI.getAll({ search, category, level, sort, page, limit: 12 });
      setCourses(res.data.courses);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [search, category, level, sort, page]);

  useEffect(() => { setPage(1); }, [search, category, level, sort]);
  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  return (
    <div className="page page-with-nav">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700 }}>Explore Courses</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>{total} courses available</p>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: 24, padding: 20 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <input className="input" style={{ flex: 1, minWidth: 200 }} placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="input" style={{ width: 'auto' }} value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
          </select>
          <select className="input" style={{ width: 'auto' }} value={level} onChange={e => setLevel(e.target.value)}>
            {LEVELS.map(l => <option key={l} value={l}>{l === 'all' ? 'All Levels' : l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
          </select>
          <select className="input" style={{ width: 'auto' }} value={sort} onChange={e => setSort(e.target.value)}>
            {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {/* Category chips */}
        <div className="chips" style={{ marginTop: 14 }}>
          {CATEGORIES.map(c => (
            <button key={c} type="button" className={`chip ${category === c ? 'selected' : ''}`} onClick={() => setCategory(c)}>
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-screen" style={{ minHeight: 300 }}><div className="spinner" /></div>
      ) : courses.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🔍</div>
          <h3>No courses found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <>
          <div className="grid-courses">
            {courses.map(c => <CourseCard key={c._id} course={c} />)}
          </div>
          {pages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
              <button className="btn btn-outline btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
              <span style={{ display: 'flex', alignItems: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>Page {page} of {pages}</span>
              <button className="btn btn-outline btn-sm" disabled={page === pages} onClick={() => setPage(p => p + 1)}>Next →</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
