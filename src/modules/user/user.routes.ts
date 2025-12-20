import express from "express";
import userController from "./user.controller";
import { userValidation } from "./user.validation";
import { jwtVerify } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/login", userController.loginUser);
router.post("/logout", userController.logOutUser);
router.post("/register", userValidation, userController.registerUser);

router.use(jwtVerify);
router.get("/", userController.indexUsers);

export default router;
