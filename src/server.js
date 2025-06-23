const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log('Banco de dados conectado');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}).catch(err => console.error('Erro ao conectar no banco de dados:', err));
