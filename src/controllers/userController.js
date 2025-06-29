// src/controllers/userController.js
const Usuario = require('../models/Usuario'); // Importa o modelo de Usuário
const { Op } = require('sequelize'); // Usaremos para operadores de Sequelize, se necessário.

// Função para obter informações do usuário por ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params; // Captura o ID da URL

        // Validação básica do ID (garante que é um número inteiro)
        if (isNaN(id) || parseInt(id, 10) <= 0) {
            return res.status(400).json({ message: 'ID de usuário inválido.' });
        }

        const user = await Usuario.findByPk(id, {
            // Seleciona apenas os campos que você deseja retornar
            attributes: ['id', 'firstname', 'surname', 'email']
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json(user); // Retorna o usuário encontrado
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        return res.status(500).json({ message: 'Erro interno do servidor ao buscar usuário.' });
    }
};

module.exports = {
    getUserById,
    // Em futuras etapas, você pode adicionar createUser, updateUser, deleteUser aqui
};