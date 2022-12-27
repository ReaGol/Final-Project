import express from "express";
import { Exercise } from "../models/exercise.model.js";

export const exerciseRouter = new express.Router();

exerciseRouter.post("/exercises", (req, res) => {
  const exercise = new Exercise(req.body);

  exercise
    .save()
    .then(() => {
      res.send(exercise);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

exerciseRouter.get("/exercises", (req, res) => {
  Exercise.find({})
    .then((exercises) => {
      res.send(exercises);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

exerciseRouter.get("/exercises/:id", (req, res) => {
  const _id = req.params.id;

  Exercise.findById(_id)
    .then((exercise) => {
      if (!exercise) {
        return res.status(404).send();
      }
      res.send(exercise);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

exerciseRouter.patch("/exercises/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed", "name", "reps", "sets", "notes", "duration"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Update" });
  }
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!exercise) {
      return res.status(404).send();
    }

    res.send(exercise);
  } catch (error) {
    res.status(400).send(error);
  }
});

exerciseRouter.delete("/exercises/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);

    if (!exercise) {
      res.status(404).send();
    }
    res.send(exercise);
  } catch (error) {
    res.status(500).send();
  }
});
