const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};

const registerUser = async (data) => {
    const { name, email, password } = data;

    if (!name || !email || !password) {
        throw new Error("All fields are required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = createToken(user);

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        token
    };
};

const loginUser = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = createToken(user);

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        token
    };
};

const getProfile = async (userId) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

module.exports = {
    registerUser,
    loginUser,
    getProfile
};