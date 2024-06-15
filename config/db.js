import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default connectDB;
