const express = require('express');
const app = express();
require('dotenv').config();

// Middlewares
app.use(express.json()); // Permite que o Express leia JSON do corpo da requisição

// Importa as rotas de autenticação
const authRoutes = require('./routes/authRoutes');

// Rotas
// Usa as rotas de autenticação sob o prefixo '/api/auth'
app.use('/api/auth', authRoutes);

// uma rota de teste
app.get('/api', (req, res) => {
    res.send('API está funcionando!');
});

module.exports = app;
