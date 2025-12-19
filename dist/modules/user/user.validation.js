import { body } from "express-validator";
export const userValidation = [
    body('firstname')
        .notEmpty().withMessage("First name is required"),
    body('lastname')
        .notEmpty().withMessage("Last name is required"),
    body('email')
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email").normalizeEmail(),
    body('password')
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];
