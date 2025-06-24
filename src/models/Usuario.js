// src/models/Usuario.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelise.js');
const db = {} // <- Caminho correto para 'src/config/sequelize.js'
const bcrypt = require('bcryptjs'); // Importe o bcryptjs
const Usuario = sequelize.define('Usuario', 

  
    
    {


id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
firstname: {
    type: DataTypes.STRING,
    allowNull: false
},
surname: {
    type: DataTypes.STRING,
    allowNull: false
},
email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
    isEmail: true
    }
},
password: {
    type: DataTypes.STRING,
    allowNull: false
}
}, {
tableName: 'usuarios',
  timestamps: true, // cria created_at e updated_at automaticamente
  underscored: true // faz os campos ficarem como snake_case no banco
    // Adiciona o campo slug
});

// --- Hook para hashing da senha antes de salvar ---
Usuario.beforeCreate(async (usuario) => {
const salt = await bcrypt.genSalt(10);
usuario.password = await bcrypt.hash(usuario.password, salt);
});

Usuario.beforeUpdate(async (usuario) => {
if (usuario.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
}
});

// Método para comparar a senha fornecida com o hash armazenado
Usuario.prototype.validPassword = async function(password) {
return await bcrypt.compare(password, this.password);
};

module.exports = Usuario;