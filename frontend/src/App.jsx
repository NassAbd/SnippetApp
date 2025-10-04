import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import './App.css';

import SnippetList from './components/SnippetList';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import SnippetTypeFilter from './components/SnippetTypeFilter';
import CreateSnippetForm from './components/CreateSnippetForm';
import SnippetOverlay from './components/SnippetOverlay';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

function App() {
  const [snippets, setSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isCreateFormVisible, setCreateFormVisible] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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
      showToast("Snippet created ✅");
    } catch (error) {
      console.error('Failed to create snippet:', error);
      showToast("Error creating snippet ❌");
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
      showToast("Snippet updated ✅");
    } catch (error) {
      console.error('Failed to update snippet:', error);
      showToast("Error updating snippet ❌");
    }
  };

  // Ouvre le dialog de confirmation
  const requestDelete = (id) => {
    setConfirmDeleteId(id);
  };

  // Confirme et exécute la suppression
  const confirmDelete = async () => {
    try {
      await fetch(`${API_URL}/snippets/${confirmDeleteId}`, { method: 'DELETE' });
      setSnippets(snippets.filter(s => s.id !== confirmDeleteId));
      if (editingSnippet && editingSnippet.id === confirmDeleteId) {
        setEditingSnippet(null);
      }
      showToast("Snippet deleted ✅");
      setConfirmDeleteId(null);
    } catch (error) {
      console.error('Failed to delete snippet:', error);
      showToast("Error deleting snippet ❌");
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    showToast("Snippet copied ✅");
  };

  // fonction utilitaire pour afficher un toast
  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2000);
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
        onDelete={requestDelete}
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
          onDelete={() => requestDelete(editingSnippet.id)}
        />
      )}

      {confirmDeleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this snippet?"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}

      {toastVisible && (
        <Toast message={toastMessage} visible={toastVisible} />
      )}
    </div>
  );
}

export default App;
