import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import homeRoutes from "./routes/homeRoutes.js";
import submissionRoutes from "./routes/submissions.js";
import authRoutes from "./routes/auth.js";
import offerRoutes from "./routes/offer.js";
import aiRoutes from "./routes/aiRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import userInformationRoutes from "./routes/UserInformationRoutes.js";
import firebaseAuthRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

import { swaggerSpec } from "./swagger.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { checkExpiredSubscriptions } from "./jobs/checkExpiredSubscriptions.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

/**
 * DB check
 */
if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing in .env");
}

/**
 * MongoDB connect
 */
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });

/**
 * CORS (IMPORTANT FIX)
 */
const allowedOrigins =
  process.env.ALLOWED_ORIGINS?.split(",") || [
    "http://localhost:5173",
  ];

app.use(
  cors({
    origin: function (origin, callback) {
      // يسمح بالطلبات من Postman أو السيرفر نفسه
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/**
 * JSON body
 */
app.use(express.json());

/**
 * ROUTES
 */
app.use("/api/home", homeRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/firebase-auth", firebaseAuthRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user-information", userInformationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

/**
 * Swagger
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Health check
 */
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

/**
 * Cron job
 */
checkExpiredSubscriptions();
setInterval(checkExpiredSubscriptions, 24 * 60 * 60 * 1000);

/**
 * Error handling
 */
app.use(notFound);
app.use(errorHandler);

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});