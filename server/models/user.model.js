import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

 const userSchema = new mongoose.Schema({
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

   perform: {
     type: Number,
     default: 1,
     validate(value) {
       if (value < 0) {
         throw new Error("Must be a positive number");
       }
     },
   },
   exerciseArray: [
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
     },
   ],
 });



// userSchema.virtual("exercises", {
//   ref: "Exercise",
//   localField: "_id",
//   foreignField: "owner",
// });

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3MjY3NTAzMywiaWF0IjoxNjcyNjc1MDMzfQ.3P-xAYZfN7VaWQA3dPzJRqHMrfvstr67k5R8U3gCJJM"
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});


 export const User = mongoose.model("User", userSchema);
