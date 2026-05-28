import React from 'react';
import { LogOut, Plus, Calendar, Zap } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({ 
  profile, 
  onLogout, 
  activeClassFilter, 
  setActiveClassFilter, 
  stats, 
  onOpenCreate, 
  onOpenCalendar,
  onGoToCurrent,
  CLASSES 
}) {
  // Get teacher's first letter for initials avatar placeholder
  const getInitial = (name) => {
    if (!name) return 'T';
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <aside className="dashboard-sidebar">
      
      {/* 1. Dashboard Header (Profile Section) */}
      <div className="sidebar-section profile-section">
        <div className="profile-badge-avatar">
          {getInitial(profile.name)}
        </div>
        <div className="profile-meta-details">
          <h3 className="profile-teacher-name">{profile.name}</h3>
          <p className="profile-school-tag">🏫 Sunny Days Academy</p>
          <div className="profile-active-class-pill">
            {profile.class}
          </div>
        </div>
        
        <button 
          type="button" 
          className="sidebar-logout-trigger" 
          onClick={onLogout}
          title="Logout Profile"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* 2. Class Level Dashboard Selector */}
      <div className="sidebar-section navigation-section">
        <h4 className="sidebar-section-heading">
          <span>Active Classroom</span>
        </h4>
        <div className="sidebar-input-wrapper">
          <select
            className="sidebar-dropdown-select"
            value={activeClassFilter}
            onChange={(e) => setActiveClassFilter(e.target.value)}
          >
            <option value="All Classes">🌟 All Classrooms</option>
            {CLASSES.map((cls, idx) => (
              <option key={idx} value={cls}>{cls}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Interactive Completion Progress Metrics */}
      <div className="sidebar-section progress-section">
        <h4 className="sidebar-section-heading" style={{ justifyContent: 'center' }}>
          <span>Completion Tracker</span>
        </h4>
        
        <div className="sidebar-progress-ring-box">
          <svg width="160" height="160" className="progress-ring-svg">
            <circle 
              className="progress-ring-circle-bg"
              strokeWidth="10"
              fill="transparent"
              r="65"
              cx="80"
              cy="80"
            />
            <circle 
              className="progress-ring-circle-fill"
              strokeWidth="10"
              fill="transparent"
              r="65"
              cx="80"
              cy="80"
              strokeDasharray={`${2 * Math.PI * 65}`}
              strokeDashoffset={`${2 * Math.PI * 65 - (2 * Math.PI * 65 * stats.percentage) / 100}`}
            />
          </svg>
          <div className="progress-ring-text">
            <div className="progress-ring-num">{stats.percentage}%</div>
            <div className="progress-ring-label">Done</div>
          </div>
        </div>

        <div className="sidebar-progress-text-details">
          Completed <strong>{stats.completed}</strong> of <strong>{stats.total}</strong> lessons
        </div>

        <div className="linear-progress-bar-outer">
          <div className="linear-progress-bar-inner" style={{ width: `${stats.percentage}%` }} />
        </div>
      </div>

      {/* 4. Action Buttons (Teach Current, Creation & Calendar Triggers) */}
      <div className="sidebar-section action-section">
        <button 
          type="button" 
          className="sidebar-current-lesson-btn"
          onClick={onGoToCurrent}
          title="Jump to the currently scheduled class happening right now!"
        >
          <Zap size={20} strokeWidth={2.5} />
          <span>Teach Active Class</span>
        </button>

        <button 
          type="button" 
          className="sidebar-calendar-button"
          onClick={onOpenCalendar}
        >
          <Calendar size={20} strokeWidth={2.5} />
          <span>View Term Calendar</span>
        </button>

        <button 
          type="button" 
          className="sidebar-creation-button"
          onClick={onOpenCreate}
        >
          <Plus size={20} strokeWidth={3} />
          <span>Create Lesson Plan</span>
        </button>
      </div>

    </aside>
  );
}
