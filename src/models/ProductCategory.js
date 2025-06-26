
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Product = require('./Product');   
const Category = require('./Category'); 

const ProductCategory = sequelize.define('ProductCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    references: {
      model: Product,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Parte da chave primária composta
    references: {
      model: Category,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: false, // Não adiciona createdAt/updatedAt
  tableName: 'product_categories', // Nome da tabela no banco de dados
});


Product.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: 'product_id',
  otherKey: 'category_id',
  as: 'categories', 
});

Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: 'category_id',
  otherKey: 'product_id',
  as: 'products', 
});

module.exports = ProductCategory;