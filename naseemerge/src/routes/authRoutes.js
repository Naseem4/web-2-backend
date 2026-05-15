
//set the endpoint for authentication , when a request comes run the functions in order

import express from "express";
import { googleAuth } from "../controllers/authController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Authenticate user with Google Firebase token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       401:
 *         description: Unauthorized - Invalid token
 *       500:
 *         description: Server error
 */
router.post("/google", verifyToken, googleAuth);

export default router;