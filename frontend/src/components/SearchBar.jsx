import React from 'react';
import './SearchBar.css';

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search snippets..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;