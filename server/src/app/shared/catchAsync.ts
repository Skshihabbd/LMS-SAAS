/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ✅ await করা লাগবে যাতে async error catch হয়
      await fn(req, res, next);
    } catch (error: any) {
      next(error);
    }
  };
};
