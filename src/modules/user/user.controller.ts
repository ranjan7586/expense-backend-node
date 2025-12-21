import User from "./user.model";
import { Request } from "express";
import { Response } from "express";
import { AppError } from "../../utils/AppError";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { validationResult } from "express-validator";
import RefreshToken from "../auth/refreshtoken.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../auth/auth.service";
import { RefreshTokenPayload } from "../../types/tokens";

class UserController {
  registerUser = catchAsync(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError(errors.array()[0].msg, 400);
    }
    const user = await User.create(req.body);
    return res.status(201).json({ user });
  });

  loginUser = catchAsync(async (req: Request, res: Response) => {
    console.log("Controller Loaded");
    if (!req.body.email || !req.body.password) {
      throw new AppError("Please provide all required fields", 400);
    }
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user || !user.password) {
      throw new AppError("Invalid credentials", 404);
    }

    const comparePassword = await user.comparePassword(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      throw new AppError("Invalid credentials", 400);
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    await RefreshToken.create({
      user: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // const token = await user.jwtToken(user._id);

    // const token = await user.jwtToken(user._id);
    res.status(200).json({ user, message: "Login successful", accessToken });
  });

  /**
   * List all users
   * @param req
   * @param res
   */
  indexUsers = catchAsync(async (req: Request, res: Response) => {
    let users = await User.find();
    return res
      .status(200)
      .json({ message: `Users ${req.lang.success.list}`, users });
  });

  /**
   * Get user by id
   * @param req
   * @param res
   */
  getUser = catchAsync(async (req: Request, res: Response) => {});

  /**
   * Generate new access token
   * @param req
   * @param res
   */
  refreshToken = catchAsync(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError("Unauthorized Access", 401);
    }
    const refreshTokenDoc = await RefreshToken.findOne({
      token: refreshToken,
    });
    if (!refreshTokenDoc) {
      throw new AppError("Unauthorized Access", 401);
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as RefreshTokenPayload;
    const accessToken: string = generateAccessToken(decoded.userId);
    return res.status(200).json({ accessToken });
  });

  logOutUser = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if (token) {
      await RefreshToken.findOneAndDelete({ token });
    }

    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logout successful" });
  });
}

export default new UserController();
