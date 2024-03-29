import mongoose from "mongoose";

export const Exercise = mongoose.model("Exercise", {
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    unique: true,
  },
  name: {
    type: String,
    // required: true,
    trim: true,
  },

  description: {
    type: String,
    // required: true,
    trim: true,
  },

  reps: {
    type: Number,
    // required: true,
    default: 0,
  },
  sets: {
    type: Number,
    // required: true,
    default: 0,
  },

  duration: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
    // required: true,
  },

  notes: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
  },

  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Therapist",
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Patient",
  },
});
