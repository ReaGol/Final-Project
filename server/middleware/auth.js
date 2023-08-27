import jwt from "jsonwebtoken";
import { Patient } from "../models/patient.model.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    //console.log("test");
    const decoded = jwt.verify(
      token,
      "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3MjY3NTAzMywiaWF0IjoxNjcyNjc1MDMzfQ.3P-xAYZfN7VaWQA3dPzJRqHMrfvstr67k5R8U3gCJJM"
    );
    //console.log("after decoded");
    const patient = await Patient.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    //console.log('patient', patient)
    if (!patient) {
      throw new Error();
    }

    req.token = token;
    req.patient = patient;
    //console.log(patient);
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

