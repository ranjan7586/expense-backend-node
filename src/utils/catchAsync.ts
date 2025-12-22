import { Request, Response, NextFunction } from "express";

/**
 * A helper function to catch and pass any errors to the next middleware.
 * It takes a function that returns a promise and calls it with the given request, response, and next middleware.
 * If the promise resolves, it does nothing. If the promise rejects, it calls the next middleware with the error.
 * @param {Function} fn - The function to call with the request, response, and next middleware.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} - A function that calls the given function with the given request, response, and next middleware, and catches any errors to pass to the next middleware.
 */
export const catchAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
