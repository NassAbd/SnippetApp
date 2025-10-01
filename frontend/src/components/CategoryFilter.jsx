import React from 'react';

const CategoryFilter = ({ categories, selected, setSelected }) => {
  return (
    <select value={selected} onChange={(e) => setSelected(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;