import express from "express";
import { editProfile, patientLogin, patientLogout } from "../controllers/patient.controller.js";
import { createPatient, LogoutAllPatients, getPatients, getPatient, getProfile, editPatient, deletePatient} from "../controllers/therapist.controller.js"
import { auth } from "../middleware/auth.js";

export const router = new express.Router();

//----------------patient actions----------------------
router.post("/patients/login", patientLogin)
router.post("/patients/logout", auth, patientLogout)
//router.get("/patients/me", auth, getProfile);
router.patch("/patient/me", auth, editProfile)

//---------------therapist actions---------------------
router.post("/therapist/patients/new", createPatient);

//router.patch("/therapist/patients/:id", editProfile);

router.post("/therapist/patients/logoutAll", auth, LogoutAllPatients)

router.get("/therapist/patients", getPatients);

router.get("/therapist/patients/:id", getPatient);

router.patch("/therapist/patients/edit/:id", editPatient);

router.delete("/therapist/patients/:id", auth, deletePatient);


