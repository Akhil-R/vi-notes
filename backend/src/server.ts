import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";

// This loads values like MONGO_URI and JWT_SECRET from the .env file.
dotenv.config();

// This creates the Express backend app.
const app = express();

// cors allows the frontend to call this backend.
app.use(cors());

// This lets the backend read JSON data sent from forms.
app.use(express.json());

const PORT = process.env.PORT || 5000;

// This route is just used to check if the backend is running.
app.get("/", (req, res) => {
  res.json({ message: "Vi-Notes API running" });
});

// All login and register routes start with /api/auth.
app.use("/api/auth", authRoutes);

// Connect to MongoDB before the server starts accepting requests.
connectDB();

// This starts the backend server.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
