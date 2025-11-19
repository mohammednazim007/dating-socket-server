import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//** Auth Middleware: Verifies accessToken

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized user - Token missing", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      id: string;
      iat?: number;
      exp?: number;
    };

    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }
    next(error);
  }
};
