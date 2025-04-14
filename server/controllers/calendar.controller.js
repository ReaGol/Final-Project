import { Calendar } from "../models/calendar.model.js";

// Get all events (admin/general view)
export const getCalendarEvents = async (req, res) => {
  try {
    const events = await Calendar.find({})
      .populate("patientId")
      .populate("therapistId");
    if (!events || events.length === 0) {
      return res.status(404).send("No calendar events found.");
    }
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get events created by a specific patient
export const getEventsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const events = await Calendar.find({
      patientId,
      createdByRole: "patient",
    }).populate("therapistId");
    if (!events || events.length === 0) {
      return res.status(404).send("No patient events found.");
    }
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get events created by a specific therapist
export const getEventsByTherapist = async (req, res) => {
  try {
    const { therapistId } = req.params;
    const events = await Calendar.find({
      therapistId,
      createdByRole: "therapist",
    }).populate("patientId");
    if (!events || events.length === 0) {
      return res.status(404).send("No therapist events found.");
    }
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create event by patient
export const createCalendarEventForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { date } = req.body;

    if (!date) {
      return res.status(400).send("Missing date for patient event.");
    }

    const event = new Calendar({
      patientId,
      date,
      createdByRole: "patient",
    });

    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Create event by therapist
export const createCalendarEventForTherapist = async (req, res) => {
  try {
    const { therapistId } = req.params;
    const { patientId, start, end, title } = req.body;

    if (!start || !end || !title) {
      return res
        .status(400)
        .send("Missing required fields for therapist event.");
    }

    const event = new Calendar({
      therapistId,
      patientId,
      start,
      end,
      title,
      createdByRole: "therapist",
    });

    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Edit an event
export const editCalendarEvent = async (req, res) => {
  const allowedUpdates = ["title", "date", "start", "end"];
  const updates = Object.keys(req.body);
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send({ error: "Invalid update fields." });
  }

  try {
    const updatedEvent = await Calendar.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).send("Event not found.");
    }

    res.send(updatedEvent);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an event
export const deleteCalendarEvent = async (req, res) => {
  try {
    const deleted = await Calendar.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).send("Event not found.");
    }

    res.send(deleted);
  } catch (error) {
    res.status(500).send(error);
  }
};
