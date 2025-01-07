import { Schema, model } from "mongoose";
import { IToDo } from "./types/todo.schema";
import helpers from "../helpers";

const todoSchema: Schema<IToDo> = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

(todoSchema as any).post("save", helpers.handleMongooseError);

const ToDoSchema = model<IToDo>("ToDo", todoSchema);

export default ToDoSchema;
