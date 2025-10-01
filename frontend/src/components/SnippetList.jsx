import "./SnippetList.css";

function SnippetList({ snippets }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="snippet-list">
      {snippets.length === 0 && <p>Aucun snippet trouvé.</p>}
      {snippets.map((s) => (
        <div key={s.id} className="snippet-card">
          <div className="snippet-info">
            <h3>{s.title}</h3>
            <pre>{s.content}</pre>
            {s.category && <span className="category">{s.category}</span>}
          </div>
          <button onClick={() => copyToClipboard(s.content)}>Copier</button>
        </div>
      ))}
    </div>
  );
}

export default SnippetList;
