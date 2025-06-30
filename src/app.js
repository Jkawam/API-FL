const express = require('express');
const app = express();
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const validateToken = require('./middlewares/validateToken'); // Importa o middleware de validação de token

// Middlewares
app.use(express.json()); // Permite que o Express leia JSON do corpo da requisição

// --- Importa as Rotas ---
const authRoutes = require('./routes/authRoutes');       // Rotas de autenticação (registro e login)
const userRoutes = require('./routes/userRoutes');       // Rotas de usuário (como o GET by ID)
const categoryRoutes = require('./routes/categoryRoutes'); // Rotas de categoria
const errorHandler = require('./middlewares/errorHandler'); // Middleware de tratamento de erros

// --- Lógica de Proteção de Rotas ---
// Este middleware protegerá métodos específicos (POST, PUT, DELETE)
// exigindo um token válido, exceto para as rotas de autenticação.
app.use((req, res, next) => {
    const protectedMethods = ['POST', 'PUT', 'DELETE'];
    // Verifica se a rota NÃO começa com '/api/v1/auth' (rotas de login/registro)
    const isAuthRoute = req.path.startsWith('/api/v1/auth');

    if (protectedMethods.includes(req.method) && !isAuthRoute) {
        // Se for um método protegido e NÃO for uma rota de autenticação,
        // valida o token antes de prosseguir.
        return validateToken(req, res, next);
    }

    // Para outros métodos (GET) ou rotas de autenticação, apenas avança para o próximo middleware/rota.
    next();
});

// --- Rotas da API ---
// Usa as rotas de autenticação sob o prefixo '/api/v1/auth'
app.use('/api/v1/auth', authRoutes);

// Usa as rotas de usuário sob o prefixo '/api/v1/users'
app.use('/api/v1/users', userRoutes);

// Usa as rotas de categoria sob o prefixo '/api/v1/categories'
app.use('/api/v1/categories', categoryRoutes);

// Uma rota de teste para a raiz da API
app.get('/api/v1', (req, res) => {
    res.send('API está funcionando na versão 1!');
});

// --- Tratamento de Erros ---
// IMPORTANTE: Este middleware deve ser o ÚLTIMO a ser adicionado,
// depois de todas as suas rotas e outros middlewares normais.
app.use(errorHandler);

module.exports = app;