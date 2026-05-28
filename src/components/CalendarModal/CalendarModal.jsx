import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './CalendarModal.css';

export default function CalendarModal({ isOpen, onClose, lessons, onSelectLesson, formatDateFriendly }) {
  if (!isOpen) return null;

  // May 2026 calendar configurations
  const YEAR = 2026;
  const MONTH_NAME = "May 2026";
  const DAYS_IN_MONTH = 31;
  const START_DAY_OFFSET = 5; // May 1st, 2026 is Friday (Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5)

  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate calendar grid array
  const gridCells = [];
  
  // Fill empty leading slots
  for (let i = 0; i < START_DAY_OFFSET; i++) {
    gridCells.push({ dayNumber: null, dateStr: null });
  }

  // Fill actual days of May
  for (let day = 1; day <= DAYS_IN_MONTH; day++) {
    const dayPad = day < 10 ? `0${day}` : day;
    const dateStr = `2026-05-${dayPad}`;
    gridCells.push({ dayNumber: day, dateStr });
  }

  // Get active lessons for a specific date
  const getLessonsForDate = (dateStr) => {
    if (!dateStr) return [];
    return lessons.filter(l => l.date === dateStr);
  };

  return (
    <div className="calendar-backdrop">
      <div className="calendar-modal-content">
        
        {/* Header */}
        <div className="calendar-modal-header">
          <div className="calendar-title-group">
            <h2 className="calendar-title">Preschool Term Calendar</h2>
            <span className="calendar-month-indicator">{MONTH_NAME}</span>
          </div>
          <button 
            type="button" 
            className="calendar-close-btn"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        {/* Calendar Body */}
        <div className="calendar-modal-scrollable">
          
          {/* Weekday labels */}
          <div className="calendar-weekdays-row">
            {WEEKDAYS.map((day, idx) => (
              <div key={idx} className="weekday-label">{day}</div>
            ))}
          </div>

          {/* Monthly Day Grid */}
          <div className="calendar-days-grid">
            {gridCells.map((cell, idx) => {
              const dayLessons = getLessonsForDate(cell.dateStr);
              const isToday = cell.dayNumber === 28; // Simulation: May 28, 2026 matches local metadata!
              
              return (
                <div 
                  key={idx} 
                  className={`calendar-day-cell ${cell.dayNumber === null ? 'empty' : ''} ${isToday ? 'today' : ''}`}
                >
                  {cell.dayNumber && (
                    <>
                      <div className="day-number-label">{cell.dayNumber}</div>
                      
                      <div className="day-events-list">
                        {dayLessons.map((lesson) => (
                          <div 
                            key={lesson.id} 
                            className={`day-event-capsule ${lesson.category} ${lesson.completed ? 'completed' : ''}`}
                            onClick={() => onSelectLesson(lesson)}
                            title={`${lesson.topic} (${lesson.startTime})`}
                          >
                            <span className="event-bullet">•</span>
                            <span className="event-title-text">{lesson.topic}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend/Key indicators */}
          <div className="calendar-legend">
            <span className="legend-label">Theme Key:</span>
            <div className="legend-item"><span className="bullet Science">•</span> Science</div>
            <div className="legend-item"><span className="bullet Art">•</span> Art</div>
            <div className="legend-item"><span className="bullet Music">•</span> Music</div>
            <div className="legend-item"><span className="bullet Reading">•</span> Reading</div>
            <div className="legend-item"><span className="bullet Play">•</span> Play</div>
          </div>

        </div>

      </div>
    </div>
  );
}
