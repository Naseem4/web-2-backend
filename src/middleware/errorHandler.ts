import { Request, Response, NextFunction } from "express";

/**
 * Custom API error type
 * Allows throwing errors with specific HTTP status codes
 */
export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handling middleware
 * Catches all unhandled application errors
 */
export const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  /**
   * Default values
   */
  let statusCode = 500;
  let message = "Internal server error";

  /**
   * Handle custom API errors
   */
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  /**
   * Log server errors
   */
  console.error("Unhandled error:", err);

  return res.status(statusCode).json({
    success: false,
    message,

    /**
     * Show detailed errors only in development mode
     */
    ...(process.env.NODE_ENV === "development" && {
      error: err.message,
      stack: err.stack,
    }),
  });
};

/**
 * Handle undefined routes
 */
export const notFound = (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};