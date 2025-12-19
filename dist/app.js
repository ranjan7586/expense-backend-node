import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
// FIX 1: Add .js extension AND point to index.js explicitly (no folder imports allowed)
import routes from "./routes/index.js";
// FIX 2: Add .js extension
import { setLanguage } from "./middlewares/language.middleware.js";
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(setLanguage);
app.use("/api/v1", routes);
export default app;
