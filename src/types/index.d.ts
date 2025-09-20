import "express";
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        email: string;
        iat?: number;
        exp?: number;
      };
    }
  }
}
