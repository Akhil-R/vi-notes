import mongoose from "mongoose";

// Gets environment variables or crashes if missing
const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing required environment variable: ${key}`);
    console.error(
      "Please check your .env file and ensure all required variables are set.",
    );
    process.exit(1);
  }
  return value;
};

// This function connects our backend to MongoDB.
const connectDB = async () => {
  try {
    // Get MongoDB connection string from environment
    const MONGO_URI = getEnv("MONGO_URI");

    // Actually connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    // If database connection fails, stop the backend.
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
