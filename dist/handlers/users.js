"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
exports.createUser = createUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../schemas/user"));
const ErrorHandler_1 = require("../helpers/ErrorHandler");
function getUser(req, res) {
    res.send([]);
}
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, password, confirmPassword } = req.body;
        const user = yield user_1.default.findOne({ email });
        console.log(user);
        if (user) {
            console.log("user: ", user);
            next((0, ErrorHandler_1.errorHandler)(409, "This email already in use!"));
        }
        const userName = yield user_1.default.find({ username });
        if (userName) {
            next((0, ErrorHandler_1.errorHandler)(409, "This username already in use!"));
        }
        if (password !== confirmPassword) {
            next((0, ErrorHandler_1.errorHandler)(400, "Passwords are not match!"));
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield user_1.default.create({
            email,
            username,
            password: hashedPassword,
        });
        res.status(201).json(newUser);
    });
}
