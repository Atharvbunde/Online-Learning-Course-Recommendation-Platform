import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { progressAPI, enrollmentAPI, recommendationAPI, userAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      progressAPI.getSummary(),
      enrollmentAPI.getMyEnrollments(),
      recommendationAPI.get(),
      userAPI.getLeaderboard()
    ]).then(([sum, enr, rec, lb]) => {
      setSummary(sum.data.summary);
      setEnrollments(enr.data.enrollments.slice(0, 3));
      setRecommendations(rec.data.recommendations.slice(0, 3));
      setLeaderboard(lb.data.users.slice(0, 5));
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const progressMap = {};
  enrollments.forEach(e => { progressMap[e.course?._id] = e.progressPercent || 0; });

  const progressChartData = summary?.progressList?.slice(0, 5).map(p => ({
    name: p.course?.title?.slice(0, 15) + '...',
    progress: p.progressPercent
  })) || [];

  const activityData = [
    { day: 'Mon', minutes: 45 }, { day: 'Tue', minutes: 72 }, { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 90 }, { day: 'Fri', minutes: 55 }, { day: 'Sat', minutes: 120 }, { day: 'Sun', minutes: 0 }
  ];

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

  return (
    <div className="page page-with-nav">
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.06) 100%)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700 }}>{initials}</div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700 }}>Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{user?.level} learner • {user?.interests?.join(', ')}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--warning)' }}>🔥 {user?.streak || 0}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Day Streak</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent-light)' }}>⚡ {user?.totalPoints || 0}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Total Points</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--success)' }}>{summary?.completed || 0}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Completed</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-primary" onClick={() => navigate('/courses')}>Explore Courses</button>
          <button className="btn btn-outline" onClick={() => navigate('/recommendations')}>View Recommendations</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        {[
          { icon: '📚', label: 'Enrolled', value: summary?.totalCourses || 0, color: 'var(--accent-light)' },
          { icon: '✅', label: 'Completed', value: summary?.completed || 0, color: 'var(--success)' },
          { icon: '📈', label: 'Avg Progress', value: `${summary?.avgProgress || 0}%`, color: 'var(--warning)' },
          { icon: '⏱', label: 'Hours Learned', value: `${Math.round((summary?.totalTimeMinutes || 0) / 60)}h`, color: 'var(--danger)' },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid-2" style={{ marginBottom: 28 }}>
        <div className="card">
          <div className="section-header"><div><div className="section-title">Weekly Activity</div><div className="section-sub">Minutes studied per day</div></div></div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={activityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#8b8ba8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8b8ba8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#16161f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f0f0ff' }} />
              <Bar dataKey="minutes" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="section-header"><div><div className="section-title">Leaderboard</div><div className="section-sub">Top learners this week</div></div></div>
          {leaderboard.length === 0 ? <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No data yet</p> : leaderboard.map((u, i) => (
            <div className="leaderboard-row" key={u._id}>
              <div className={`rank ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}`}>#{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{u.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{u.level}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-light)' }}>⚡ {u.totalPoints}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Learning */}
      {enrollments.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div className="section-header">
            <div><div className="section-title">Continue Learning</div><div className="section-sub">Pick up where you left off</div></div>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/my-learning')}>View all</button>
          </div>
          <div className="grid-courses">
            {enrollments.map(e => e.course && <CourseCard key={e._id} course={e.course} progress={e.progressPercent} showProgress />)}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <div className="section-header">
            <div><div className="section-title">✨ Recommended for You</div><div className="section-sub">Based on your interests and learning history</div></div>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/recommendations')}>View all</button>
          </div>
          <div className="grid-courses">
            {recommendations.map(c => <CourseCard key={c._id} course={c} />)}
          </div>
        </div>
      )}
    </div>
  );
}
