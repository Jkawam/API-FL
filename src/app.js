const express = require('express');
const app = express();
require('dotenv').config(); 


const validateToken = require('./middlewares/validateToken');

const errorHandler = require('./middlewares/errorHandler'); 


app.use(express.json()); 


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes'); 


app.use((req, res, next) => {
    const protectedMethods = ['POST', 'PUT', 'DELETE'];

    const isAuthRoute = req.path.startsWith('/api/v1/auth');


    if (protectedMethods.includes(req.method) && !isAuthRoute) {

        return validateToken(req, res, next);
    }


    next();
});



app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes); 

app.use('/api/v1/categories', categoryRoutes); 


app.use('/api/v1/product', productRoutes); 



app.get('/api/v1', (req, res) => {
    res.send('API está funcionando na versão 1!');
});


app.use(errorHandler);

module.exports = app;