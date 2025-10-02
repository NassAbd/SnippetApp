import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ categories, selected, setSelected }) => {
  return (
    <div className="filter-container">
      <label htmlFor="category-filter">Category</label>
      <select
        id="category-filter"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="category-filter-select"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;