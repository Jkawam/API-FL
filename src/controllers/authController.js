const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');
const { gerarToken } = require('../utils/jwt');

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password ) {
        return res.status(400).json ({mensagem: 'Email e senha obrigatórios' });
    }

    try {
        const usuario = await Usuario.findOne({where: { email } });

        if (!usuario || !bcrypt.compareSync(password, usuario.senha)) {
            return res.status(400).json ({mensagem: 'Credenciais inválidas' });
        }

        const token = gerarToken({ id: usuario.id, email: usuario.email });
        return res.status(200).json({ token });
    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro no servidor' });
    }
}

module.exports = { login };