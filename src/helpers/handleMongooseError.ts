import { NextFunction } from "express-serve-static-core";

const handleMongooseError = (
  err: { name: string; code: number; status: number },
  data: unknown,
  next: NextFunction
) => {
  const { name, code } = err;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  err.status = status;
  next();
};

export default handleMongooseError;
