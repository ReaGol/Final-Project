// import express from "express";
// import {
//   createWorkout,
//   deleteWorkout,
//   editWorkout,
// //   getWorkouts,
//   getWorkout
// } from "../controllers/workouts.controller.js";
// import { auth } from "../middleware/auth.js";

// export const workoutRouter = new express.Router();

// workoutRouter.post("/patients/:id/workout", createWorkout);

// workoutRouter.get("/workouts/:id", getWorkout);

// // workoutRouter.get("/workouts", getWorkouts);

// workoutRouter.patch("/workouts/:id", editWorkout);

// workoutRouter.delete("/workouts/:id", auth, deleteWorkout);


import express from "express";
import { getWorkoutsByPatientId, getExercisesByPatientId } from "../controllers/workouts.controller.js";

export const workoutRouter = express.Router();

workoutRouter.get("/patients/:id/workouts", getWorkoutsByPatientId);

workoutRouter.get("/patients/:id/exercises", getExercisesByPatientId);
export default workoutRouter;