import React from 'react';
import './SnippetTypeFilter.css';

const SnippetTypeFilter = ({ types, selected, setSelected }) => {
  return (
    <div className="filter-container">
      <label htmlFor="type-filter">Type</label>
      <select
        id="type-filter"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="type-filter-select"
      >
        <option value="">All Types</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SnippetTypeFilter;