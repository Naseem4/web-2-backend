const adminData = require("../data/adminData");

function getAdminDashboard(req, res) {

    res.status(200).json(adminData);

}

module.exports = {
    getAdminDashboard
};