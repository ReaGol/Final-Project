import mongoose from "mongoose";


export const connectDB = (url) => {
  return mongoose.connect(url);
};

mongoose.set("strictQuery", true);
