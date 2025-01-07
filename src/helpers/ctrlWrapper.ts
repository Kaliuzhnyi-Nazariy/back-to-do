import { NextFunction, Request, Response } from "express-serve-static-core";

type ControllerFunction = (
  req: Request<any, any, any>,
  res: Response<any>,
  next: NextFunction
) => Promise<void>;

export default function ctrlWrapper(fn: ControllerFunction) {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
}
