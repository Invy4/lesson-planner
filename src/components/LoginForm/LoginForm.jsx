import React from 'react';
import './LoginForm.css';

export default function LoginForm({ profile, setProfile, onLogin, CLASSES }) {
  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-card-content">
          <div className="login-logo-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
            <div className="firstcry-logo-main" style={{ fontSize: '42px' }}>
              <span className="firstcry-letter orange">f</span>
              <span className="firstcry-letter orange">i</span>
              <span className="firstcry-letter orange">r</span>
              <span className="firstcry-letter orange">s</span>
              <span className="firstcry-letter orange">t</span>
              <span className="firstcry-letter magenta">c</span>
              <span className="firstcry-letter lime">r</span>
              <span className="firstcry-letter blue">y</span>
              <span className="firstcry-com-bubble" style={{ fontSize: '15px', padding: '2px 8px', borderRadius: '6px', marginBottom: '8px' }}>.com</span>
            </div>
            <p className="firstcry-tagline" style={{ fontSize: '15px', marginTop: '4px' }}>big store for little ones</p>
          </div>

          <h2 className="login-title" style={{ fontSize: '20px', color: 'var(--text-light)', marginTop: '0', marginBottom: '32px', textAlign: 'center' }}>
            Lesson Planner Dashboard
          </h2>

          <form onSubmit={onLogin}>
            <div className="form-row">
              <label className="form-label" htmlFor="teacher-name">Your Teacher Name</label>
              <input 
                id="teacher-name"
                type="text" 
                className="login-input" 
                placeholder="e.g. Ms. Emily" 
                required
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="form-row" style={{ marginBottom: '32px' }}>
              <label className="form-label" htmlFor="default-class">Primary Classroom</label>
              <select 
                id="default-class"
                className="login-input"
                value={profile.class}
                onChange={(e) => setProfile(prev => ({ ...prev, class: e.target.value }))}
              >
                {CLASSES.map((cls, idx) => (
                  <option key={idx} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="login-btn">
              Open Builder Workspace 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
