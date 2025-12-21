import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || "localhost";
console.log(HOST)
connectDB();

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});
