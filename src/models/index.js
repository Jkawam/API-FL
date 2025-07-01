const sequelize = require('../config/database'); 

const Usuario = require('./Usuario');
const Categoria = require('./Categoria');
const Produto = require('./Produto'); 


const db = {};

db.sequelize = sequelize;
db.Sequelize = require('sequelize');

db.usuarios = Usuario;
db.categorias = Categoria;
db.produtos = Produto; 
module.exports = db;