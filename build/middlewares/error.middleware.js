"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(error, req, res, next) {
    const status = error.status;
    const message = error.message;
    res.status(status).send({ status, message });
}
exports.default = errorHandler;
