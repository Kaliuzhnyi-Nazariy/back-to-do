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
const todo_1 = __importDefault(require("../schemas/todo"));
const helpers_1 = __importDefault(require("../helpers"));
function getToDos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const todos = yield todo_1.default.find({ ownerId: "123" });
        if (!todos)
            throw Error("something went wrong");
        res.status(200).json(todos);
        // res.send([
        //   {
        //     id: "lala12",
        //     title: "lala",
        //     description: "adjfkljgklsadjg",
        //     status: "to-do",
        //   },
        // ]);
    });
}
function createToDo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, description, status } = req.body;
        console.log(title, description, status);
        const newToDo = yield todo_1.default.create({
            title,
            description,
            status,
            ownerId: "123",
        });
        res.status(201).json(newToDo);
    });
}
function updateToDo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const { id: _id } = req.params;
        const { _id, title, description, status } = req.body;
        const isToDo = yield todo_1.default.findById({ id: _id });
        if (!isToDo) {
            throw new Error("Not found");
        }
        const updatedToDo = yield todo_1.default.findByIdAndUpdate(_id, { title, description, status }, { new: true });
        if (!updatedToDo) {
            throw new Error("Failed to update");
        }
        res.status(201).json(updatedToDo);
    });
}
function deleteToDo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id } = req.body;
        const isToDo = yield todo_1.default.findById({ id: _id });
        if (!isToDo) {
            throw new Error("Not found");
        }
        const deletedToDo = yield todo_1.default.findByIdAndDelete(_id);
        if (!deletedToDo) {
            throw new Error("Failed to delete");
        }
        res.status(204).json();
    });
}
exports.default = {
    getToDos: (0, helpers_1.default)(getToDos),
    createToDo: (0, helpers_1.default)(createToDo),
    updateToDo: (0, helpers_1.default)(updateToDo),
    deleteToDo: (0, helpers_1.default)(deleteToDo),
};
