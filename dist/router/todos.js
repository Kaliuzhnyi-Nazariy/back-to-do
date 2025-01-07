"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = __importDefault(require("../handlers/todos"));
const router = (0, express_1.Router)();
router.get("/", todos_1.default.getToDos);
router.post("/", todos_1.default.createToDo);
router.put("/:id", todos_1.default.updateToDo);
exports.default = router;
