const Usuario = require('../models/Usuario'); 
const { Op } = require('sequelize');


const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params; 



        if (isNaN(id) || parseInt(id, 10) <= 0) {
            const error = new Error('ID de usuário inválido.');
            error.statusCode = 400;
            return next(error);
        }

        const user = await Usuario.findByPk(id, {

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


const createUser = async (req, res, next) => {
    const { firstname, surname, email, password, confirmPassword } = req.body;

    
    if (!firstname || !surname || !email || !password || !confirmPassword) {
        const error = new Error('Todos os campos (firstname, surname, email, password, confirmPassword) são obrigatórios.');
        error.statusCode = 400;
        return next(error);
    }

    
    if (password.length < 6) {
        const error = new Error('A senha deve ter no mínimo 6 caracteres.');
        error.statusCode = 400;
        return next(error);
    }

    
    if (password !== confirmPassword) {
        const error = new Error('A senha e a confirmação de senha não coincidem.');
        error.statusCode = 400;
        return next(error);
    }

    try {
        const existingUser = await Usuario.findOne({ where: { email } });
        if (existingUser) {
            const error = new Error('Este e-mail já está cadastrado.');
            error.statusCode = 409; // Conflict
            return next(error);
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


const updateUser = async (req, res, next) => {
    const { id } = req.params; 
    const { firstname, surname, email, password } = req.body;

    
    if (isNaN(id) || parseInt(id, 10) <= 0) {
        const error = new Error('ID de usuário inválido.');
        error.statusCode = 400;
        return next(error);
    }

    
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

        
        if (email && email !== user.email) {
            const existingUserWithEmail = await Usuario.findOne({ where: { email } });
            if (existingUserWithEmail && existingUserWithEmail.id !== user.id) {
                const error = new Error('Este e-mail já está em uso por outro usuário.');
                error.statusCode = 409; 
                return next(error);
            }
        }

        
        if (firstname) user.firstname = firstname;
        if (surname) user.surname = surname;
        if (email) user.email = email;
        if (password) {
            
            if (password.length < 6) {
                const error = new Error('A nova senha deve ter no mínimo 6 caracteres.');
                error.statusCode = 400;
                return next(error);
            }
            user.password = password;
        }

        await user.save(); 

        
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


const deleteUser = async (req, res, next) => {
    const { id } = req.params;



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

        await user.destroy(); 

        
        return res.status(204).send();

    } catch (error) {
        
        next(error);
    }
};


module.exports = {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
