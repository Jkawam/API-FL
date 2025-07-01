
require('dotenv').config(); 

const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER,    
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST, 
    dialect: process.env.DB_DIALECT, 
    port: process.env.DB_PORT, 
    logging: false,
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
    process.exit(1); 
  }
}

testConnection(); 

module.exports = sequelize; 