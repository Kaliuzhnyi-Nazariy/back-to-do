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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const notFound_1 = require("./router/notFound");
const errorRoute_1 = require("./router/errorRoute");
const passport_1 = __importDefault(require("passport"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
function createApp() {
    const app = (0, express_1.default)();
    const { SECRET_SESSION, DB_HOST } = process.env;
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)("YbK44CAKbN"));
    app.use((0, express_session_1.default)({
        secret: String(SECRET_SESSION),
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60,
        },
        store: connect_mongo_1.default.create({
            // client: mongoose.connection.getClient(),
            mongoUrl: DB_HOST,
        }),
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use((0, cors_1.default)());
    app.use("/api/users", users_1.default);
    app.use("/api/todos", todos_1.default);
    app.use(notFound_1.notFoundRoute);
    app.use(errorRoute_1.errorRoutes);
    return app;
}
