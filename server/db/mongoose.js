import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/FinalProject", {
  useNewUrlParser: true,
});
mongoose.set("strictQuery", true);
