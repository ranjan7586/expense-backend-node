import express from "express";
import { indexUsers, loginUser, logOutUser, registerUser } from "./user.controller.js";
import { userValidation } from "./user.validation.js";
import { jwtVerify } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.post("/register", userValidation, registerUser);

router.use(jwtVerify);
router.get("/", indexUsers);

export default router;
