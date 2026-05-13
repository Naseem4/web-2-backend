import dashboardData from "../data/dashboardData.js";

export const getDashboard = (req, res) => {
    res.status(200).json(dashboardData);
};