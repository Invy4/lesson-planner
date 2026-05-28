import React from 'react';
import './Header.css';

export default function Header({ currentTime }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="firstcry-logo-wrapper">
          <div className="firstcry-logo-main">
            <span className="firstcry-letter orange">f</span>
            <span className="firstcry-letter orange">i</span>
            <span className="firstcry-letter orange">r</span>
            <span className="firstcry-letter orange">s</span>
            <span className="firstcry-letter orange">t</span>
            <span className="firstcry-letter magenta">c</span>
            <span className="firstcry-letter lime">r</span>
            <span className="firstcry-letter blue">y</span>
            <span className="firstcry-com-bubble">.com</span>
          </div>
          <p className="firstcry-tagline">big store for little ones</p>
        </div>
        <div className="header-divider-vertical"></div>
        <h1 className="header-app-title">Lesson Planner</h1>
      </div>

      {/* Live Date and Time */}
      <div className="live-clock">
        <div className="clock-time">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
        <div className="clock-date">
          {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>
    </header>
  );
}
