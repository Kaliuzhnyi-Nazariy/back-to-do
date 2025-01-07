"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./router/users"));
const todos_1 = __importDefault(require("./router/todos"));
const cors_1 = __importDefault(require("cors"));
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/api/users", users_1.default);
    app.use("/api/todos", todos_1.default);
    return app;
}
