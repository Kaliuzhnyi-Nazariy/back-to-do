"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ctrlWrapper_1 = __importDefault(require("./ctrlWrapper"));
const handleMongooseError_1 = __importDefault(require("./handleMongooseError"));
exports.default = { ctrlWrapper: ctrlWrapper_1.default, handleMongooseError: handleMongooseError_1.default };
