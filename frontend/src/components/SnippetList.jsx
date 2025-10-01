import React from 'react';

const SnippetList = ({ snippets, onEdit, onDelete, onCopy }) => {
  return (
    <div className="snippet-list">
      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className="snippet-item"
          onClick={() => onEdit(snippet)}
        >
          <h3>{snippet.title}</h3>
          <p>
            {snippet.category} | {snippet.type}
          </p>
          <div className="snippet-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCopy(snippet.content);
              }}
            >
              Copy
            </button>
            <button
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