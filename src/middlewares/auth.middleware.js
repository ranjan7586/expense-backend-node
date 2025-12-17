import jwt from "jsonwebtoken";
export const jwtVerify = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1] ?? null;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized Access" });
  }
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized Access" });
      }
      req.user = user;
      req.token = token;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
