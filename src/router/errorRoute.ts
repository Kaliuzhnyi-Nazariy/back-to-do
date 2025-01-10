import { NextFunction, Request, Response } from "express-serve-static-core";

export const errorRoutes = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = (err as any).status || 500;
  const message = err.message || "Server Error";

  res.status(status).json({ message });
};
