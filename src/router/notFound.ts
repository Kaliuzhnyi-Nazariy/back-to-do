import { Request, Response } from "express-serve-static-core";

export const notFoundRoute = (req: Request, res: Response) => {
  res.status(404).json({ message: "Not found!" });
};
