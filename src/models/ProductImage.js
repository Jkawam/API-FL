const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('ProductImage', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'product_images',
    timestamps: true,
  });
};
