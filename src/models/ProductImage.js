const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Product = require('./Product'); 

const ProductImage = sequelize.define('ProductImage', {
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
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'imagens_produto',
  timestamps: true,
  underscored: true,
});


ProductImage.belongsTo(Product, { 
  foreignKey: 'product_id',
  as: 'product',
});


Product.hasMany(ProductImage, {
  foreignKey: 'product_id',
  as: 'images',
});

module.exports = ProductImage;