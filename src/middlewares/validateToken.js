const { verificarToken } = require('../utils/jwt');

function validateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json ({mensagem: 'Token não fornecido ou mal formatado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verificarToken(token);
        req.user = decoded; 
        next();
    } catch (erro) {
        return res.status(400).json ({mensagem: 'Token inválido ou expirado' });
    }
}

module.exports = validateToken;