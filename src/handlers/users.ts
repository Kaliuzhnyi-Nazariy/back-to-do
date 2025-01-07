import { Request, Response } from "express-serve-static-core";
import { CreateUserDto } from "../dtos/CreateUser.dtos";
import { User } from "../types/response";

export function getUsers(req: Request, res: Response) {
  res.send([]);
}

export function getUserById(req: Request, res: Response) {
  res.send([]);
}

export function createUser(
  req: Request<{}, {}, CreateUserDto>,
  res: Response<User>
) {
  // const { id, email, username } = req.body;

  res.status(201).send({
    id: "1",
    email: "ensen@mail.com",
    username: "ensem",
  });
}
