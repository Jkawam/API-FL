const sequelize = require('../config/sequelize');
const db = {};

db.Usuario = require('./Usuario');
db.Product = require('./Product')(sequelize);
db.Category = require('./Category')(sequelize);
db.ProductImage = require('./ProductImage')(sequelize);
db.Category = require('./Category')(sequelize);


module.exports = db;