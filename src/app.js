const express = require('express');
const app = express();
require('dotenv').config();

// Middlewares
app.use(express.json());

// Rotas
// app.use('/api', require('./routes/suaRota'));

module.exports = app;
