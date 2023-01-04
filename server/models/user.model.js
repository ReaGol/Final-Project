import mongoose from "mongoose";
import validator from "validator";

export const User = mongoose.model("User", {
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
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },

  diagnosis: {
    type: String,
    // required: true,
    // minlength: 5,
  },

  plan: {
    type: String,
    // required: true,
    // minlength: 5,
  },

  perform: {
    type: Number,
    default: 1,
    validate(value) {
      if (value < 0) {
        throw new Error("Must be a positive number");
      }
    },
  },
});
