import jwt from "jsonwebtoken";

/**
 * Generates an access token for the given user ID.
 * The token is a JSON Web Token (JWT) that expires after 15 minutes.
 * @param {string} userId - The ID of the user for whom to generate an access token.
 * @returns {string} - The generated access token.
 */
export const generateAccessToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "15m",
  }); // 15 minutes
};

/**
 * Generates a refresh token for the given user ID.
 * The token is a JSON Web Token (JWT) that expires after 7 days.
 * @param {string} userId - The ID of the user for whom to generate a refresh token.
 * @returns {string} - The generated refresh token.
 */
export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "7d",
  }); // 7 days
};
