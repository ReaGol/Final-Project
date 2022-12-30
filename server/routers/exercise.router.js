import express from "express";
import { createExercise, deleteExercise, editExercise, getExercise, getExercises } from "../controllers/exercise.controller.js";

export const exerciseRouter = new express.Router();

exerciseRouter.post("/exercises", createExercise);

exerciseRouter.get("/exercises", getExercises);

exerciseRouter.get("/exercises/:id", getExercise);

exerciseRouter.patch("/exercises/:id", editExercise);

exerciseRouter.delete("/exercises/:id", deleteExercise);
