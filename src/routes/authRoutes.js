const express = require('express');
const router = express.Router(); 
const Usuario = require('../models/Usuario'); // Importa o modelo de Usuário


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
    // Verifica se o email já existe
    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
    return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
    }

    // Cria o novo usuário no banco de dados
    // O hook 'beforeCreate' no modelo Usuario fará o hash da senha automaticamente
    const newUser = await Usuario.create({
        firstname,
        surname,
        email,
        password // A senha será hasheada antes de ser salva pelo hook
    });

    // Responde com o usuário criado (sem a senha, por segurança)
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
    // Erros de validação do Sequelize (ex: isEmail) também podem ser capturados aqui
    if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Erro interno do servidor ao registrar usuário.' });
}
});

module.exports = router;