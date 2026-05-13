const authService = require("../services/authservice");

const register = async (req, res) => {
    try {
        const result = await authService.registerUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const profile = async (req, res) => {
    try {
        const user = await authService.getProfile(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    profile
};