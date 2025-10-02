import React from 'react';
import './LanguageFilter.css';

const LanguageFilter = ({ languages, selected, setSelected }) => {
  return (
    <div className="filter-container">
      <label htmlFor="language-filter">Language</label>
      <select
        id="language-filter"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="language-filter-select"
      >
        <option value="">All Languages</option>
        {languages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
    </div>
  );
};

export default LanguageFilter;