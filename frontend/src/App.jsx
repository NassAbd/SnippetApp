import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import './App.css';

import SnippetList from './components/SnippetList';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import SnippetTypeFilter from './components/SnippetTypeFilter';
import CreateSnippetForm from './components/CreateSnippetForm';
import SnippetOverlay from './components/SnippetOverlay';

const API_URL = 'http://localhost:4000/api';

function App() {
  const [snippets, setSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isCreateFormVisible, setCreateFormVisible] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      const response = await fetch(`${API_URL}/snippets`);
      const data = await response.json();
      setSnippets(data);
    } catch (error) {
      console.error('Failed to fetch snippets:', error);
    }
  };

  const handleCreate = async (snippet) => {
    try {
      const response = await fetch(`${API_URL}/snippets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snippet),
      });
      const newSnippet = await response.json();
      setSnippets([...snippets, newSnippet]);
      setCreateFormVisible(false);
    } catch (error) {
      console.error('Failed to create snippet:', error);
    }
  };

  const handleUpdate = async (snippet) => {
    try {
      const response = await fetch(`${API_URL}/snippets/${snippet.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snippet),
      });
      const updatedSnippet = await response.json();
      setSnippets(snippets.map(s => s.id === snippet.id ? updatedSnippet : s));
      setEditingSnippet(null);
    } catch (error) {
      console.error('Failed to update snippet:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/snippets/${id}`, { method: 'DELETE' });
      setSnippets(snippets.filter(s => s.id !== id));
      if (editingSnippet && editingSnippet.id === id) {
        setEditingSnippet(null);
      }
    } catch (error) {
      console.error('Failed to delete snippet:', error);
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    // Maybe show a small notification later
  };

  const fuse = useMemo(() => new Fuse(snippets, {
    keys: ['title', 'content'],
    threshold: 0.3,
  }), [snippets]);

  const filteredSnippets = useMemo(() => {
    let result = snippets;

    if (searchQuery) {
      result = fuse.search(searchQuery).map(res => res.item);
    }

    if (selectedCategory) {
      result = result.filter(s => s.category === selectedCategory);
    }

    if (selectedType) {
      result = result.filter(s => s.type === selectedType);
    }

    return result;
  }, [snippets, searchQuery, selectedCategory, selectedType, fuse]);

  const categories = useMemo(() => [...new Set(snippets.map(s => s.category))], [snippets]);
  const types = useMemo(() => [...new Set(snippets.map(s => s.type))], [snippets]);

  return (
    <div className="app">
      <header className="header">
        <h1>Snippet Manager</h1>
      </header>

      <div className="controls">
        <div className="filters">
            <SearchBar query={searchQuery} setQuery={setSearchQuery} />
            <CategoryFilter categories={categories} selected={selectedCategory} setSelected={setSelectedCategory} />
            <SnippetTypeFilter types={types} selected={selectedType} setSelected={setSelectedType} />
        </div>
        <button className="create-btn" onClick={() => setCreateFormVisible(true)}>Create Snippet</button>
      </div>

      <SnippetList
        snippets={filteredSnippets}
        onEdit={setEditingSnippet}
        onDelete={handleDelete}
        onCopy={handleCopy}
      />

      {isCreateFormVisible && (
        <CreateSnippetForm
          onCancel={() => setCreateFormVisible(false)}
          onCreate={handleCreate}
        />
      )}

      {editingSnippet && (
        <SnippetOverlay
          snippet={editingSnippet}
          onCancel={() => setEditingSnippet(null)}
          onSave={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;