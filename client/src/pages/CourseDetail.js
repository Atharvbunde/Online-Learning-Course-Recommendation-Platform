import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseAPI, enrollmentAPI, progressAPI } from '../services/api';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [msg, setMsg] = useState('');
  const [activeLesson, setActiveLesson] = useState(0);

  useEffect(() => {
    Promise.all([
      courseAPI.getById(id),
      enrollmentAPI.checkEnrollment(id),
      progressAPI.get(id)
    ]).then(([c, e, p]) => {
      setCourse(c.data.course);
      setEnrollment(e.data.enrollment);
      setProgress(p.data.progress);
    }).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true); setMsg('');
    try {
      const res = await enrollmentAPI.enroll(id);
      setEnrollment(res.data.enrollment);
      setMsg(res.data.message);
      const p = await progressAPI.get(id);
      setProgress(p.data.progress);
    } catch (e) { setMsg(e.response?.data?.message || 'Error'); }
    finally { setEnrolling(false); }
  };

  const markLesson = async (lessonIdx) => {
    try {
      const res = await progressAPI.update(id, { lessonIndex: lessonIdx, timeSpent: course.lessons[lessonIdx]?.duration || 10 });
      setProgress(res.data.progress);
      setMsg(res.data.message);
    } catch (e) { console.error(e); }
  };

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;
  if (!course) return <div className="page page-with-nav"><p>Course not found</p></div>;

  const enrolled = !!enrollment;
  const pct = progress?.progressPercent || 0;
  const completed = progress?.completedLessons || [];

  return (
    <div className="page page-with-nav">
      <button className="btn btn-outline btn-sm" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>← Back</button>
      {msg && <div className={`alert ${msg.includes('❌') || msg.includes('Error') ? 'alert-error' : 'alert-success'}`}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        {/* Left */}
        <div>
          <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 'var(--radius-lg)', marginBottom: 24 }} onError={e => { e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'; }} />
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <span className={`badge badge-${course.category?.toLowerCase().replace(' ', '')}`}>{course.category}</span>
            <span className={`badge badge-${course.level}`}>{course.level}</span>
            {course.isFree && <span className="badge badge-free">Free</span>}
            {course.certificate && <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>🎓 Certificate</span>}
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>{course.title}</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.7 }}>{course.description}</p>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20 }}>Taught by <strong style={{ color: 'var(--text-primary)' }}>{course.instructor}</strong></p>

          <div style={{ display: 'flex', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
            {[['★', `${course.rating?.toFixed(1)} (${(course.reviewCount || 0).toLocaleString()} reviews)`],
              ['👥', `${(course.enrolledCount || 0).toLocaleString()} students`],
              ['⏱', `${course.duration} hours`],
              ['📖', `${course.totalLessons} lessons`],
              ['🌐', course.language]
            ].map(([icon, val]) => (
              <div key={val} style={{ fontSize: 14, color: 'var(--text-secondary)' }}><span style={{ color: 'var(--warning)' }}>{icon}</span> {val}</div>
            ))}
          </div>

          {/* Skills */}
          {course.skills?.length > 0 && (
            <div className="card" style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 600, marginBottom: 10 }}>Skills you'll gain</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {course.skills.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          )}

          {/* Curriculum */}
          {enrolled && course.lessons?.length > 0 && (
            <div className="card">
              <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 16 }}>Course Curriculum</div>
              {course.lessons.map((lesson, idx) => {
                const done = completed.includes(idx);
                const isActive = activeLesson === idx;
                return (
                  <div key={idx} onClick={() => setActiveLesson(idx)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, cursor: 'pointer', background: isActive ? 'var(--accent-glow)' : 'transparent', borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent', marginBottom: 4, transition: 'all 0.2s' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: done ? 'var(--success)' : 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>
                      {done ? '✓' : idx + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: done ? 400 : 500, color: done ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: done ? 'line-through' : 'none' }}>{lesson.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{lesson.type} • {lesson.duration} min</div>
                    </div>
                    {!done && <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); markLesson(idx); }}>Complete</button>}
                    {done && <span style={{ fontSize: 12, color: 'var(--success)' }}>Done</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="card" style={{ position: 'sticky', top: 80 }}>
            <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
              {course.isFree ? <span style={{ color: 'var(--success)' }}>FREE</span> : `₹${course.price}`}
            </div>
            {enrolled ? (
              <>
                <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 14, color: 'var(--success)' }}>
                  ✅ You're enrolled
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    <span>Progress</span><span style={{ color: 'var(--accent-light)', fontWeight: 700 }}>{pct}%</span>
                  </div>
                  <div className="progress-bar" style={{ height: 8 }}><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
                </div>
                {pct >= 100 && <div style={{ textAlign: 'center', color: 'var(--warning)', fontWeight: 600, marginBottom: 12 }}>🎉 Course Complete! Certificate Earned!</div>}
              </>
            ) : (
              <button className="btn btn-primary btn-lg" onClick={handleEnroll} disabled={enrolling} style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}>
                {enrolling ? 'Enrolling...' : course.isFree ? 'Enroll for Free' : 'Enroll Now'}
              </button>
            )}
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              {['🎓 Certificate of completion', '📱 Mobile & desktop access', '⭐ Full lifetime access', '💬 Community support'].map(f => <div key={f} style={{ padding: '4px 0' }}>{f}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
