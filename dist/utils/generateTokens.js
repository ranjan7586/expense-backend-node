import jwt from "jsonwebtoken";
export const generateAccessToken = (user) => {
    return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    }); // 15 minutes
};
export const generateRefreshToken = (user) => {
    return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    }); // 7 days
};
