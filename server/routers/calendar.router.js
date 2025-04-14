import express from "express";
import {
  createCalendarEventForPatient,
  createCalendarEventForTherapist,
  getEventsByPatient,
  getEventsByTherapist,
  editCalendarEvent,
  deleteCalendarEvent,
  getCalendarEvents,
} from "../controllers/calendar.controller.js";
import { auth } from "../middleware/auth.js";

export const calendarRouter = express.Router();

// General route 
calendarRouter.get("/events", getCalendarEvents);

// ------- PATIENT routes -------
calendarRouter.get("/events/patient/:patientId", getEventsByPatient);
calendarRouter.post(
  "/events/patient/:patientId",
  createCalendarEventForPatient
);

// ------- THERAPIST routes -------
calendarRouter.get("/events/therapist/:therapistId", getEventsByTherapist);
calendarRouter.post(
  "/events/therapist/:therapistId",
  createCalendarEventForTherapist
);

// ------- SHARED -------
calendarRouter.patch("/events/:id", editCalendarEvent);
calendarRouter.delete("/events/:id", auth, deleteCalendarEvent);
