const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });

        let user = await User.findOne({ email });
        if (user)
            return res.status(400).json({ message: "User already exists" });

        user = new User({ name, email, password });
        await user.save();

        const payload = { user: { id: user._id, role: user.role } };

        let token;
        try {
            token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" });
        } catch (jwtError) {
            console.log("JWT ERROR:", jwtError.message);
            return res.status(500).json({ message: "Token generation failed", error: jwtError.message });
        }

        return res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.log("REGISTER ERROR:", error.message);
        console.log("ERROR CODE:", error.code);

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message,
                error: error.message,
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                message: "User already exists",
                error: error.message,
                code: error.code,
            });
        }

        return res.status(500).json({ 
            message: "Server Error",
            error: error.message,
            code: error.code
        });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        const payload = { user: { id: user._id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" });

        return res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error.message);

        if (error.name === "JsonWebTokenError") {
            return res.status(500).json({
                message: "Token generation failed",
                error: error.message,
            });
        }

        return res.status(500).json({ 
            message: "Server Error",
            error: error.message
        });
    }
});

router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
});

module.exports = router;
