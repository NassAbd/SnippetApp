import { useState } from "react";
import "./SnippetForm.css";

function SnippetForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    onAdd({ title, category, content });
    setTitle("");
    setCategory("");
    setContent("");
  };

  return (
    <form className="snippet-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Catégorie"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <textarea
        placeholder="Contenu du snippet..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default SnippetForm;
