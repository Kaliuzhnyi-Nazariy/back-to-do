"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundRoute = void 0;
const notFoundRoute = (req, res) => {
    res.status(404).json({ message: "Not found!" });
};
exports.notFoundRoute = notFoundRoute;
