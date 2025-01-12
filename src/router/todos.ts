import { Router } from "express";
import toDoOperation from "../handlers/todos";
import middlewares from "../middlewares";
import todoValidation from "../schemas/validation/todoValidation";
import "../strategies/local-strategy";
import { authenticated } from "../helpers/authenticated";

const router = Router();

router.get("/", authenticated, toDoOperation.getToDos);

router.post(
  "/",
  authenticated,
  middlewares.validate(todoValidation),
  toDoOperation.createToDo
);

router.put(
  "/:id",
  authenticated,
  middlewares.validate(todoValidation),
  toDoOperation.updateToDo
);

router.delete("/delete/:id", authenticated, toDoOperation.deleteToDo);

export default router;
