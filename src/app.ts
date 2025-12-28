import cors, { CorsOptions } from "cors";
import express from "express";
import cookieParser from "cookie-parser";

// FIX 1: Add .js extension AND point to index.js explicitly (no folder imports allowed)
import routes from "./routes";

// FIX 2: Add .js extension
import { setLanguage } from "./middlewares/language.middleware";
import { globalErrorHandler } from "./middlewares/error.middleware";

const app = express();
const whiteListURLs: string[] = ["http://localhost:5173"];

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
      if ((origin && whiteListURLs.indexOf(origin) !== -1) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(setLanguage);

app.use("/api/v1", routes);
app.use(globalErrorHandler);

export default app;
