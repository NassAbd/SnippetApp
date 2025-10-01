import React, { useState } from 'react';

const CreateSnippetForm = ({ onCancel, onCreate }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('Code');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, category, type, content });
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Create Snippet</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="create-title">Title</label>
            <input id="create-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="create-category">Category</label>
            <input id="create-category" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
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