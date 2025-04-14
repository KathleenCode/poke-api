import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// API route to fetch Pokémon data
app.get('/api/pokemon/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!response.ok) throw new Error("Pokemon not found");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`🟢 Server running at http://localhost:${PORT}`));
