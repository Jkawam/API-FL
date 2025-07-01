const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Product = require('./Product'); 

const ProductOption = sequelize.define('ProductOption', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product, 
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shape: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  radius: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,

  },
}, {
  tableName: 'opcoes_produto',
  timestamps: true,
  underscored: true,
});


ProductOption.belongsTo(Product, { 
  foreignKey: 'product_id',
  as: 'product',
});


Product.hasMany(ProductOption, { 
  foreignKey: 'product_id',
  as: 'options',
});


module.exports = ProductOption;