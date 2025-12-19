import { validationResult } from "express-validator";
import User from "../user/user.model.js";
import jwt from "jsonwebtoken";
import RefreshToken from "../auth/refreshtoken.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateTokens.js";

export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors.array())
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    const user = await User.create(req.body);
    return res.status(201).json({ user });
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({ error: "Email already exists" });
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (user) {
      if (user.password) {
        const comparePassword = await user.comparePassword(
          req.body.password,
          user.password
        );
        if (!comparePassword) {
          return res.status(400).json({ error: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        console.log(user._id)
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
        return res
          .status(200)
          .json({ user, message: "Login successful", accessToken });
      }
    }
    if (!user) {
      return res.status(400).json({ error: "User not found! Please sign up" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const indexUsers = async (req, res) => {
  try {
    let users = await User.find();
    return res
      .status(200)
      .json({ message: `Users ${req.lang.success.list}`, users });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "Unauthorized Access" });
    }
    const refreshTokenDoc = await RefreshToken.findOne({ token: refreshToken });
    if (!refreshTokenDoc) {
      return res.status(401).json({ error: "Unauthorized Access" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized Access" });
      }
      const accessToken = generateAccessToken({ userId: user.userId });
      return res.status(200).json({ accessToken });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const logOutUser = async (req, res) => {
  
  const token = req.cookies.refreshToken;
  if (token) {
    await RefreshToken.findOneAndDelete({ token });
  }

  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "Logout successful" });
};
