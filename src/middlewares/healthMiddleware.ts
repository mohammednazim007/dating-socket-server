import { Request, Response, NextFunction } from "express";

export const healthRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      status: "UP",
      message: "Service is healthy",
    });
  } catch (err) {
    console.error("Health check failed:", err);
    return res.status(503).json({
      status: "DOWN",
      message: "Service is unavailable",
    });
  }
};
