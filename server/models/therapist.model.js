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
    unique: true,
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
  patientsArray: [
    {
      patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient", 
      },
      exercises: [
        {
          exerciseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exercise", 
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
    },
  ],
});

therapistSchema.virtual("exercises", {
  ref: "Exercise",
  localField: "_id",
  foreignField: "therapist",
});


export const Therapist = mongoose.model("therapist", therapistSchema)

