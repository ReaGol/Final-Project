import express from "express";
import { connectDB } from "./db/mongoose.js";
import cors from "cors";
import dotenv from "dotenv";
import { exerciseRouter } from "./routers/exercise.router.js";
import { router } from "./routers/user.router.js";
// import { workoutRouter } from './routers/workouts.router.js'
import { calendarRouter } from './routers/calendar.router.js'

dotenv.config();


const app = express();
const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('succesful');
  } catch (error) {
    console.log(error);
  }
};
start()

app.use(cors())
app.use(express.json());

app.use(router);
app.use(exerciseRouter);
// app.use(workoutRouter);
app.use(calendarRouter);

app.listen(port, () => {
  console.log("listening on port ", +port);
});
