import React from 'react';
import './SnippetList.css';

const SnippetList = ({ snippets, onEdit, onDelete, onCopy }) => {
  if (snippets.length === 0) {
    return (
      <div className="snippet-list-empty">
        <p>No snippets found. Try adjusting your filters or creating a new snippet!</p>
      </div>
    );
  }

  return (
    <div className="snippet-grid">
      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className="snippet-card"
          onClick={() => onEdit(snippet)}
        >
          <div className="snippet-card-header">
            <h3>{snippet.title}</h3>
          </div>
          <div className="snippet-card-meta">
            <span>{snippet.category}</span>
            {snippet.category === 'Code' && snippet.language && (
              <>
                <span className="separator">|</span>
                <span>{snippet.language}</span>
              </>
            )}
          </div>
          <div className="snippet-card-actions">
            <button
              className="action-btn copy-btn"
              onClick={(e) => {
                e.stopPropagation();
                onCopy(snippet.content);
              }}
            >
              Copy
            </button>
            <button
              className="action-btn delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(snippet.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SnippetList;
