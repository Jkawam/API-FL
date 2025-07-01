
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Product = require('./Product');
const Category = require('./Category'); 

const ProductCategory = sequelize.define('ProductCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, 
    references: {
      model: Product,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, 
    references: {
      model: Category,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'produtos_categorias',
  timestamps: false,
  underscored: true,
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