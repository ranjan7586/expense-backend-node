import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { AppError } from "../utils/AppError";

export const validate = (rules: ValidationChain[]) => {
  return [
    ...rules,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const firstError = errors.array()[0].msg;
        return next(new AppError(firstError, 400));
      }
      next();
    },
  ];
};
