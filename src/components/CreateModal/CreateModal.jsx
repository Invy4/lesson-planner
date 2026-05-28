import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import './CreateModal.css';

export default function CreateModal({ 
  isOpen, 
  onClose, 
  isAiModeOnly,
  newPlan, 
  setNewPlan, 
  onCreate, 
  CLASSES, 
  CATEGORIES, 
  handleStepChange, 
  addStepField, 
  removeStepField, 
  handleImageUpload,
  n8nWebhookUrl,
  setN8nWebhookUrl,
  isGenerating,
  onGenerateN8n,
  aiPreviewData,
  setAiPreviewData,
  onConfirmAiPlan,
  onEditAiPlan
}) {
  if (!isOpen) return null;

  const [n8nPrompt, setN8nPrompt] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isAiModeOnly) {
      onGenerateN8n(n8nPrompt);
    } else {
      onCreate(e);
    }
  };

  if (aiPreviewData) {
    return (
      <div className="modal-backdrop">
        <div className="modal-content" style={{ maxWidth: '640px' }}>
          
          <div className="modal-header">
            <h3 className="modal-title">🔍 AI Generated Plan Preview</h3>
            <button 
              type="button" 
              className="close-modal-btn"
              onClick={() => setAiPreviewData(null)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="modal-form-scrollable" style={{ padding: '28px' }}>
            <div className="preview-instructions" style={{ marginBottom: '20px', color: 'var(--text-light)', fontSize: '14px', fontWeight: '600' }}>
              Review the curriculum drafted by your n8n AI agent. You can add it directly to your scheduler, or go back to edit the details manually.
            </div>

            {/* Render a gorgeous styled preview card */}
            <div className="preview-card-outer" style={{ border: '3px solid var(--text-dark)', borderRadius: '20px', overflow: 'hidden', padding: '24px', background: 'white', boxShadow: '0 8px 0 var(--text-dark)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', alignItems: 'center' }}>
                <span className="card-class-banner" style={{ background: 'var(--primary-light)', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', border: '1px solid var(--primary-color)', color: 'var(--text-dark)' }}>
                  🎒 {aiPreviewData.className}
                </span>
                <span className="card-badge time" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)' }}>
                  ⏱️ {aiPreviewData.startTime} - {aiPreviewData.endTime}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-playful)', fontSize: '24px', color: 'var(--text-dark)', marginBottom: '16px' }}>
                {aiPreviewData.topic}
              </h3>

              <div style={{ background: '#F8FAFC', border: '2px solid var(--border-color)', borderRadius: '12px', padding: '14px', marginBottom: '16px' }}>
                <strong style={{ fontSize: '14px', color: 'var(--text-dark)' }}>Goal: </strong>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{aiPreviewData.learningOutcome}</span>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <strong style={{ fontSize: '13px', color: 'var(--text-dark)', display: 'block', marginBottom: '8px' }}>Materials:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {aiPreviewData.materials.map((m, idx) => (
                    <span key={idx} style={{ background: 'var(--accent-light)', color: 'var(--accent-color)', border: '1px solid var(--theme-science-border)', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {aiPreviewData.steps && aiPreviewData.steps.length > 0 && (
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--text-dark)', display: 'block', marginBottom: '8px' }}>Steps:</strong>
                  <ul style={{ paddingLeft: '20px', margin: '0', fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {aiPreviewData.steps.map((s, idx) => (
                      <li key={idx} style={{ marginBottom: '6px' }}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>

          <div className="modal-footer" style={{ background: '#F8FAFC', borderTop: '2px solid var(--border-color)', padding: '20px 32px' }}>
            <button 
              type="button" 
              className="cancel-modal-btn"
              onClick={onEditAiPlan}
              style={{ marginRight: 'auto' }}
            >
              ✏️ Back & Edit
            </button>
            
            <button 
              type="button" 
              className="submit-modal-btn"
              onClick={onConfirmAiPlan}
            >
              🎒 Add to Planner
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">
            {isAiModeOnly ? "✨ Create Lesson Plan with n8n AI" : "👶 Add New Preschool Lesson Plan"}
          </h3>
          <button 
            type="button" 
            className="close-modal-btn"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="modal-form-scrollable">
          
          <div className="form-grid-2col">
            <div className="form-row">
              <label className="form-label" htmlFor="form-class">Classroom Level</label>
              <select 
                id="form-class"
                className="form-select"
                value={newPlan.className}
                onChange={(e) => setNewPlan(prev => ({ ...prev, className: e.target.value }))}
              >
                {CLASSES.map((cls, idx) => (
                  <option key={idx} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label className="form-label" htmlFor="form-category">Activity Theme</label>
              <select 
                id="form-category"
                className="form-select"
                value={newPlan.category}
                onChange={(e) => setNewPlan(prev => ({ ...prev, category: e.target.value }))}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="form-topic">Playful Topic Name</label>
            <input 
              id="form-topic"
              type="text"
              className="form-input-text"
              placeholder="e.g. Exploring Giant Leaves 🍂"
              required
              value={newPlan.topic}
              onChange={(e) => setNewPlan(prev => ({ ...prev, topic: e.target.value }))}
            />
          </div>

          <div className="form-grid-2col">
            <div className="form-row">
              <label className="form-label" htmlFor="form-date">Lesson Calendar Date</label>
              <input 
                id="form-date"
                type="date"
                className="form-input-text"
                required
                value={newPlan.date}
                onChange={(e) => setNewPlan(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
              <div>
                <label className="form-label" htmlFor="form-start">Starts At</label>
                <input 
                  id="form-start"
                  type="time"
                  className="form-input-text"
                  required
                  value={newPlan.startTime}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, startTime: e.target.value }))}
                  style={{
                    borderColor: newPlan.startTime && newPlan.endTime && newPlan.startTime >= newPlan.endTime ? 'var(--danger-color)' : ''
                  }}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="form-end">Ends At</label>
                <input 
                  id="form-end"
                  type="time"
                  className="form-input-text"
                  required
                  value={newPlan.endTime}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, endTime: e.target.value }))}
                  style={{
                    borderColor: newPlan.startTime && newPlan.endTime && newPlan.startTime >= newPlan.endTime ? 'var(--danger-color)' : ''
                  }}
                />
              </div>
              
              {newPlan.startTime && newPlan.endTime && newPlan.startTime >= newPlan.endTime && (
                <p style={{ color: 'var(--danger-color)', fontSize: '12px', fontWeight: '700', gridColumn: 'span 2', marginTop: '6px' }}>
                  ⚠️ Error: Start time must be earlier than the End time!
                </p>
              )}
            </div>
          </div>

          {!isAiModeOnly ? (
            <>
              <div className="form-row">
                <label className="form-label" htmlFor="form-outcome">Core Learning Outcome (Target Goal)</label>
                <textarea 
                  id="form-outcome"
                  className="form-textarea"
                  placeholder="What will children explore or learn from this session?"
                  value={newPlan.learningOutcome}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, learningOutcome: e.target.value }))}
                />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="form-materials">Materials Required (Comma separated)</label>
                <input 
                  id="form-materials"
                  type="text"
                  className="form-input-text"
                  placeholder="e.g. Water colors, Drawing sheet, Paintbrush, Cups"
                  value={newPlan.materialsInput}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, materialsInput: e.target.value }))}
                />
              </div>

              {/* n8n AI Webhook Settings Box */}
              <div className="form-row n8n-generator-card">
                <div className="n8n-header-row">
                  <span className="n8n-tag">✨ n8n AI Co-Pilot</span>
                  <button 
                    type="button"
                    className="n8n-generate-btn"
                    disabled={isGenerating || !newPlan.topic.trim()}
                    onClick={() => onGenerateN8n(n8nPrompt)}
                    style={{
                      background: isGenerating ? 'var(--text-light)' : 'var(--accent-color)',
                      color: 'white',
                      border: '2px solid var(--text-dark)',
                      cursor: isGenerating || !newPlan.topic.trim() ? 'not-allowed' : 'pointer',
                      opacity: !newPlan.topic.trim() ? 0.6 : 1
                    }}
                  >
                    {isGenerating ? "🤖 n8n is writing..." : "🚀 AI-Generate & Schedule Plan"}
                  </button>
                </div>
                
                <div className="n8n-body">
                  <div style={{ marginBottom: '12px' }}>
                    <label className="form-label" htmlFor="n8n-url" style={{ fontSize: '13px', marginBottom: '6px' }}>n8n Webhook Endpoint</label>
                    <input 
                      id="n8n-url"
                      type="url"
                      className="form-input-text"
                      style={{ padding: '10px 14px', fontSize: '15px' }}
                      placeholder="https://n8n.yourdomain.com/webhook/lesson-steps"
                      value={n8nWebhookUrl}
                      onChange={(e) => setN8nWebhookUrl(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="n8n-prompt" style={{ fontSize: '13px', marginBottom: '6px' }}>AI Guideline Prompts & Custom Details (Optional)</label>
                    <textarea 
                      id="n8n-prompt"
                      className="form-input-text"
                      style={{ minHeight: '70px', padding: '10px 14px', fontSize: '14px', resize: 'vertical' }}
                      placeholder="e.g. Include outdoor leaf hunts, limit activity to 20 minutes, focus on sensory touch textures..."
                      value={n8nPrompt}
                      onChange={(e) => setN8nPrompt(e.target.value)}
                    />
                  </div>
                  
                  <p className="n8n-input-help" style={{ marginTop: '6px' }}>
                    Sends the class, topic, date, times, and prompt guidelines to n8n to auto-generate custom learning goals, materials list, and procedure steps, scheduling it directly in the feed!
                  </p>
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">
                  Step-by-Step Procedure Flow <span style={{ color: 'var(--text-light)', fontWeight: 'normal' }}>(Optional)</span>
                </label>
                <div className="modal-steps-container">
                  {newPlan.steps.map((step, idx) => (
                    <div key={idx} className="modal-step-builder-row">
                      <span className="step-num-badge">{idx + 1}</span>
                      <input 
                        type="text"
                        className="form-input-text"
                        style={{ flexGrow: 1 }}
                        placeholder={`Step ${idx + 1} details...`}
                        value={step}
                        onChange={(e) => handleStepChange(idx, e.target.value)}
                      />
                      {newPlan.steps.length > 0 && (
                        <button 
                          type="button" 
                          className="remove-step-btn"
                          onClick={() => removeStepField(idx)}
                          title="Remove Step"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    type="button" 
                    className="add-step-btn"
                    onClick={addStepField}
                  >
                    <Plus size={14} strokeWidth={3} />
                    <span>Add Procedure Step</span>
                  </button>
                </div>
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="form-image">Custom Cover Photo (Optional)</label>
                <input 
                  id="form-image"
                  type="file"
                  accept="image/*"
                  className="form-input-text"
                  onChange={handleImageUpload}
                  style={{ padding: '8px' }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-row">
                <label className="form-label" htmlFor="n8n-prompt-ai-only">AI Guideline Prompts & Custom Details (Optional)</label>
                <textarea 
                  id="n8n-prompt-ai-only"
                  className="form-textarea"
                  style={{ minHeight: '120px' }}
                  placeholder="e.g. Include outdoor leaf hunts, limit activity to 20 minutes, focus on sensory touch textures, use simple craft materials..."
                  value={n8nPrompt}
                  onChange={(e) => setN8nPrompt(e.target.value)}
                />
              </div>

              <div className="form-row" style={{ marginTop: '24px', padding: '16px', background: '#F8FAFC', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                <details>
                  <summary style={{ fontFamily: 'var(--font-playful)', fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)', cursor: 'pointer', outline: 'none' }}>
                    ⚙️ Advanced Settings (n8n Webhook URL)
                  </summary>
                  <div style={{ marginTop: '12px' }}>
                    <label className="form-label" htmlFor="n8n-url-ai-only" style={{ fontSize: '13px', marginBottom: '6px' }}>n8n Webhook Endpoint</label>
                    <input 
                      id="n8n-url-ai-only"
                      type="url"
                      className="form-input-text"
                      style={{ padding: '10px 14px', fontSize: '15px' }}
                      placeholder="https://n8n.yourdomain.com/webhook/lesson-steps"
                      value={n8nWebhookUrl}
                      onChange={(e) => setN8nWebhookUrl(e.target.value)}
                      required
                    />
                  </div>
                </details>
              </div>
            </>
          )}

          <div className="modal-footer">
            <button 
              type="button" 
              className="cancel-modal-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-modal-btn"
              disabled={isGenerating}
              style={{
                background: isGenerating ? 'var(--text-light)' : 'var(--accent-color)',
                boxShadow: isGenerating ? 'none' : '0 4px 0 var(--accent-hover)',
                cursor: isGenerating ? 'not-allowed' : 'pointer'
              }}
            >
              {isAiModeOnly ? (
                isGenerating ? "🤖 n8n is writing..." : "Generate with n8n AI 🚀"
              ) : (
                "Create & Line Up Plan 🚀"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
