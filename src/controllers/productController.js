
const sequelize = require('../config/sequelize'); 
const Product = require('../models/Product');
const ProductImage = require('../models/ProductImage');
const ProductOption = require('../models/ProductOption');
const ProductOptionValue = require('../models/ProductOptionValue');
const Category = require('../models/Category');
const ProductCategory = require('../models/ProductCategory');


exports.getAllProducts = async (req, res, next) => { /* ... */ };
exports.getProductById = async (req, res, next) => { /* ... */ };
exports.createProduct = async (req, res, next) => { /* ... */ };
exports.updateProduct = async (req, res, next) => { /* ... */ };


exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.id; 

  const t = await sequelize.transaction();

  try {
    
    const product = await Product.findByPk(productId, { transaction: t });

    if (!product) {
      const error = new Error('Produto não encontrado.');
      error.statusCode = 404;
      throw error;
    }


    await product.destroy({ transaction: t });

    
    await t.commit();

    
    return res.status(204).send();

  } catch (error) {
    
    await t.rollback();
    console.error(`Erro ao deletar produto com ID ${productId}:`, error);

    
    if (error.statusCode) { 
      return next(error);
    }
    
    next(new Error('Erro interno do servidor ao deletar produto.'));
  }
};