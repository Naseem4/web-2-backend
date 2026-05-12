import dotenv from "dotenv";
dotenv.config();

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { ApiError } from "./errorHandler";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Stop the server if JWT_SECRET is missing
 * because protected routes cannot work securely without it
 */
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}

/**
 * Extend Express Request type
 * Adds authenticated user data to request object
 */
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: "user" | "admin";
  };
}

/**
 * Middleware to protect private routes
 * Validates JWT token before allowing access
 */
export const protect = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError("Unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: "user" | "admin";
    };

    req.user = decoded;

    next();
  } catch {
    next(new ApiError("Invalid or expired token", 401));
  }
};

/**
 * Authorization middleware
 * Allows access only to admin users
 */
export const adminOnly = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "admin") {
    return next(new ApiError("Access denied", 403));
  }

  next();
};