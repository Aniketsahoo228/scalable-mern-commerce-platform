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
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" });

        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
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

        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
});

router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
});

module.exports = router;
