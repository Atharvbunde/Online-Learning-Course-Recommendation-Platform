import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const INTERESTS = ['AI', 'Web Development', 'Data Science', 'Cybersecurity', 'Cloud', 'Mobile'];
const SKILLS = ['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Machine Learning', 'Docker', 'AWS', 'Flutter', 'Java'];
const LEVELS = ['beginner', 'intermediate', 'advanced'];

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', bio: user?.bio || '', interests: user?.interests || [], skills: user?.skills || [], level: user?.level || 'beginner' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const toggle = (field, val) => {
    setForm(f => ({ ...f, [field]: f[field].includes(val) ? f[field].filter(i => i !== val) : [...f[field], val] }));
  };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true); setMsg('');
    try {
      const res = await authAPI.updateProfile(form);
      updateUser(res.data.user);
      setMsg('Profile updated successfully!');
    } catch (err) { setMsg('Failed to update profile'); }
    finally { setSaving(false); }
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="page page-with-nav" style={{ maxWidth: 720 }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Your Profile</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 28 }}>Update your info to get better course recommendations</p>

      {/* Avatar card */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, flexShrink: 0 }}>{initials}</div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{user?.name}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{user?.email}</div>
          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--warning)' }}>🔥 {user?.streak} day streak</span>
            <span style={{ fontSize: 13, color: 'var(--accent-light)' }}>⚡ {user?.totalPoints} points</span>
            <span className={`badge badge-${user?.level}`}>{user?.level}</span>
          </div>
        </div>
      </div>

      {msg && <div className={`alert ${msg.includes('success') ? 'alert-success' : 'alert-error'}`}>{msg}</div>}

      <form onSubmit={handleSave}>
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 600, marginBottom: 16 }}>Personal Info</div>
          <div className="input-group">
            <label>Full Name</label>
            <input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="input-group">
            <label>Bio</label>
            <textarea className="input" rows={3} placeholder="Tell us about yourself..." value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} style={{ resize: 'vertical' }} />
          </div>
          <div className="input-group">
            <label>Experience Level</label>
            <select className="input" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
              {LEVELS.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
            </select>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Learning Interests</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>These power your course recommendations</div>
          <div className="chips">
            {INTERESTS.map(i => <button type="button" key={i} className={`chip ${form.interests.includes(i) ? 'selected' : ''}`} onClick={() => toggle('interests', i)}>{i}</button>)}
          </div>
        </div>

        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Your Skills</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>Helps us recommend the right next steps</div>
          <div className="chips">
            {SKILLS.map(s => <button type="button" key={s} className={`chip ${form.skills.includes(s) ? 'selected' : ''}`} onClick={() => toggle('skills', s)}>{s}</button>)}
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg" disabled={saving} style={{ width: '100%', justifyContent: 'center' }}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
