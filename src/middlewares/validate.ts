import { Request, Response, NextFunction } from "express-serve-static-core";
import { AnySchema } from "yup";

export default function validate(validationSchema: AnySchema) {
  const fn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validationSchema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: "Validation error",
          details: (error as any).inner.map((err: any) => err.message),
        });
      } else {
        next(error);
      }
    }
  };
  return fn;
}
