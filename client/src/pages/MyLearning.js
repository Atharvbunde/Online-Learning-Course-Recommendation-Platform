import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enrollmentAPI, progressAPI } from '../services/api';
import CourseCard from '../components/CourseCard';

export default function MyLearning() {
  const [enrollments, setEnrollments] = useState([]);
  const [summary, setSummary] = useState(null);
  const [tab, setTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([enrollmentAPI.getMyEnrollments(), progressAPI.getSummary()])
      .then(([e, s]) => { setEnrollments(e.data.enrollments); setSummary(s.data.summary); })
      .catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = enrollments.filter(e => {
    if (tab === 'all') return true;
    if (tab === 'completed') return e.progressPercent >= 100;
    if (tab === 'in-progress') return e.progressPercent > 0 && e.progressPercent < 100;
    if (tab === 'not-started') return e.progressPercent === 0;
    return true;
  });

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

  return (
    <div className="page page-with-nav">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700 }}>My Learning</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Track your progress across all enrolled courses</p>
      </div>

      {/* Stats */}
      {summary && (
        <div className="grid-4" style={{ marginBottom: 24 }}>
          {[
            { label: 'Total Enrolled', value: summary.totalCourses, icon: '📚', color: 'var(--accent-light)' },
            { label: 'Completed', value: summary.completed, icon: '🏆', color: 'var(--success)' },
            { label: 'In Progress', value: summary.inProgress, icon: '⚡', color: 'var(--warning)' },
            { label: 'Hours Spent', value: `${Math.round(summary.totalTimeMinutes / 60)}h`, icon: '⏱', color: 'var(--danger)' },
          ].map(s => (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="tabs">
        {[['all', 'All Courses'], ['in-progress', 'In Progress'], ['completed', 'Completed'], ['not-started', 'Not Started']].map(([v, l]) => (
          <button key={v} className={`tab ${tab === v ? 'active' : ''}`} onClick={() => setTab(v)}>{l}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📖</div>
          <h3>No courses here yet</h3>
          <p>Start exploring and enroll in courses to see them here</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/courses')}>Browse Courses</button>
        </div>
      ) : (
        <div className="grid-courses">
          {filtered.map(e => e.course && (
            <CourseCard key={e._id} course={e.course} progress={e.progressPercent} showProgress />
          ))}
        </div>
      )}
    </div>
  );
}
