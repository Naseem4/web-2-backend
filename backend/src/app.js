const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authroutes");
const planRoutes = require("./routes/planroutes");

const swaggerSpec = require("./docs/swagger");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/plans", planRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// TEST API
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend connected successfully 🚀",
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Fit Genie API running",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});