import FitnessPlan from "../models/FitnessPlan.js";
import { ApiError } from "../middleware/errorHandler.js";

export const createPlan = async (req, res, next) => {
    try {
        const { goal, workoutDays, nutritionNotes } = req.body;

        if (!goal || !workoutDays) {
            throw new ApiError("Goal and workout days are required", 400);
        }

        const plan = await FitnessPlan.create({
            user: req.user.userId,
            goal,
            workoutDays,
            nutritionNotes,
        });

        return res.status(201).json({
            success: true,
            message: "Plan created successfully",
            data: plan,
        });
    } catch (error) {
        next(error);
    }
};

export const getPlans = async (req, res, next) => {
    try {
        const plans = await FitnessPlan.find({
            user: req.user.userId,
        }).populate("user", "name email");

        return res.status(200).json({
            success: true,
            count: plans.length,
            data: plans,
        });
    } catch (error) {
        next(error);
    }
};