// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//**  To access data from frontend
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Try to get token from cookie first, then from Authorization header
  let token = req.signedCookies?.authToken || req.cookies?.authToken;

  // Fallback to Authorization header if no cookie
  if (!token) {
    token = req.headers.authorization?.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Forbidden" });
  }
};
