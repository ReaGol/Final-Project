import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

 const patientSchema = new mongoose.Schema({
   firstName: {
     type: String,
     required: true,
     trim: true,
   },
   email: {
     type: String,
     unique: true,
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
   tokens: [
     {
       token: {
         type: String,
         required: true,
       },
     },
   ],

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

  //  perform: {
  //    type: Number,
  //    default: 1,
  //    validate(value) {
  //      if (value < 0) {
  //        throw new Error("Must be a positive number");
  //      }
  //    },
  //  },
   exercises: [
    {
      exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise", 
      },
      setsCompleted: {
        type: Number,
      },
      repsCompleted: {
        type: Number,
      },
      streak: {
         type: Number,
       },
       notes: {
         type: String,
       }
    },
  ],
 });



patientSchema.methods.toJSON = function () {
  const patient = this;
  const patientObject = patient.toObject();

  delete patientObject.password;
  delete patientObject.tokens;

  return patientObject;
};

patientSchema.methods.generateAuthToken = async function () {
  const patient = this;
  const token = jwt.sign(
    { _id: patient._id.toString() },
    "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3MjY3NTAzMywiaWF0IjoxNjcyNjc1MDMzfQ.3P-xAYZfN7VaWQA3dPzJRqHMrfvstr67k5R8U3gCJJM"
  );

  patient.tokens = patient.tokens.concat({ token });
  await patient.save();

  return token;
};

patientSchema.statics.findByCredentials = async (email, password) => {
  const patient = await Patient.findOne({ email });

  if (!patient) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, patient.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return patient;
};

// Hash the plain text password before saving
patientSchema.pre("save", async function (next) {
  const patient = this;

  if (patient.isModified("password")) {
    patient.password = await bcrypt.hash(patient.password, 8);
  }

  next();
});


 export const Patient = mongoose.model("patient", patientSchema);
