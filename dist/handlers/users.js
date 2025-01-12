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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../schemas/user"));
const ErrorHandler_1 = require("../helpers/ErrorHandler");
const ctrlWrapper_1 = __importDefault(require("../helpers/ctrlWrapper"));
function getUser(req, res) {
    res.send([]);
}
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, password, confirmPassword } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (user) {
            next((0, ErrorHandler_1.errorHandler)(409, "This email already in use!"));
        }
        const userName = yield user_1.default.findOne({ username });
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
        if (!newUser)
            throw (0, ErrorHandler_1.errorHandler)(500);
        const result = yield user_1.default.findById(newUser._id).select("-__v -password");
        if (!result)
            throw (0, ErrorHandler_1.errorHandler)(500);
        res.status(201).json(result);
    });
}
function loginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, password } = req.body;
        let user = null;
        if (email) {
            console.log(email);
            user = yield user_1.default.findOne({ email }, "-__v");
        }
        else if (username) {
            user = yield user_1.default.findOne({ username }, "-__v");
        }
        if (!user) {
            return next((0, ErrorHandler_1.errorHandler)(404, "User not found"));
        }
        const compPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!compPassword)
            next((0, ErrorHandler_1.errorHandler)(400, "Wrong email/username or password!"));
        res
            .status(200)
            .json({ _id: user._id, email: user.email, username: user.username });
    });
}
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, password } = req.body;
        const userForUpd = yield user_1.default.findOne({ email }, "-__v");
        if (!userForUpd)
            throw (0, ErrorHandler_1.errorHandler)(400);
        const newUser = yield user_1.default.findByIdAndUpdate(userForUpd._id, {
            email,
            username,
            password,
        }, { new: true });
        if (!newUser)
            throw (0, ErrorHandler_1.errorHandler)(500, "Something went wrong!");
        res.status(200).json({
            _id: newUser._id,
            email: newUser.email,
            username: newUser.username,
        });
    });
}
function logoutUser() {
    return __awaiter(this, void 0, void 0, function* () { });
}
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: _id } = req.params;
        const user = yield user_1.default.findById(_id);
        if (!user)
            throw (0, ErrorHandler_1.errorHandler)(404, "User not found!");
        yield user_1.default.findByIdAndDelete(_id);
        res.status(204).json();
    });
}
exports.default = {
    register: (0, ctrlWrapper_1.default)(createUser),
    login: (0, ctrlWrapper_1.default)(loginUser),
    update: (0, ctrlWrapper_1.default)(updateUser),
    logout: (0, ctrlWrapper_1.default)(logoutUser),
    delete: (0, ctrlWrapper_1.default)(deleteUser),
};
