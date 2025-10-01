import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import SnippetList from "./components/SnippetList";
import SnippetForm from "./components/SnippetForm";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [snippets, setSnippets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/snippets")
      .then(res => res.json())
      .then(data => {
        setSnippets(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    if (!query) {
      setFiltered(snippets);
      return;
    }
    const fuse = new Fuse(snippets, {
      keys: ["title", "category", "content"],
      threshold: 0.3,
    });
    setFiltered(fuse.search(query).map(r => r.item));
  }, [query, snippets]);

  const addSnippet = async (snippet) => {
    const res = await fetch("http://localhost:4000/api/snippets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(snippet),
    });
    const newSnippet = await res.json();
    setSnippets([...snippets, newSnippet]);
  };

  return (
    <div className="app">
      <h1>📑 Snippet Manager</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <SnippetForm onAdd={addSnippet} />
      <SnippetList snippets={filtered} />
    </div>
  );
}

export default App;
