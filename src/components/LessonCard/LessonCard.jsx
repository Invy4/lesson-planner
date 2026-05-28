import React from 'react';
import { Check, CheckCircle, Trash2 } from 'lucide-react';
import CategorySvg from '../CategorySvg/CategorySvg';
import './LessonCard.css';

export default function LessonCard({ lesson, onSelect, onToggleComplete, onDelete, formatDateFriendly }) {
  // Determine if steps exist
  const hasSteps = lesson.steps && lesson.steps.length > 0;

  return (
    <article 
      className={`flash-card ${lesson.completed ? 'completed' : ''}`}
      onClick={() => onSelect(lesson)}
    >
      {/* Completed Overlay Banner */}
      {lesson.completed && (
        <div className="card-completed-overlay">
          <div className="complete-overlay-stamp">
            <CheckCircle size={24} />
            <span>Completed</span>
          </div>
        </div>
      )}

      {/* Header (Time & Date) */}
      <div className="card-header-row">
        <div className="card-badge time">
          <span>{lesson.startTime} - {lesson.endTime}</span>
        </div>
        <div className="card-badge date">
          <span>{formatDateFriendly(lesson.date)}</span>
        </div>
      </div>

      {/* Flashcard Photo or Default SVG */}
      <div className="card-image-box">
        <span className="card-class-banner">{lesson.className}</span>
        {lesson.customImage ? (
          <img src={lesson.customImage} alt={lesson.topic} className="card-photo" />
        ) : (
          <div className="card-default-svg">
            <CategorySvg category={lesson.category} className="card-photo" />
          </div>
        )}
      </div>

      {/* Card Content details */}
      <div className="card-body">
        <h3 className="card-topic-title">{lesson.topic}</h3>
        
        <div className="card-outcome-pill">
          <strong>Goal: </strong>{lesson.learningOutcome}
        </div>

        {/* Materials Tags */}
        <div className="card-materials-container">
          <span className="card-section-label">Materials</span>
          <div className="materials-tags-row">
            {lesson.materials && lesson.materials.map((mat, mIdx) => (
              <span key={mIdx} className="material-tag">{mat}</span>
            ))}
          </div>
        </div>

        {/* Steps Mini Preview (Optional) */}
        {hasSteps && (
          <div className="card-steps-preview">
            <span className="card-section-label">Steps Preview</span>
            <ul className="card-step-list-mini">
              {lesson.steps.slice(0, 2).map((st, sIdx) => (
                <li key={sIdx} className="card-step-item-mini">{st}</li>
              ))}
              {lesson.steps.length > 2 && (
                <li className="card-step-item-mini" style={{ color: 'var(--text-light)', listStyle: 'none' }}>
                  ... {lesson.steps.length - 2} more steps
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Complete & Delete Button Footer */}
      <div className="card-footer">
        <button
          type="button"
          className="delete-btn"
          onClick={(e) => onDelete(lesson.id, e)}
          title="Delete Plan"
        >
          <Trash2 size={16} />
        </button>

        <button
          type="button"
          className={`tick-btn-green ${lesson.completed ? 'checked' : ''}`}
          onClick={(e) => onToggleComplete(lesson.id, e)}
          title={lesson.completed ? "Mark active" : "Mark completed"}
        >
          <Check size={18} strokeWidth={3.5} />
        </button>
      </div>

    </article>
  );
}
