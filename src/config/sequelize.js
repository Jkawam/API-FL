
require('dotenv').config(); // Garante que as variáveis de ambiente sejam carregadas

const { Sequelize } = require('sequelize');

// Configurações do banco de dados usando variáveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nome do banco de dados
  process.env.DB_USER,     // Usuário do banco de dados
  process.env.DB_PASSWORD, // Senha do banco de dados
  {
    host: process.env.DB_HOST, // Host do banco de dados
    dialect: process.env.DB_DIALECT, 
    port: process.env.DB_PORT, // Porta do banco de dados 
    logging: false, // Define para 'true' para ver os logs SQL no console
    define: {
      timestamps: true, 
      underscored: true, 
    },
  }
);


async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
    process.exit(1); // Encerra a aplicação se a conexão falhar
  }
}

testConnection(); 

module.exports = sequelize; 