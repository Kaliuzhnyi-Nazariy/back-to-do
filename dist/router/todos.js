"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = __importDefault(require("../handlers/todos"));
const middlewares_1 = __importDefault(require("../middlewares"));
const todoValidation_1 = __importDefault(require("../schemas/validation/todoValidation"));
const router = (0, express_1.Router)();
router.get("/", todos_1.default.getToDos);
router.post("/", middlewares_1.default.validate(todoValidation_1.default), todos_1.default.createToDo);
router.put("/:id", middlewares_1.default.validate(todoValidation_1.default), todos_1.default.updateToDo);
router.delete("/delete/:id", todos_1.default.deleteToDo);
exports.default = router;
