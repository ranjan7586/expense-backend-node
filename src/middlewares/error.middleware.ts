import { AppError } from "../utils/AppError";
import { NextFunction, Request, Response } from "express";
export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Mongo duplicate key error
  console.log("error enter");
  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as any).code === 11000
  ) {
    return res.status(409).json({
      status: "error",
      message: "Email already exists",
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  console.log(err);
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
