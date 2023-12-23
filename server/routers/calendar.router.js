import express from "express";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  editCalendarEvent,
  getCalendarEvents,
  getEventsByUser,
} from "../controllers/calendar.controller.js";
import { auth } from "../middleware/auth.js";

export const calendarRouter = new express.Router();

calendarRouter.post("/events", createCalendarEvent);

calendarRouter.get("/events", getCalendarEvents);

calendarRouter.get("/events/:userId", getEventsByUser);

calendarRouter.patch("/events/:id", editCalendarEvent);

calendarRouter.delete("/events/:id", auth, deleteCalendarEvent);
