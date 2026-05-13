import adminData from "../data/adminData.js";

export const getAdminDashboard = (req, res) => {
    res.status(200).json(adminData);
};