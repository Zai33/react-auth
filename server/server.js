import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoutes.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 8000;

app.use("/api", authRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
