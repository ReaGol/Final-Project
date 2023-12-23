// import { Workout } from "../models/workout.model.js";

// // Get all workouts
// export const getWorkouts = async (req, res) => {
//   try {
//     const workouts = await Workout.find({ patientId: req.params.patientId });
//     if (!workouts) {
//       return res.status(404).send("Workouts not found");
//     }
//     res.status(200).send(workouts);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

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
