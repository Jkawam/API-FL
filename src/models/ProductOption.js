const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Product = require('./Product'); 

const ProductOption = sequelize.define('ProductOption', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product, // Referencia o modelo Product
      key: 'id',      // A chave primária em Product
    },
    onDelete: 'CASCADE', 
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shape: {
    type: DataTypes.ENUM('square', 'circle'), // Aceita apenas 'square' ou 'circle'
    allowNull: false,
    defaultValue: 'square', 
  },
  radius: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, 
  },
  type: {
    type: DataTypes.ENUM('text', 'color'), // Aceita apenas 'text' ou 'color'
    allowNull: false,
    defaultValue: 'text', // Valor padrão 'text'
  },
  values: {
    type: DataTypes.STRING, // Armazena valores separados por vírgula (ex: "P,M,G" ou "#FFF,#000")
    allowNull: false,
    defaultValue: 'P,M,G',
    get() {
      // Getter para retornar os valores como um array
      const rawValue = this.getDataValue('values');
      return rawValue ? rawValue.split(',') : [];
    },
    set(value) {
     
      this.setDataValue('values', Array.isArray(value) ? value.join(',') : value);
    },
  },
}, {
  timestamps: false, 
  tableName: 'product_options', // Nome da tabela no banco de dados
});


Product.hasMany(ProductOption, {
  foreignKey: 'product_id',
  as: 'options', 
});
ProductOption.belongsTo(Product, {
  foreignKey: 'product_id',
});

module.exports = ProductOption;