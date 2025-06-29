const jwt = require('jsonwebtoken');

const secret = 'sua_chave_secreta_aqui'; // FAZER UMA SENHA SEGURA E SUBSTITUIR NO .env

function gerarToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: '1h'});
}

function verificarToken(token) {
    return jwt.verify(token, secret);
}

module.exports = { gerarToken, verificarToken };