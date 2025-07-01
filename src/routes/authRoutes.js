const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); 
const jwt = require('jsonwebtoken'); 

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('ERRO: JWT_SECRET não definido no .env!');
}




router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    
    if (!email || !password) {
        const error = new Error('E-mail e senha são obrigatórios.');
        error.statusCode = 400;
        return next(error); 
    }

    try {
        const user = await Usuario.findOne({ where: { email } });

        
        if (!user) {
            const error = new Error('Credenciais inválidas.');
            error.statusCode = 401; 
            return next(error);
        }


        const isPasswordValid = await user.validPassword(password);

        if (!isPasswordValid) {
            const error = new Error('Credenciais inválidas.');
            error.statusCode = 401;
            return next(error);
        }

        
        const tokenPayload = {
            id: user.id,
            email: user.email,
            firstname: user.firstname
        };

        
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' }); // Token expira em 1 hora

        
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
        
        next(error);
    }
});



module.exports = router;