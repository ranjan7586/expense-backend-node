import { validationResult } from "express-validator";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors.array())
            return res.status(400).json({ errors: (errors.array())[0].msg });
        }
        const user = await User.create(req.body);
        return res.status(201).json({ user });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const loginUser = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }
    try {
        const user = await User.findOne({ email: req.body.email }).select('+password');
        if (user) {
            if (user.password) {
                const comparePassword = await user.comparePassword(req.body.password, user.password);
                if (!comparePassword) {
                    return res.status(400).json({ error: "Invalid credentials" });
                }
                const token = await user.jwtToken(user._id);
                return res.status(200).json({ user, message: "Login successful", token });
            }
        }
        if (!user) {
            return res.status(400).json({ error: "User not found! Please sign up" });
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

export const indexUsers = async (req, res) => {
    try {
        let users = await User.find();
        return res.status(200).json({ message: `Users ${req.lang.success.list}`, users });
    } catch (error) {
        return res.status(200).json({ error: error.message });
    }
}