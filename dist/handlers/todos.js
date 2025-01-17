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
        var _a;
        const todos = yield todo_1.default.find({ ownerId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        if (!todos)
            throw Error("something went wrong");
        req.sessionStore.get(req.session.id, (err, sessionData) => {
            if (err) {
                throw err;
            }
            console.log("sessionData: ", sessionData);
        });
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
        var _a;
        const { title, description, status } = req.body;
        const newToDo = yield todo_1.default.create({
            title,
            description,
            status,
            ownerId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        });
        res.status(201).json(newToDo);
    });
}
function updateToDo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: _id } = req.params;
        const { title, description, status } = req.body;
        const isToDo = yield todo_1.default.findById(_id);
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
        const { id: _id } = req.params;
        const isToDo = yield todo_1.default.findById(_id);
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
    getToDos: helpers_1.default.ctrlWrapper(getToDos),
    createToDo: helpers_1.default.ctrlWrapper(createToDo),
    updateToDo: helpers_1.default.ctrlWrapper(updateToDo),
    deleteToDo: helpers_1.default.ctrlWrapper(deleteToDo),
};
