// src/server.js

const app = require('./app'); // Importa sua aplicação Express (src/app.js)
const sequelize = require('./config/sequelize');
const Usuario = require('./models/Usuario');    

const PORT = process.env.PORT || 3000; // a porta

// Sincroniza o banco de dados e depois inicia o servidor
sequelize.sync({ force: false }) // { force: true } deleta e recria as tabelas 
.then(() => {
    console.log('Banco de dados e tabelas sincronizadas!');
    app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    });
})
.catch(err => {
    console.error('Erro ao sincronizar o banco de dados ou iniciar o servidor:', err);
    process.exit(1); // Encerra a aplicação se houver um erro crítico
});