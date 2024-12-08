import jwt from "jsonwebtoken";
export const jwtVerify = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(401).json({ error: "Unauthorized Access" });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}