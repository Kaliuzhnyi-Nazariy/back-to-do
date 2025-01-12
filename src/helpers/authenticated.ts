import { NextFunction, Request, Response } from "express-serve-static-core";
import { errorHandler } from "./ErrorHandler";

export const authenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  throw errorHandler(401);
};
