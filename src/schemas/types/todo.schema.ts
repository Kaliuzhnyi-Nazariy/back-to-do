// import { getToDos } from "../../handlers/todos";
import { ToDo } from "../../types/response";

export interface IToDo {
  _id: string;
  title: string;
  description: string;
  status: string;
  ownerId: object | string;
  [key: string]: any;
}

export type ToDoCreate = Omit<ToDo, "ownerId" | "_id">;
