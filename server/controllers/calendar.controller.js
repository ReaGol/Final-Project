import { Calendar } from "../models/calendar.model.js";

// Get all events from the calendar
export const getCalendarEvents = async (req, res) => {
  try {
    const events = await Calendar.find({}).populate("patientId workoutId");
    if (!events || events.length === 0) {
      return res.status(404).send("No calendar events found.");
    }
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
};


// Get events for a specific user by userId
export const getEventsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const events = await Calendar.find({ userId });
    if (!events) {
      return res.status(404).send("Calendar events not found for the user");
    }
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new event in the calendar
export const createCalendarEvent = async (req, res) => {
    const userId = req.body.userId;
    const event = new Calendar({
      ...req.body,
      userId,    
    });
  try {
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Edit an event in the calendar
export const editCalendarEvent = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "start", "end"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Update" });
  }

  try {
    const event = await Calendar.findByIdAndUpdate(
      { _id: req.params.id, userId: req.body.userId }, 
      { $set: req.body },
      { new: true, runValidators: true }
    );

    updates.forEach((update) => (event[update] = req.body[update]));
    await event.save();

    if (!event) {
      return res.status(404).send();
    }

    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an event from the calendar
export const deleteCalendarEvent = async (req, res) => {
  try {
    const event = await Calendar.findByIdAndDelete({
      _id: req.params.id,
      userId: req.body.userId,
    });

    if (!event) {
      res.status(404).send();
    }
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};
