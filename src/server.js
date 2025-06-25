// src/server.js

const app = require('./app');
const sequelize = require('./config/sequelize');
const Usuario = require('./models/Usuario');
const Categoria = require('./models/Category'); // <--- ADICIONE ESTA LINHA para importar o modelo Categoria

const PORT = process.env.PORT || 3000;

// Sincroniza o banco de dados e depois inicia o servidor
sequelize.sync({ force: false }) 
.then(() => {
    console.log('Banco de dados e tabelas sincronizadas!');
    app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    });
})
.catch(err => {
    console.error('Erro ao sincronizar o banco de dados ou iniciar o servidor:', err);
    process.exit(1);
});