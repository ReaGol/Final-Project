import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  dayOfWeek: { type: Number, required: true }, // 0 for Sunday, 1 for Monday, etc.
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workout",
    required: true,
  },
});

export const Calendar = mongoose.model("Calendar", calendarSchema);
