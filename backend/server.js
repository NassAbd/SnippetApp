const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;
const snippetsFilePath = path.join(__dirname, 'snippets.json');

app.use(cors({
  origin: 'http://localhost:5175', // frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Helper function to read snippets from the JSON file
const readSnippets = () => {
  if (!fs.existsSync(snippetsFilePath)) {
    return [];
  }
  const data = fs.readFileSync(snippetsFilePath);
  return JSON.parse(data);
};

// Helper function to write snippets to the JSON file
const writeSnippets = (snippets) => {
  fs.writeFileSync(snippetsFilePath, JSON.stringify(snippets, null, 2));
};

// GET /api/snippets - List all snippets
app.get('/api/snippets', (req, res) => {
  const snippets = readSnippets();
  res.json(snippets);
});

// POST /api/snippets - Add a new snippet
app.post('/api/snippets', (req, res) => {
  const snippets = readSnippets();
  const newSnippet = { id: Date.now().toString(), ...req.body };
  snippets.push(newSnippet);
  writeSnippets(snippets);
  res.status(201).json(newSnippet);
});

// PUT /api/snippets/:id - Update an existing snippet
app.put('/api/snippets/:id', (req, res) => {
  let snippets = readSnippets();
  const { id } = req.params;
  const snippetIndex = snippets.findIndex(s => s.id === id);

  if (snippetIndex === -1) {
    return res.status(404).send('Snippet not found');
  }

  const updatedSnippet = { ...snippets[snippetIndex], ...req.body };
  snippets[snippetIndex] = updatedSnippet;
  writeSnippets(snippets);
  res.json(updatedSnippet);
});

// DELETE /api/snippets/:id - Delete a snippet
app.delete('/api/snippets/:id', (req, res) => {
  let snippets = readSnippets();
  const { id } = req.params;
  const newSnippets = snippets.filter(s => s.id !== id);

  if (snippets.length === newSnippets.length) {
    return res.status(404).send('Snippet not found');
  }

  writeSnippets(newSnippets);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});