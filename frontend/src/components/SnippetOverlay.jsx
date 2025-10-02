import React, { useState, useEffect } from 'react';
import './SnippetOverlay.css';

const LANGUAGES = ["JavaScript", "Python", "Java", "Go", "C#", "PHP", "Other"];

const SnippetOverlay = ({ snippet, onCancel, onSave, onDelete }) => {
  const [title, setTitle] = useState(snippet.title);
  const [category, setCategory] = useState(snippet.category);
  const [language, setLanguage] = useState(snippet.language || LANGUAGES[0]);
  const [content, setContent] = useState(snippet.content);

  useEffect(() => {
    setTitle(snippet.title);
    setCategory(snippet.category);
    setContent(snippet.content);
    if (snippet.category === 'Code') {
      setLanguage(snippet.language || LANGUAGES[0]);
    }
  }, [snippet]);

  const handleSave = () => {
    const updatedSnippet = { ...snippet, title, category, content };
    if (category === 'Code') {
      updatedSnippet.language = language;
    } else {
      delete updatedSnippet.language;
    }
    onSave(updatedSnippet);
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>Edit Snippet</h2>
        <div className="form-group">
          <label htmlFor="edit-title">Title</label>
          <input id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="edit-category">Category</label>
          <input id="edit-category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        {category === 'Code' && (
          <div className="form-group">
            <label htmlFor="edit-language">Language</label>
            <select id="edit-language" value={language} onChange={(e) => setLanguage(e.target.value)}>
              {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="edit-content">Content</label>
          <textarea id="edit-content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div className="form-actions">
          <button className="btn-danger" onClick={() => onDelete(snippet.id)}>
            Delete
          </button>
          <div>
            <button className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetOverlay;