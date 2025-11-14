// backend/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const meRoutes = require('./routes/me');

const app = express();

// parse JSON bodies (must be before routes)
app.use(express.json());

// debug: log every incoming request method + url
app.use((req, res, next) => {
  console.log('[REQ]', req.method, req.originalUrl);
  next();
});

// CORS - allow your frontend origin or use wildcard in dev
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

// === Environment preview (helpful on startup) ===
console.log('Starting backend/index.js - reading env...');
console.log('ENV preview:', {
  MONGO_URI: process.env.MONGO_URI ? 'SET' : 'MISSING',
  JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'MISSING',
  PORT: process.env.PORT || '4000'
});

// === Connect to MongoDB ===
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/online-learning';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err && err.message ? err.message : err);
    process.exit(1);
  });

// === Mount routes ===
app.use('/api/auth', authRoutes);
app.use('/api', meRoutes);

// === Root / ping route ===
app.get('/ping', (req, res) => res.json({ ok: true, now: new Date().toISOString() }));

// === 404 handler ===
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

// === Basic error handler ===
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.stack ? err.stack : err);
  res.status(500).json({ error: 'Server error' });
});

// === Start server ===
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

