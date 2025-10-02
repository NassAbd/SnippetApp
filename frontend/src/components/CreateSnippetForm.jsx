import React, { useState } from 'react';
import './CreateSnippetForm.css';

const LANGUAGES = ["JavaScript", "Python", "Java", "Go", "C#", "PHP", "Other"];

const CreateSnippetForm = ({ onCancel, onCreate }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('Code');
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const snippetData = { title, category, type, content };
    if (category === 'Code') {
      snippetData.language = language;
    }
    onCreate(snippetData);
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>Create Snippet</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="create-title">Title</label>
            <input id="create-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="create-category">Category</label>
            <input id="create-category" placeholder="e.g., Code, AI, etc." value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          {category === 'Code' && (
            <div className="form-group">
              <label htmlFor="create-language">Language</label>
              <select id="create-language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="create-type">Type</label>
            <select id="create-type" value={type} onChange={(e) => setType(e.target.value)}>
              <option>Code</option>
              <option>Prompt</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="create-content">Content</label>
            <textarea id="create-content" value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSnippetForm;