import { Router } from "express";
import toDoOperation from "../handlers/todos";
import middlewares from "../middlewares";
import todoValidation from "../schemas/validation/todoValidation";

const router = Router();

router.get("/", toDoOperation.getToDos);

router.post(
  "/",
  middlewares.validate(todoValidation),
  toDoOperation.createToDo
);

router.put(
  "/:id",
  middlewares.validate(todoValidation),
  toDoOperation.updateToDo
);

router.delete("/delete/:id", toDoOperation.deleteToDo);

export default router;
