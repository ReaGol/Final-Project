import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  exercises: [
    {
      exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
        required: true,
      },
      reps: { type: Number, required: true, default: 0 },
      sets: { type: Number, required: true, default: 0 },
      exertionLevel: { type: Number, min: 1, max: 10 },
      painLevel: { type: Number, min: 1, max: 10 },
    },
  ],
  date: { type: Date, required: true, default: Date.now },
});

export const Workout = mongoose.model("Workout", workoutSchema);
