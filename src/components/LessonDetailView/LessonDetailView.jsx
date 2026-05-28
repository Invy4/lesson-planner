import React, { useState } from 'react';
import { ArrowLeft, Check, CheckCircle, Trash2 } from 'lucide-react';
import CategorySvg from '../CategorySvg/CategorySvg';
import './LessonDetailView.css';

export default function LessonDetailView({ lesson, onClose, onToggleComplete, onDelete, formatDateFriendly }) {
  // Determine if steps exist
  const hasSteps = lesson.steps && lesson.steps.length > 0;

  // Local checklists
  const [checkedMaterials, setCheckedMaterials] = useState(() => {
    const list = {};
    if (lesson.materials) {
      lesson.materials.forEach((_, idx) => { list[idx] = false; });
    }
    return list;
  });

  const [checkedSteps, setCheckedSteps] = useState(() => {
    const list = {};
    if (lesson.steps) {
      lesson.steps.forEach((_, idx) => { list[idx] = false; });
    }
    return list;
  });

  const toggleMaterialCheck = (idx) => {
    setCheckedMaterials(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStepCheck = (idx) => {
    setCheckedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className={`detail-view-overlay ${lesson.category}`}>
      
      {/* Detail Top Navigation */}
      <nav className="detail-nav-bar">
        <button 
          type="button" 
          className="detail-back-btn"
          onClick={onClose}
        >
          <ArrowLeft size={18} strokeWidth={3} />
          <span>Back to Dashboard</span>
        </button>

        <div className="detail-week-marker">
          📅 Classroom Plan Detail
        </div>
      </nav>

      {/* Double-Page storybook */}
      <div className="storybook-container">
        
        {/* LEFT PAGE: Category, Cover Photo, Topic, outcomes */}
        <section className="storybook-page-left">
          <div className="detail-image-box">
            {lesson.customImage ? (
              <img src={lesson.customImage} alt={lesson.topic} className="detail-image" />
            ) : (
              <div className="card-default-svg" style={{ padding: '32px' }}>
                <CategorySvg category={lesson.category} className="detail-image" />
              </div>
            )}
          </div>

          <div className="detail-meta-capsules">
            <div className="detail-capsule class">
              <span>{lesson.className}</span>
            </div>
            <div className="detail-capsule time">
              <span>{lesson.startTime} - {lesson.endTime}</span>
            </div>
            <div className="detail-capsule date">
              <span>{formatDateFriendly(lesson.date)}</span>
            </div>
          </div>

          <h1 className="detail-topic-title">{lesson.topic}</h1>

          <div className="detail-outcome-box">
            <h3 className="detail-section-title">
              <span>Learning Outcome</span>
            </h3>
            <p className="detail-outcome-text">{lesson.learningOutcome}</p>
          </div>
        </section>

        {/* RIGHT PAGE: Checklist of Materials & Steps */}
        <section className="storybook-page-right">
          
          {/* Materials checklist */}
          <div className="detail-materials-card">
            <h3 className="detail-section-title">
              <span>Materials Checklist</span>
            </h3>
            <div className="materials-interactive-grid">
              {lesson.materials && lesson.materials.map((mat, mIdx) => (
                <div 
                  key={mIdx}
                  className={`material-checkbox-item ${checkedMaterials[mIdx] ? 'checked' : ''}`}
                  onClick={() => toggleMaterialCheck(mIdx)}
                >
                  <span className="step-checkbox-box" style={{ 
                    width: '18px', 
                    height: '18px', 
                    backgroundColor: checkedMaterials[mIdx] ? 'var(--primary-color)' : 'transparent',
                    borderColor: 'var(--primary-color)'
                  }}>
                    {checkedMaterials[mIdx] && <Check size={12} strokeWidth={4} color="var(--text-dark)" />}
                  </span>
                  <span>{mat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps checklist (Optional) */}
          <div className="detail-steps-card">
            <h3 className="detail-section-title">
              <span>Preschool Step Procedure</span>
            </h3>
            
            {hasSteps ? (
              <div className="steps-interactive-list">
                {lesson.steps.map((step, sIdx) => (
                  <div 
                    key={sIdx}
                    className={`step-interactive-item ${checkedSteps[sIdx] ? 'completed' : ''}`}
                    onClick={() => toggleStepCheck(sIdx)}
                  >
                    <div className="step-checkbox-box">
                      {checkedSteps[sIdx] && <Check size={14} strokeWidth={3} />}
                    </div>
                    <div className="step-body-content">
                      <span className="step-interactive-num">Step {sIdx + 1}</span>
                      <p className="step-interactive-text">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="steps-empty-placeholder">
                ☀️ Focus on child-directed play and discovery. No structured timeline steps needed!
              </div>
            )}
          </div>

          {/* Completion Stamp Banner & Delete Action */}
          <div className="detail-completion-banner">
            {lesson.completed ? (
              <div style={{ textAlign: 'center', width: '100%' }}>
                <div className="detail-completed-stamp-box">
                  <CheckCircle size={28} />
                  <span>Lesson Fully Completed!</span>
                </div>
                <button 
                  type="button" 
                  className="detail-completed-btn-reset"
                  onClick={() => onToggleComplete(lesson.id)}
                >
                  Change back to Active Plan
                </button>
              </div>
            ) : (
              <>
                <span className="detail-completion-label">Ready to wrap up this lesson?</span>
                <button
                  type="button"
                  className="detail-complete-toggle-btn"
                  onClick={() => onToggleComplete(lesson.id)}
                >
                  <CheckCircle size={20} strokeWidth={2.5} />
                  <span>Mark Lesson as Completed</span>
                </button>
              </>
            )}

            <button
              type="button"
              className="detail-delete-btn"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this preschool lesson plan?")) {
                  onDelete(lesson.id);
                  onClose();
                }
              }}
              title="Delete Lesson Plan"
            >
              <Trash2 size={16} />
              <span>Delete Lesson Plan</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
