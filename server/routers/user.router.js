import express from "express";
import { auth } from "../middleware/auth.js";
import { createPatient, deletePatient, editProfile, editPatient, getProfile, getPatient, getPatients, LogoutAllPatients, patientLogin, patientLogout } from "../controllers/patient.controller.js";

export const router = new express.Router();

router.post("/patients/new", createPatient);

router.post("/patients/login", patientLogin)

router.get("/patients/me", auth, getProfile);

router.patch("/patient/me", auth, editProfile)

router.patch("/patients/:id", editProfile);

router.post("/patients/logout", auth, patientLogout)

router.post("/patients/logoutAll", auth, LogoutAllPatients)

router.get("/patients", getPatients);

router.get("/patients/:id", getPatient);

router.patch("/patients/edit/:id", editPatient);

router.delete("/patients/:id", deletePatient);


