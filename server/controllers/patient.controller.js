import { Patient } from "../models/patient.model.js";

//get all patients
export const getPatients = async (req, res) => {
  const patients = await Patient.find({});
  if (!patients) {
    res.status(500).send("not found");
  } else {
    res.status(200).send(patients);
  }
};

//-----------------------------------------------//

//get patient by id
export const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.id });
    console.log(patient);
    if (!patient) {
      return res.status(404).send("patient not found");
    }
    return res.status(200).send(patient);
  } catch (error) {
    res.status(404).send(error);
  }
};

//---------------get patient with auth-------------------------
export const getProfile = async (req, res) => {
  res.send(req.patient);
};

//---------------------------------------------------//

//create a new patient
export const createPatient = async (req, res) => {
  const patient = new Patient(req.body);

  try {
    await patient.save();
    const token = await Patient.generateAuthToken();
    res.status(201).send({ patient, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

//---------------------patient Login------------------------
export const patientLogin = async (req, res) => {
  try {
    const patient = await Patient.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await Patient.generateAuthToken();
    res.send({ patient, token });
  } catch (error) {
    res.status(400).send();
  }
};

//----------------------------patient Logout--------------------------
export const patientLogout = async (req, res) => {
  try {
    req.patient.tokens = req.patient.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.patient.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

//------------------Logout all patients---------------------
export const LogoutAllPatients = async (req, res) => {
  try {
    req.patient.tokens = [];
    await req.patient.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

//--------------------------------------------------//
//edit a patient as admin
export const editPatient = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "firstName",
    "email",
    "diagnosis",
    "plan",
    "age",
    "exerciseArray",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Update" });
  }
  try {
    const patient = await Patient.findById(req.params.id);

    updates.forEach((update) => (patient[update] = req.body[update]));
console.log(patient);
    await Patient.save();

    if (!patient) {
      return res.status(404).send();
    }

    res.send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
};

//----------------------------------------------------------------------------//

//--------------edit patient as patient--------------------

export const editProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age", "exercises"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(500).send({ error: "Invalid Update" });
    }

    updates.forEach((update) => (req.patient[update] = req.body[update]));
    await req.patient.save();
    res.send(req.patient);
  } catch (error) {
    res.status(401).send(error);
  }
};
//delete a patient
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).send();
    }

    res.send(patient);
  } catch (error) {
    res.status(500).send();
  }
};
