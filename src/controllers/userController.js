const Usuario = require('../models/Usuario'); // Importa o modelo de Usuário
const { Op } = require('sequelize'); // Usaremos para operadores de Sequelize, se necessário.

/**
 * Função para obter informações do usuário por ID.
 * GET /api/v1/users/:id
 */
const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params; // Captura o ID da URL

        // Validação básica do ID (garante que é um número inteiro positivo)
        if (isNaN(id) || parseInt(id, 10) <= 0) {
            const error = new Error('ID de usuário inválido.');
            error.statusCode = 400;
            return next(error);
        }

        const user = await Usuario.findByPk(id, {
            // Seleciona apenas os campos que você deseja retornar
            attributes: ['id', 'firstname', 'surname', 'email']
        });

        if (!user) {
            const error = new Error('Usuário não encontrado.');
            error.statusCode = 404;
            return next(error);
        }

        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * Função para registrar um novo usuário.
 * POST /api/v1/users
 */
const createUser = async (req, res, next) => {
    const { firstname, surname, email, password, confirmPassword } = req.body;

    // Validação de campos obrigatórios
    if (!firstname || !surname || !email || !password || !confirmPassword) {
        const error = new Error('Todos os campos (firstname, surname, email, password, confirmPassword) são obrigatórios.');
        error.statusCode = 400;
        return next(error);
    }

    // Validação de comprimento da senha
    if (password.length < 6) {
        const error = new Error('A senha deve ter no mínimo 6 caracteres.');
        error.statusCode = 400;
        return next(error);
    }

    // Validação de correspondência de senha
    if (password !== confirmPassword) {
        const error = new Error('A senha e a confirmação de senha não coincidem.');
        error.statusCode = 400;
        return next(error);
    }

    try {
        // Verifica se o e-mail já está cadastrado
        const existingUser = await Usuario.findOne({ where: { email } });
        if (existingUser) {
            const error = new Error('Este e-mail já está cadastrado.');
            error.statusCode = 409; // Conflict
            return next(error);
        }

        // Cria o novo usuário (o hash da senha é feito automaticamente pelo hook no modelo Usuario)
        const newUser = await Usuario.create({
            firstname,
            surname,
            email,
            password
        });

        // Prepara a resposta, excluindo a senha
        const userResponse = {
            id: newUser.id,
            firstname: newUser.firstname,
            surname: newUser.surname,
            email: newUser.email,
            created_at: newUser.createdAt
        };

        return res.status(201).json({ message: 'Usuário registrado com sucesso!', user: userResponse });

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            const customError = new Error(`Erro de validação: ${validationErrors.join(', ')}`);
            customError.statusCode = 400;
            return next(customError);
        }
        next(error);
    }
};

/**
 * Função para atualizar informações de um usuário existente.
 * PUT /api/v1/users/:id
 */
const updateUser = async (req, res, next) => {
    const { id } = req.params; // ID do usuário a ser atualizado
    const { firstname, surname, email, password } = req.body; // Dados para atualização

    // Validação básica do ID
    if (isNaN(id) || parseInt(id, 10) <= 0) {
        const error = new Error('ID de usuário inválido.');
        error.statusCode = 400;
        return next(error);
    }

    // Verifica se há pelo menos um campo para atualizar
    if (!firstname && !surname && !email && !password) {
        const error = new Error('Pelo menos um campo (firstname, surname, email ou password) deve ser fornecido para atualização.');
        error.statusCode = 400;
        return next(error);
    }

    try {
        const user = await Usuario.findByPk(id);

        if (!user) {
            const error = new Error('Usuário não encontrado.');
            error.statusCode = 404;
            return next(error);
        }

        // Se o email for fornecido, verifica se já existe para outro usuário
        if (email && email !== user.email) {
            const existingUserWithEmail = await Usuario.findOne({ where: { email } });
            if (existingUserWithEmail && existingUserWithEmail.id !== user.id) {
                const error = new Error('Este e-mail já está em uso por outro usuário.');
                error.statusCode = 409; // Conflict
                return next(error);
            }
        }

        // Atualiza os campos se eles forem fornecidos no payload
        if (firstname) user.firstname = firstname;
        if (surname) user.surname = surname;
        if (email) user.email = email;
        if (password) {
            // Se a senha for alterada, o hook beforeUpdate no modelo Usuario fará o hash automaticamente.
            if (password.length < 6) {
                const error = new Error('A nova senha deve ter no mínimo 6 caracteres.');
                error.statusCode = 400;
                return next(error);
            }
            user.password = password;
        }

        await user.save(); // Salva as alterações no banco de dados

        // Retorna 204 No Content, conforme solicitado
        return res.status(204).send();

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            const customError = new Error(`Erro de validação: ${validationErrors.join(', ')}`);
            customError.statusCode = 400;
            return next(customError);
        }
        next(error);
    }
};

/**
 * Função para deletar um usuário existente.
 * DELETE /api/v1/users/:id
 */
const deleteUser = async (req, res, next) => {
    const { id } = req.params; // ID do usuário a ser deletado

    // Validação básica do ID
    if (isNaN(id) || parseInt(id, 10) <= 0) {
        const error = new Error('ID de usuário inválido.');
        error.statusCode = 400;
        return next(error);
    }

    try {
        const user = await Usuario.findByPk(id);

        if (!user) {
            const error = new Error('Usuário não encontrado.');
            error.statusCode = 404;
            return next(error);
        }

        await user.destroy(); // Deleta o usuário do banco de dados

        // Retorna 204 No Content, conforme solicitado
        return res.status(204).send();

    } catch (error) {
        // Qualquer outro erro inesperado é passado para o errorHandler
        next(error);
    }
};


module.exports = {
    getUserById,
    createUser,
    updateUser,
    deleteUser, // Exporta a nova função de exclusão de usuário
};
