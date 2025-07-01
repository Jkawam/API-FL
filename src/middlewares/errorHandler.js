
/**

 * @param {Error} 
 * @param {Object} 
 * @param {Object} 
 * @param {Function} 
 */
module.exports = (err, req, res, next) => {

    console.error('Erro capturado pelo middleware:', err);


    const statusCode = err.statusCode || 500;


    const message = err.message || 'Erro interno do servidor.';

    
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode, 
        message: message, 
    });
};
