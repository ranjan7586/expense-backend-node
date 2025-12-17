import cors from "cors";
import express from "express";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import { setLanguage } from "./middlewares/language.middleware.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(setLanguage);

app.use("/api/v1", routes);

export default app;
