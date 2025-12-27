import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AccessTokenPayload } from "../types/tokens";
import { AppError } from "../utils/AppError";
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError(req.lang.errors.unauthorized, 401));
  }
  const token: string | null = authHeader.split(" ")[1] ?? null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as AccessTokenPayload;
    req.token = token;
    req.user = decoded;
    next();
  } catch (error: any) {
    next(new AppError(req.lang.errors.invalid_token, 401));
  }
};
