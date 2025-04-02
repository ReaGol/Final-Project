// import { Workout } from "../models/workout.model.js";
// import { Patient } from "../models/patient.model.js";

// // // Get all workouts
// // export const getWorkouts = async (req, res) => {
// //   try {
// //     const workouts = await Workout.find({ patientId: req.params.patientId });
// //     if (!workouts) {
// //       return res.status(404).send("Workouts not found");
// //     }
// //     res.status(200).send(workouts);
// //   } catch (error) {
// //     res.status(500).send(error);
// //   }
// // };

// // Get workout by ID
// export const getWorkout = async (req, res) => {
//   try {
//     const workout = await Workout.findOne({ _id: req.params.id });
//     if (!workout) {
//       return res.status(404).send("Workout not found");
//     }
//     res.status(200).send(workout);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // Create new workout
// export const createWorkout = async (req, res) => {
//     console.log("Reached createWorkout route");
//     const patientId = req.body.patientId;
//   try {
//     const workout = new Workout({
//       ...req.body,
//       patientId,
//     });
//     await workout.save();
//     res.status(201).send(workout);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// // Edit workout
// export const editWorkout = async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["date", "exercises", "reps", "sets"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid Update" });
//   }

//   try {
//     const workout = await Workout.findByIdAndUpdate(
//       { _id: req.params.id, patientId: req.body.patientId },
//       { $set: req.body },
//       { new: true, runValidators: true }
//     );

//     updates.forEach((update) => (workout[update] = req.body[update]));
//     await workout.save();

//     if (!workout) {
//       return res.status(404).send();
//     }

//     res.send(workout);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// // Delete workout
// export const deleteWorkout = async (req, res) => {
//   try {
//     const workout = await Workout.findOneAndDelete({
//       _id: req.params.id,
//       patientId: req.body.patientId,
//     });

//     if (!workout) {
//       res.status(404).send();
//     }
//     res.send(workout);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };


import { Workout } from "../models/workout.model.js";
import { Patient } from "../models/patient.model.js";


// Get all workouts for a specific patient
export const getWorkoutsByPatientId = async (req, res) => {
  const patientId = req.params.id;

  try {
    const workouts = await Workout.find({ patientId }).populate("exercises.exercise");

    if (!workouts || workouts.length === 0) {
      return res
        .status(404)
        .send({ message: "No workouts found for this patient." });
    }

    res.status(200).send(workouts);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.status(500).send({ message: "Server error while fetching workouts." });
  }
};


export const getExercisesByPatientId = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "exercises.exercise"
    );
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.status(200).json(patient.exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// export const updateWorkout = async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["date", "reps", "sets", "exercises"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid Update" });
//   }

//   try {
//     const workout = await Workout.findByIdAndUpdate(
//       { _id: req.params.id, patientId: req.body.patientId },
//       { $set: req.body },
//       { new: true, runValidators: true }
//     );

//     updates.forEach((update) => (workout[update] = req.body[update]));
//     await workout.save();

//     if (!workout) {
//       return res.status(404).send();
//     }

//     res.send(workout);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };