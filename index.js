import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./DB/conn.js";
import router from "./routes/api.js";
import { setLanguage } from "./middlewares/languageMiddleware.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(setLanguage);
dotenv.config();

/************ Middleware to log every request ************/
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port http://localhost:${process.env.PORT}`);
});

connectDB();
app.use("/api/v1", router);
