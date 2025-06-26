const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const bcrypt = require('bcrypt'); 

const Usuario = sequelize.define('Usuario', {
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
    timestamps: true, 
    underscored: true 
});

// --- Hook para hashing da senha antes de salvar ---
Usuario.beforeCreate(async (usuario) => {
  const salt = await bcrypt.genSalt(10); // Gera um salt com custo 10
  usuario.password = await bcrypt.hash(usuario.password, salt); // Faz o hash da senha
});

// Hook para hashing da senha antes de atualizar (se a senha for modificada)
Usuario.beforeUpdate(async (usuario) => {
  if (usuario.changed('password')) { // Só faz o hash se a senha foi modificada
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
}
});

// Método para comparar a senha fornecida com o hash armazenado
Usuario.prototype.validPassword = async function(password) {
return await bcrypt.compare(password, this.password);
};

module.exports = Usuario;