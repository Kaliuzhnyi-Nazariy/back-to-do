"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorRoutes = void 0;
const errorRoutes = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Server Error";
    res.status(status).json({ message });
};
exports.errorRoutes = errorRoutes;
