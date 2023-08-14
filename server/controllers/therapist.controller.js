import { Patient } from "../models/patient.model.js";

//--------------create a new patient-----------------
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

//----------------get all patients-------------------
export const getPatients = async (req, res) => {
  try{
    const patients = await Patient.find({});
    if (!patients) {
      res.status(500).send("not found");
    } else {
      res.status(200).send(patients);
    }
  }catch(error){
console.log(error);
  }
};

//-----------------------------------------------//

//-------------get patient by id--------------------
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

//-------------edit a patient as admin---------------------
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
