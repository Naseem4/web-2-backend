const planService = require("../services/planservice");

const createPlan = async (req, res) => {
    try {
        const plan = await planService.createPlan(
            req.body,
            req.user.id
        );

        res.status(201).json(plan);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getPlans = async (req, res) => {
    try {
        const plans = await planService.getUserPlans(
            req.user.id
        );

        res.status(200).json(plans);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createPlan,
    getPlans
};