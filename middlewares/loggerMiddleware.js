const logger=((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request received on ${req.url}`);
    next();
});

module.exports = logger;