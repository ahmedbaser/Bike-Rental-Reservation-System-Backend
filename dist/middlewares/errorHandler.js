"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// errorHandler part start
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        errorMessages: err.errors || [{ path: '', message: err.message }],
    });
};
exports.default = errorHandler;
