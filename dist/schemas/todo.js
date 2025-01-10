"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const helpers_1 = __importDefault(require("../helpers"));
const todoSchema = new mongoose_1.Schema({
    // _id: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ["to-do", "in progress", "done"],
        default: "to-do",
        required: true,
    },
    ownerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
});
todoSchema.post("save", helpers_1.default.handleMongooseError);
const ToDoSchema = (0, mongoose_1.model)("ToDo", todoSchema);
exports.default = ToDoSchema;
