const express = require('express');
const app = express();
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

// Middlewares
app.use(express.json()); // Permite que o Express leia JSON do corpo da requisição

// --- Importa as Rotas ---
const authRoutes = require('./routes/authRoutes'); // Rotas de autenticação (registro e login)
const userRoutes = require('./routes/userRoutes'); // Rotas de usuário (como o GET by ID)
const errorHandler = require('./middlewares/errorHandler'); // Middleware de tratamento de erros

// --- Rotas da API ---
// Usa as rotas de autenticação sob o prefixo '/api/v1/auth'
app.use('/api/v1/auth', authRoutes);

// Usa as rotas de usuário sob o prefixo '/api/v1/users'
// Isso significa que o endpoint GET /v1/user/:id será acessado como /api/v1/users/:id
app.use('/api/v1/users', userRoutes);

// Uma rota de teste para a raiz da API
app.get('/api/v1', (req, res) => {
    res.send('API está funcionando na versão 1!');
});


app.use(errorHandler);
