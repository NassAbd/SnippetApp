import React from 'react';

const SnippetTypeFilter = ({ types, selected, setSelected }) => {
  return (
    <select value={selected} onChange={(e) => setSelected(e.target.value)}>
      <option value="">All Types</option>
      {types.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
};

export default SnippetTypeFilter;