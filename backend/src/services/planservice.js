const FitnessPlan = require('../models/fitnessplan.js');

const createPlan = async (data, userId) => {
    const { goal, workoutDays, nutritionNotes } = data;

    if (!goal || !workoutDays) {
        throw new Error("Goal and workout days are required");
    }

    const plan = await FitnessPlan.create({
        user: userId,
        goal,
        workoutDays,
        nutritionNotes
    });

    return plan;
};

const getUserPlans = async (userId) => {
    const plans = await FitnessPlan.find({ user: userId })
        .populate("user", "name email");

    return plans;
};

module.exports = {
    createPlan,
    getUserPlans
};