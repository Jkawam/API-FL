// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); // Importa o modelo de Usuário
const jwt = require('jsonwebtoken'); // Importa o jsonwebtoken
const Categoria = require('../models/Category'); // <--- NOVA LINHA: Importa o modelo de Categoria

// Obtenha o SECRET do JWT do .env
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
console.error('ERRO: JWT_SECRET não definido no .env!');
  process.exit(1); // Encerra a aplicação se a variável secreta não estiver definida
}

// Rota de Registro de Usuário
router.post('/register', async (req, res) => {
const { firstname, surname, email, password } = req.body;


if (!firstname || !surname || !email || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
}

if (password.length < 6) {
    return res.status(400).json({ message: 'A senha deve ter no mínimo 6 caracteres.' });
}

try {

    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
    return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
    }


    const newUser = await Usuario.create({
        firstname,
        surname,
        email,
        password
    });


    const userResponse = {
        id: newUser.id,
        firstname: newUser.firstname,
        surname: newUser.surname,
        email: newUser.email,
        created_at: newUser.created_at
    };

    return res.status(201).json({ message: 'Usuário registrado com sucesso!', user: userResponse });

} catch (error) {
    console.error('Erro ao registrar usuário:', error);

    if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Erro interno do servidor ao registrar usuário.' });
}
});

// Rota de Login de Usuário
router.post('/login', async (req, res) => {
const { email, password } = req.body;

if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
}

try {
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const isPasswordValid = await user.validPassword(password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const tokenPayload = {
        id: user.id,
        email: user.email,
        firstname: user.firstname
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

    const userResponse = {
        id: user.id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
    };

    return res.status(200).json({
        message: 'Login bem-sucedido!',
        user: userResponse,
        token: token
    });

} catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ message: 'Erro interno do servidor ao fazer login.' });
}
});

// --- NOVA ROTA: Cadastrar Categoria ---
router.post('/categories', async (req, res) => {
const { name, slug, use_in_menu } = req.body;

  // Validação Básica
if (!name || !slug) {
    return res.status(400).json({ message: 'Nome e Slug são campos obrigatórios para a categoria.' });
}

try {

    const newCategory = await Categoria.create({
    name,
    slug,
      use_in_menu: use_in_menu !== undefined ? use_in_menu : false // Garante que seja boolean ou o default
    });

    return res.status(201).json({ message: 'Categoria cadastrada com sucesso!', category: newCategory });

    } catch (error) {
    console.error('Erro ao cadastrar categoria:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
    if (error.fields && error.fields.name) {
        return res.status(409).json({ message: 'Já existe uma categoria com este nome.' });
    }
    if (error.fields && error.fields.slug) {
        return res.status(409).json({ message: 'Já existe uma categoria com este slug.' });
        }
        return res.status(409).json({ message: 'Nome ou slug da categoria já existente.' });
    }
    if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Erro interno do servidor ao cadastrar categoria.' });}
});

module.exports = router;