import { Patient } from "../models/patient.model.js";

//---------------------patient Login------------------------
export const patientLogin = async (req, res) => {
  try {
    const patient = await Patient.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await patient.generateAuthToken();
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
