const CustomError = require("./customError");

const errorHandler = (err, req, res, next) => {

    const status = err.statusCode || 500;

    res.status(status).json({
        error: {
            code: status,
            message: err.message
        }
    })
};

module.exports = { errorHandler };