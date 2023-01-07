import { Exercise } from "../models/exercise.model.js";
import { User } from "../models/user.model.js";
import  Validator  from "mongoose";


//get all exercises

export const getExercises = async (req, res) => {
  const exercises = await Exercise.find({});
  if (!exercises) {
    res.send("not found");
  } else {
    res.status(200).send(exercises);
  }
};

//---------------------create route later!!------------------------------//

// export const getUserExercises = async (req, res) => {
//  try {
//    await req.user.populate("exercises");
//    res.send(req.user.exercises);
//  } catch (error) {
//    res.status(500).send();
//  }
// };


//----------------------------------------------------//

//get exercise by id

export const getExercise = async (req, res) => {
  try {
    const exercise = await exercise.findOne({ _id: req.params.id });
    console.log(exercise);
    if (!exercise) {
      return res.status(404).send("Exercise not found");
    }
    return res.status(200).send(exercise);
  } catch (error) {
    res.status(404).send(error);
  }
};



//---------------------------------------------------------//

//create new exercise

export const createExercise = async (req, res) => {
  // const user = new User(req.body);
  const exercise = new Exercise({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await exercise.save();
    res.status(201).send(exercise);
  } catch (error) {
    res.status(400).send(error);
  }
 
}

//------------------------------------------------------//

//edit exercise
export const editExercise = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "description",
    "completed",
    "name",
    "reps",
    "sets",
    "notes",
    "duration",
    "image"
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Update" });
  }
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    updates.forEach((update) => (exercise[update] = req.body[update]));
    await exercise.save();

    if (!exercise) {
      return res.status(404).send();
    }

    res.send(exercise);
  } catch (error) {
    res.status(400).send(error);
  }
};


//--------------------------------------------------------------//

//delete exercise
export const deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);

    if (!exercise) {
      res.status(404).send();
    }
    res.send(exercise);
  } catch (error) {
    res.status(500).send();
  }
};


//
