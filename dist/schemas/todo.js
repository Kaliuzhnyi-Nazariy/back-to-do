"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    _id: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    status: {
        type: String,
        enum: ["to-do", "in progress", "done"],
        default: "to-do",
        require: true,
    },
    ownerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
});
const ToDoSchema = (0, mongoose_1.model)("ToDo", todoSchema);
exports.default = ToDoSchema;
