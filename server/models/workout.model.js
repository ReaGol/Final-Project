import mongoose from "mongoose";
import { Patient } from "./patient.model";
import { Exercise } from "./exercise.model";

const workoutSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
  ],
  date: { type: Date, required: true, default: Date.now },
  reps: { type: Number, required: true, default: 0 },
  sets: { type: Number, required: true, default: 0 },
});

export const Workout = mongoose.model("Workout", workoutSchema);
