const dashboardData = require("../data/dashboardData");

function getDashboard(req, res) {
    res.status(200).json(dashboardData);
}

module.exports = {
    getDashboard
};