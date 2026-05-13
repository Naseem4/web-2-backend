const express = require("express");
const router = express.Router();

const planController = require("../controllers/plancontroller");
const authMiddleware = require("../middleware/authmiddleware");

router.post(
    "/",
    authMiddleware,
    planController.createPlan
);

router.get(
    "/",
    authMiddleware,
    planController.getPlans
);

module.exports = router;