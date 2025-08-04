const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";


router.get("/register", (req, res) => {
    res.render("register", { error: null });
});

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.render("register", { error: "All fields are required." });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.render("register", { error: "Email is already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({ username, email, password: hashedPassword });

        res.redirect("/users/login");
    } catch (err) {
        console.error("Registration Error:", err.message);
        res.render("register", { error: "Something went wrong. Try again." });
    }
});

//vaibhav verma
router.get("/login", (req, res) => {
    res.render("login", { error: null });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.redirect("/users/register");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render("login", { error: "Incorrect password." });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.redirect("/");
    } catch (err) {
        console.error("Login Error:", err.message);
        res.render("login", { error: "Login failed. Please try again." });
    }
});
//vaibhav verma
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/users/login");
});

module.exports = router;