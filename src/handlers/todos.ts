import { Request, Response } from "express-serve-static-core";
import { ToDo } from "../types/response";
import ToDoSchema from "../schemas/todo";
import { IToDo, ToDoCreate } from "../schemas/types/todo.schema";
import helper from "../helpers";

async function getToDos(req: Request, res: Response<ToDo[]>) {
  const todos = await ToDoSchema.find({ ownerId: "64b9f1d2a5a6b5e5d5c3f4e7" });

  if (!todos) throw Error("something went wrong");

  console.log(req.session);
  console.log(req.session.id);
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(sessionData);
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
}

async function createToDo(
  req: Request<{}, {}, ToDoCreate>,
  res: Response<ToDo>
) {
  const { title, description, status } = req.body;
  console.log(title, description, status);
  const newToDo = await ToDoSchema.create({
    title,
    description,
    status,
    ownerId: "64b9f1d2a5a6b5e5d5c3f4e7",
  });

  console.log(newToDo);

  res.status(201).json(newToDo);
}

async function updateToDo(
  req: Request<{ id: string }, {}, IToDo>,
  res: Response<ToDo>
) {
  const { id: _id } = req.params;

  const { title, description, status } = req.body;

  const isToDo = await ToDoSchema.findById(_id);

  if (!isToDo) {
    throw new Error("Not found");
  }

  const updatedToDo = await ToDoSchema.findByIdAndUpdate(
    _id,
    { title, description, status },
    { new: true }
  );

  if (!updatedToDo) {
    throw new Error("Failed to update");
  }

  res.status(201).json(updatedToDo);
}

async function deleteToDo(req: Request<{ id: string }>, res: Response<void>) {
  const { id: _id } = req.params;

  const isToDo = await ToDoSchema.findById(_id);

  if (!isToDo) {
    throw new Error("Not found");
  }

  const deletedToDo = await ToDoSchema.findByIdAndDelete(_id);

  if (!deletedToDo) {
    throw new Error("Failed to delete");
  }

  res.status(204).json();
}

export default {
  getToDos: helper.ctrlWrapper(getToDos),
  createToDo: helper.ctrlWrapper(createToDo),
  updateToDo: helper.ctrlWrapper(updateToDo),
  deleteToDo: helper.ctrlWrapper(deleteToDo),
};
