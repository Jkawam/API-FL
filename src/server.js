

const app = require('./app');
const sequelize = require('./config/sequelize');


const Usuario = require('./models/Usuario');
const Categoria = require('./models/Category');
const Product = require('./models/Product');
const ProductImage = require('./models/ProductImage');
const ProductOption = require('./models/ProductOption');
const ProductOptionValue = require('./models/ProductOptionValue');
const ProductCategory = require('./models/ProductCategory');

const PORT = process.env.PORT || 3000;


sequelize.sync({ force: false }) 
.then(() => {
    console.log('Banco de dados e tabelas sincronizadas!');
    app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    });
})
.catch(err => {
    console.error('Erro ao sincronizar o banco de dados ou iniciar o servidor:', err);
    process.exit(1);
});