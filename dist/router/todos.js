"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = __importDefault(require("../handlers/todos"));
const middlewares_1 = __importDefault(require("../middlewares"));
const todoValidation_1 = __importDefault(require("../schemas/validation/todoValidation"));
require("../strategies/local-strategy");
const authenticated_1 = require("../helpers/authenticated");
const router = (0, express_1.Router)();
router.get("/", authenticated_1.authenticated, todos_1.default.getToDos);
router.post("/", authenticated_1.authenticated, middlewares_1.default.validate(todoValidation_1.default), todos_1.default.createToDo);
router.put("/:id", authenticated_1.authenticated, middlewares_1.default.validate(todoValidation_1.default), todos_1.default.updateToDo);
router.delete("/delete/:id", authenticated_1.authenticated, todos_1.default.deleteToDo);
exports.default = router;
