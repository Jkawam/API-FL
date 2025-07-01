// src/models/ProductOptionValue.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); 
const ProductOption = require('./ProductOption'); 

const ProductOptionValue = sequelize.define('ProductOptionValue', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  option_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductOption, 
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  value: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'opcoes_produto_valores', 
  timestamps: true,
  underscored: true,
});


ProductOptionValue.belongsTo(ProductOption, {
  foreignKey: 'option_id',
  as: 'option',
});


ProductOption.hasMany(ProductOptionValue, {
  foreignKey: 'option_id',
  as: 'values', 
});

module.exports = ProductOptionValue;