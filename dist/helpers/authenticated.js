"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticated = void 0;
const ErrorHandler_1 = require("./ErrorHandler");
const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    throw (0, ErrorHandler_1.errorHandler)(401);
};
exports.authenticated = authenticated;
