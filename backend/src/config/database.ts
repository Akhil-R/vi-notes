import mongoose from "mongoose";

// This function connects our backend to MongoDB.
const connectDB = async () => {
  try {
    // MONGO_URI comes from the .env file.
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected");
  } catch (error) {
    // If database connection fails, stop the backend.
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
