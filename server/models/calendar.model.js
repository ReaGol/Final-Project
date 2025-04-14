import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
  },
  date: { type: Date },
  start: { type: Date },
  end: { type: Date },
  title: { type: String },
  createdByRole: {
    type: String,
    enum: ["patient", "therapist"],
    required: true,
  },
});


export const Calendar = mongoose.model("Calendar", calendarSchema);
