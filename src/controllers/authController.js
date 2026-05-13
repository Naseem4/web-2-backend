import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ApiError } from "../middleware/errorHandler.js";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @guard JWT_SECRET
 * Stops the server at startup if the secret is missing.
 * Authentication cannot work securely without it.
 */
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}

/**
 * @route   POST /api/auth/register
 * @access  Public
 *
 * Creates a new user account.
 * Steps:
 *   1. Validates that name, email, and password are present.
 *   2. Validates email format with a regex.
 *   3. Rejects duplicate emails.
 *   4. Hashes the password with bcrypt before saving.
 *   5. Returns the created user data (no password, no token).
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new ApiError("name, email, and password are required", 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError("Invalid email format", 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError("Email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/auth/login
 * @access  Public
 *
 * Authenticates an existing user and returns a JWT.
 * Steps:
 *   1. Validates that email and password are present.
 *   2. Looks up the user by email.
 *   3. Rejects suspended accounts (isActive === false).
 *   4. Compares the provided password against the stored bcrypt hash.
 *   5. Updates lastLoginAt to the current timestamp.
 *   6. Signs and returns a JWT valid for 7 days.
 *
 * @note isActive and lastLoginAt require the updated User model.
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError("email and password are required", 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError("Invalid credentials", 401);
    }

    /**
     * @check isActive
     * Suspended users cannot log in.
     * The admin sets isActive to false from the dashboard to block access
     * without deleting the account or its submission history.
     */
    if (!user.isActive) {
      throw new ApiError("Account is suspended. Contact support.", 403);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid credentials", 401);
    }

    /**
     * @update lastLoginAt
     * Recorded on every successful login.
     * Visible in the admin dashboard under user details.
     * Using updateOne avoids triggering schema middleware on the full document.
     */
    await User.updateOne(
      { _id: user._id },
      { lastLoginAt: new Date() }
    );

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};