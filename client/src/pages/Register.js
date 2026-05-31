import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const INTERESTS = ['AI', 'Web Development', 'Data Science', 'Cybersecurity', 'Cloud', 'Mobile'];
const LEVELS = ['beginner', 'intermediate', 'advanced'];

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', interests: [], level: 'beginner' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const toggleInterest = (interest) => {
    setForm(f => ({ ...f, interests: f.interests.includes(interest) ? f.interests.filter(i => i !== interest) : [...f.interests, interest] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    if (form.interests.length === 0) { setError('Please select at least one interest'); setLoading(false); return; }
    try { await register(form); navigate('/dashboard'); }
    catch (err) { setError(err.response?.data?.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo">
          <h1>Join <span>LearnFlow</span></h1>
          <p>Personalized learning powered by AI recommendations</p>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input className="input" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input className="input" type="password" placeholder="Min. 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6} />
          </div>
          <div className="input-group">
            <label>Experience Level</label>
            <select className="input" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
              {LEVELS.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
            </select>
          </div>
          <div className="input-group">
            <label>Learning Interests (select all that apply)</label>
            <div className="chips" style={{ marginTop: 4 }}>
              {INTERESTS.map(i => (
                <button type="button" key={i} className={`chip ${form.interests.includes(i) ? 'selected' : ''}`} onClick={() => toggleInterest(i)}>{i}</button>
              ))}
            </div>
          </div>
          <button className="btn btn-primary btn-lg" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
            {loading ? 'Creating account...' : 'Start Learning Free'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent)' }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}
