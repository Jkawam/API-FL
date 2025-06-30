const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); // Importa o modelo de Usuário
const jwt = require('jsonwebtoken'); // Importa o jsonwebtoken
// const Categoria = require('../models/Category'); // REMOVIDO: Não é mais necessário importar Categoria aqui

// Obtenha o SECRET do JWT do .env
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('ERRO: JWT_SECRET não definido no .env!');
    // Em um ambiente de produção, você pode querer lançar um erro ou ter um comportamento mais robusto aqui.
    // process.exit(1); // Encerra a aplicação se a variável secreta não estiver definida
    // Para desenvolvimento, um console.error pode ser suficiente, mas é crucial para produção.
}

// REMOVIDA: A rota de registro foi movida para userRoutes.js
/*
router.post('/register', async (req, res) => {
    // A lógica de registro agora está em src/controllers/userController.js
    // e é acessada via POST /api/v1/users
});
*/

// Rota de Login de Usuário
// POST /api/v1/auth/login
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    // Validação de campos obrigatórios
    if (!email || !password) {
        const error = new Error('E-mail e senha são obrigatórios.');
        error.statusCode = 400;
        return next(error); // Passa o erro para o errorHandler
    }

    try {
        const user = await Usuario.findOne({ where: { email } });

        // Verifica se o usuário existe
        if (!user) {
            const error = new Error('Credenciais inválidas.');
            error.statusCode = 401; // Unauthorized
            return next(error);
        }

        // Verifica se a senha está correta usando o método validPassword do modelo
        // (Certifique-se de que este método está implementado em src/models/Usuario.js)
        const isPasswordValid = await user.validPassword(password);

        if (!isPasswordValid) {
            const error = new Error('Credenciais inválidas.');
            error.statusCode = 401; // Unauthorized
            return next(error);
        }

        // Prepara o payload para o token JWT
        const tokenPayload = {
            id: user.id,
            email: user.email,
            firstname: user.firstname
        };

        // Gera o token JWT
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' }); // Token expira em 1 hora

        // Prepara a resposta do usuário (sem a senha)
        const userResponse = {
            id: user.id,
            firstname: user.firstname,
            surname: user.surname,
            email: user.email,
        };

        // Retorna a mensagem de sucesso, dados do usuário e o token
        return res.status(200).json({
            message: 'Login bem-sucedido!',
            user: userResponse,
            token: token
        });

    } catch (error) {
        // Qualquer outro erro inesperado é passado para o errorHandler
        next(error);
    }
});

// REMOVIDA: A rota de cadastro de categoria foi movida para categoryRoutes.js
/*
router.post('/categories', async (req, res, next) => {
    // A lógica de cadastro de categoria agora está em src/controllers/categoryController.js
    // e é acessada via POST /api/v1/categories
});
*/

module.exports = router;