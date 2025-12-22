export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  /**
   * Creates an instance of AppError.
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code for this error.
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
