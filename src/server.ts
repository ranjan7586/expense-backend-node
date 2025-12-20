import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const PORT: number = Number(process.env.PORT || 8080);

connectDB();

// app.get("/", (req, res) => res.send("Hello World!"));

/*app.listen(PORT, () => {
});*/
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
