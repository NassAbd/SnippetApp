import React, { useState, useEffect } from 'react';

const SnippetOverlay = ({ snippet, onCancel, onSave, onDelete }) => {
  const [title, setTitle] = useState(snippet.title);
  const [category, setCategory] = useState(snippet.category);
  const [content, setContent] = useState(snippet.content);

  useEffect(() => {
    setTitle(snippet.title);
    setCategory(snippet.category);
    setContent(snippet.content);
  }, [snippet]);

  const handleSave = () => {
    onSave({ ...snippet, title, category, content });
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Edit Snippet</h2>
        <div className="form-group">
          <label htmlFor="edit-title">Title</label>
          <input id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="edit-category">Category</label>
          <input id="edit-category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="edit-content">Content</label>
          <textarea id="edit-content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div className="form-actions">
          <button className="btn-danger" onClick={() => onDelete(snippet.id)}>
            Delete
          </button>
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnippetOverlay;