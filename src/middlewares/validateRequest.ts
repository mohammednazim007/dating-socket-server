import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateRequest =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          // errors: error.issues, // ✅ correct property
          fields: error.issues.map((issue) => ({
            field: issue.path[1],
            message: issue.message,
          })),
        });
      }
      next(error);
    }
  };
