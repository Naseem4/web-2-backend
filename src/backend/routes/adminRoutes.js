const express = require("express");
const router = express.Router();

// const authMiddleware = require("../middleware/authMiddleware");
// const adminMiddleware = require("../middleware/adminMiddleware");
const { getAdminDashboard } = require("../controllers/adminController");

// router.get("/", authMiddleware, adminMiddleware, getAdminDashboard);

router.get("/", getAdminDashboard);

module.exports = router;