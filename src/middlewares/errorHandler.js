/**
 * Middleware de tratamento de erros global para a API.
 * Captura erros que ocorrem nas rotas e envia uma resposta JSON padronizada.
 *
 * @param {Error} err - O objeto de erro.
 * @param {Object} req - O objeto de requisição do Express.
 * @param {Object} res - O objeto de resposta do Express.
 * @param {Function} next - A função para passar o controle para o próximo middleware.
 */
module.exports = (err, req, res, next) => {
    // Loga o erro completo no console do servidor para depuração.
    // Em produção, você pode querer usar uma ferramenta de log mais robusta.
    console.error('Erro capturado pelo middleware:', err);

    // Define o status code da resposta.
    // Se o erro tiver um 'statusCode' (ex: erros de validação, não encontrado), usa-o.
    // Caso contrário, assume 500 (Erro Interno do Servidor) como padrão.
    const statusCode = err.statusCode || 500;

    // Define a mensagem de erro a ser enviada ao cliente.
    // Se o erro tiver uma 'message', usa-a.
    // Caso contrário, usa uma mensagem genérica para evitar expor detalhes internos em produção.
    const message = err.message || 'Erro interno do servidor.';

    // Envia a resposta de erro padronizada em formato JSON.
    res.status(statusCode).json({
        status: 'error', // Indica que houve um erro
        statusCode: statusCode, // O código HTTP do erro
        message: message, // A mensagem de erro
        // Em ambiente de desenvolvimento, você pode adicionar mais detalhes do erro para depuração:
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
