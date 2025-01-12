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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const user_1 = __importDefault(require("../schemas/user"));
const ErrorHandler_1 = require("../helpers/ErrorHandler");
const bcrypt_1 = __importDefault(require("bcrypt"));
passport_1.default.serializeUser((user, done) => {
    console.log("user: ");
    console.log(user);
    done(null, user);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(id);
        if (!user)
            throw (0, ErrorHandler_1.errorHandler)(404);
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
}));
exports.default = passport_1.default.use(new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("username: ", username);
    console.log("password: ", password);
    try {
        const findUser = yield user_1.default.findOne({ username });
        if (!findUser)
            throw (0, ErrorHandler_1.errorHandler)(400);
        const comparePassword = yield bcrypt_1.default.compare(password, findUser.password);
        if (!comparePassword)
            throw (0, ErrorHandler_1.errorHandler)(400);
        done(null, findUser);
    }
    catch (error) {
        done(error, false);
    }
})));
