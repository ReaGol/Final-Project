import { Exercise } from "../models/exercise.model.js";

export const getExercises = async (req, res) => {
  const exercises = await Exercise.find({});
  if (!exercises) {
    res.send("not found");
  } else {
    res.status(200).send(exercises);
  }
};

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

export const createExercise = async (req, res) => {
  try {
    const exercise = await exercise.create(req.body);
    res.status(200).send(exercise);
  } catch (error) {
    throw error;
  }
};

export const editExercise = async (req, res) => {
  const exercise = await exercise.findById(req.params.id);

  if (!exercise) {
    res.status(400);
    throw new Error("Exercise not found");
  }
  const updatedExercise = await exercise.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedExercise);
};

export const deleteExercise = async (req, res) => {
  const exercise = await exercise.deleteOne(req.params.id);
  res.status(200).json({ message: `Deleted exercise ${req.params.id}` });
};
