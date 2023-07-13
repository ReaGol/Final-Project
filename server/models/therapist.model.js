import mongoose from "mongoose";

const therapistSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain the word "password"');
      }
    },
  },
  patientsArray: [],
  exercisesArray: [
    {
      exercise: {
        type: String,
      },
      sets: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      streak: {
        type: Number,
      },
      note: {
        type: String,
      },
    },
  ],
});

export const Therapist = mongoose.model("therapist", therapistSchema)
