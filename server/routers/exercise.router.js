import express from "express";
import { createExercise, deleteExercise, editExercise, getExercise, getExercises } from "../controllers/exercise.controller.js";
// import {
//   createWorkout,
//   deleteWorkout,
//   editWorkout,
//   getWorkouts,
//   getWorkout
// } from "../controllers/workouts.controller.js";
import { auth } from "../middleware/auth.js";

export const exerciseRouter = new express.Router();

exerciseRouter.post("/exercises", createExercise);

exerciseRouter.get("/exercises", getExercises);

exerciseRouter.get("/exercises/:id", getExercise);

exerciseRouter.patch("/exercises/:id", editExercise);

exerciseRouter.delete("/exercises/:id", auth, deleteExercise);

/*----------------------WORKOUTS-----------------------------*/

// exerciseRouter.post("/workouts", createWorkout);

// exerciseRouter.get("/workouts/:id", getWorkout);

// exerciseRouter.get("/workouts", getWorkouts);

// exerciseRouter.patch("/workouts/:id", editWorkout);

// exerciseRouter.delete("/workouts/:id", deleteWorkout);
