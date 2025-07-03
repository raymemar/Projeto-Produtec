import React, { useState, useEffect } from 'react';
import { useAuth } from '../ADM/AuthContext';
import contentManager from '../utils/contentManager';
import './EditableText.css';

const EditableText = ({ 
  id, 
  initialText, 
  className = '', 
  tag = 'p',
  multiline = false,
  placeholder = 'Clique para editar...'
}) => {
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [tempText, setTempText] = useState(initialText);

  // Carregar texto salvo do contentManager
  useEffect(() => {
    const savedText = contentManager.loadText(id, initialText);
    if (savedText !== initialText) {
      setText(savedText);
    }
  }, [id, initialText]);

  const handleEdit = () => {
    if (!isAuthenticated) return;
    setTempText(text);
    setIsEditing(true);
  };

  const handleSave = () => {
    setText(tempText);
    setIsEditing(false);
    // Salvar usando contentManager
    contentManager.saveText(id, tempText);
    contentManager.markUpdate();
  };

  const handleCancel = () => {
    setTempText(text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const Tag = tag;

  if (!isAuthenticated) {
    return (
      <Tag 
        className={className} 
        dangerouslySetInnerHTML={{ __html: text || initialText }} 
      />
    );
  }

  return (
    <div className="editable-container">
      {isEditing ? (
        <div className="editing-mode">
          {multiline ? (
            <textarea
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`editable-textarea ${className}`}
              placeholder={placeholder}
              autoFocus
              rows={4}
            />
          ) : (
            <input
              type="text"
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`editable-input ${className}`}
              placeholder={placeholder}
              autoFocus
            />
          )}
          <div className="edit-buttons">
            <button onClick={handleSave} className="save-btn" title="Salvar">
              ✓
            </button>
            <button onClick={handleCancel} className="cancel-btn" title="Cancelar">
              ✕
            </button>
          </div>
        </div>
      ) : (
        <div className="view-mode" onClick={handleEdit}>
          <Tag 
            className={`${className} editable-text`}
            dangerouslySetInnerHTML={{ __html: text || initialText }}
          />
          <div className="edit-overlay">
            <span className="edit-hint">Clique para editar</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableText;
