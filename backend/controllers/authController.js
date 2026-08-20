const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    // Type validation
    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return res.status(400).json({
            error: "Name, email and password must be strings"
        });
    }
    // Normalize input
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail) {
    return res.status(400).json({
        error: "Name and email cannot be empty"
    });
}
    // Password validation
    if (password.length < 8) {
        return res.status(400).json({
            error: "Password must be at least 8 characters"
        });
    }
    try {
        // Check duplicate email
        const existingUser = await User.findOne({
            email: cleanEmail
        });
        if (existingUser) {
            return res.status(409).json({
                error: "Email already registered"
            });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user
        const user = new User({
            name: cleanName,
            email: cleanEmail,
            password: hashedPassword
        });
        await user.save();
        return res.status(201).json({
            message: "User Created Successfully"
        });
    } catch (err) {
        next(err);
    }
};

// login 
const login = async (req, res, next) => {
    const { email, password } = req.body;
    // Type validation
    if (
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return res.status(400).json({
            error: "Email and password must be strings"
        });
    }
    // Normalize email
    const cleanEmail = email.trim().toLowerCase();
    try {
        // Find user
        const user = await User.findOne({
            email: cleanEmail
        });
        if (user == null) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }
        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        if (!isMatch) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }
        // Generate JWT
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );
        return res.status(200).json({
            message: "Login successful",
            token: token
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {register, login};