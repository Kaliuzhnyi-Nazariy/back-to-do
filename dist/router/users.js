"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../handlers/users");
const validate_1 = __importDefault(require("../middlewares/validate"));
const userRegisterValidation_1 = __importDefault(require("../schemas/validation/user/userRegisterValidation"));
const router = (0, express_1.Router)();
router.get("/", users_1.getUser);
// router.get("/:id", getUserById);
router.post("/", (0, validate_1.default)(userRegisterValidation_1.default), users_1.createUser);
exports.default = router;
