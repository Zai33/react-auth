import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoutes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json()); //to parse from  body
app.use(express.urlencoded({ extends: true })); //to parse from data
app.use(cors());
app.use(cookieParser())

const PORT = 8000;

app.use("/api/auth",authRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
