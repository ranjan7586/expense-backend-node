import { AppError } from "../utils/AppError";
import { NextFunction, Request, Response } from "express";

const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    console.log(user)
    if (!user || !user.role) {
      return next(new AppError(req.lang.errors.auth_err_no_user, 401));
    }

    const hasRequiredRole = allowedRoles.some((role) =>
      user.role.includes(role)
    );

    if (!hasRequiredRole) {
      return next(
        new AppError(req.lang.errors.permsn_denied, 403)
      );
    }

    next();
  };
};

export default authorize;
