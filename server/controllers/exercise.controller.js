import { Exercise } from "../models/exercise.model.js";
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

//
// {
//   Exercise.find({})
//     .then((exercises) => {
//       res.send(exercises);
//     })
//     .catch((error) => {
//       res.status(500).send();
//     });
// }

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

//
// {
//   const _id = req.params.id;

//   Exercise.findById(_id)
//     .then((exercise) => {
//       if (!exercise) {
//         return res.status(404).send();
//       }
//       res.send(exercise);
//     })
//     .catch((error) => {
//       res.status(500).send();
//     });
// }

//---------------------------------------------------------//

//create new exercise

export const createExercise = async (req, res) => 

// {
//   try {
//     const exercise = await exercise.create(req.body);
//     res.status(200).send(exercise);
//   } catch (error) {
//     throw error;
//   }
// };

//
{
  const exercise = new Exercise(req.body);

  exercise
    .save()
    .then(() => {
      res.send(exercise);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
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

    if (!exercise) {
      return res.status(404).send();
    }

    res.send(exercise);
  } catch (error) {
    res.status(400).send(error);
  }
};

//
// {
//   const exercise = await exercise.findById(req.params.id);

//   if (!exercise) {
//     res.status(400);
//     throw new Error("Exercise not found");
//   }
//   const updatedExercise = await exercise.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.status(200).json(updatedExercise);
// };

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
// {
//   const exercise = await exercise.deleteOne(req.params.id);
//   res.status(200).json({ message: `Deleted exercise ${req.params.id}` });
// };
//
