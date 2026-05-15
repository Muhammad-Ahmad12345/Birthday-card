const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({ origin: true }));
app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'rubinaDB';

async function start() {
  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('responses');

  app.post('/submit', async (req, res) => {
    try {
      const doc = req.body || {};
      doc.receivedAt = new Date();
      const r = await collection.insertOne(doc);
      res.json({ success: true, id: r.insertedId });
    } catch (err) {
      console.error('Insert error', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Return latest responses (no auth, for simple admin use). Limit to 500.
  app.get('/responses', async (req, res) => {
    try {
      const rows = await collection.find({}).sort({ receivedAt: -1 }).limit(500).toArray();
      res.json(rows);
    } catch (err) {
      console.error('Fetch error', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/health', (req, res) => res.json({ ok: true }));

  // Serve static frontend from project root
  const staticDir = path.join(__dirname);
  app.use(express.static(staticDir));

  // Fallback to index.html for any non-API route (helps when serving single-page frontend)
  app.get('*', (req, res) => {
    if (req.path.startsWith('/submit') || req.path.startsWith('/responses') || req.path.startsWith('/health')) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.sendFile(path.join(staticDir, 'index.html'));
  });

  app.listen(port, () => console.log(`Server listening on http://0.0.0.0:${port}`));
}

start().catch(err => {
  console.error('Failed to start server', err);
  process.exit(1);
});
