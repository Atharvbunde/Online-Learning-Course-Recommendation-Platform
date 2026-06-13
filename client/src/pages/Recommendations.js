import React, { useEffect, useState } from 'react';
import { recommendationAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import { useAuth } from '../context/AuthContext';

export default function Recommendations() {
  const { user } = useAuth();
  const [data, setData] = useState({ recommendations: [], trending: [], categoryBased: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    recommendationAPI.get().then(res => setData(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

  return (
    <div className="page page-with-nav">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700 }}>✨ Recommended For You</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
          Personalized based on your interests: <strong style={{ color: 'var(--accent-light)' }}>{user?.interests?.join(', ')}</strong>
        </p>
      </div>

      {/* How it works */}
      <div className="card" style={{ marginBottom: 28, background: 'rgba(99,102,241,0.06)', borderColor: 'rgba(99,102,241,0.2)' }}>
        <div style={{ fontWeight: 600, marginBottom: 12 }}>🧠 How Our Recommendation Engine Works</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {[['🎯 Interest Match', 'Courses matching your selected interests get highest priority'],
            ['🛠 Skill Match', 'Courses that build on your existing skills'],
            ['📊 Level Match', 'Content appropriate for your experience level'],
            ['⭐ Quality Score', 'High-rated, popular courses ranked higher']
          ].map(([title, desc]) => (
            <div key={title} style={{ padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI-Recommended */}
      {data.recommendations?.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <div className="section-header">
            <div><div className="section-title">Top Picks For You</div><div className="section-sub">Matched to your profile</div></div>
          </div>
          <div className="grid-courses">
            {data.recommendations.map(c => <CourseCard key={c._id} course={c} />)}
          </div>
        </div>
      )}

      {/* Trending */}
      {data.trending?.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <div className="section-header">
            <div><div className="section-title">🔥 Trending Now</div><div className="section-sub">Most enrolled courses this week</div></div>
          </div>
          <div className="grid-courses">
            {data.trending.map(c => <CourseCard key={c._id} course={c} />)}
          </div>
        </div>
      )}

      {/* Category-based */}
      {data.categoryBased?.length > 0 && (
        <div>
          <div className="section-header">
            <div><div className="section-title">More Like What You're Learning</div><div className="section-sub">Based on your enrolled categories</div></div>
          </div>
          <div className="grid-courses">
            {data.categoryBased.map(c => <CourseCard key={c._id} course={c} />)}
          </div>
        </div>
      )}

      {data.recommendations?.length === 0 && data.trending?.length === 0 && (
        <div className="empty-state">
          <div className="icon">🎯</div>
          <h3>Update your interests</h3>
          <p>Go to your profile and add interests to get personalized recommendations</p>
        </div>
      )}
    </div>
  );
}
