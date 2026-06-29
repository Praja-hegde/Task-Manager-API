// 404 handler
const RouteMismatchError =((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        success: false,
        error: message,
        stack: err.stack
    });
};

module.exports = {RouteMismatchError,errorHandler};
