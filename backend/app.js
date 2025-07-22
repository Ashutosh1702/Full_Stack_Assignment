// app.js
const express = require('express');
const cors = require('cors'); // Import cors
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
const adminRoutes = require('./routes/admin');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
