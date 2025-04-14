import { Therapist } from "../models/therapist.model.js";
import { Patient } from "../models/patient.model.js";

//--------------create a new patient-----------------
export const createPatient = async (req, res) => {
  const patient = new Patient(req.body);

  try {
    await patient.save();
    const token = await patient.generateAuthToken();
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
    const patient = await Patient.findById(req.params.id).populate(
      "exercises.exercise"
    );

    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    res.status(200).send(patient);
  } catch (error) {
    console.error("Error in getting patient:", error);
    res.status(500).send({ error: error.message });
  }
};



//---------------get patient with auth-------------------------
export const getProfile = async (req, res) => {
  res.send(req.patient);
};

//-------------edit a patient as admin---------------------

export const editPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).send({ error: "Patient not found" });
    }

    const { firstName, email, diagnosis, plan, age, exercises } = req.body;
    if (firstName) patient.firstName = firstName;
    if (email) patient.email = email;
    if (diagnosis) patient.diagnosis = diagnosis;
    if (plan) patient.plan = plan;
    if (age) patient.age = age;

    if (exercises && Array.isArray(exercises)) {
      patient.exercises = exercises.map((ex) => {
        const exerciseId = ex._id || ex.exercise || ex;

        return {
          exercise: exerciseId,
          setsCompleted: ex.setsCompleted || 0,
          repsCompleted: ex.repsCompleted || 0,
          notes: ex.notes || "",
          date: ex.date ? new Date(ex.date) : new Date(),
        };
      });
    }

    await patient.save();
    res.status(200).send(patient);
  } catch (error) {
    console.error("❌ Error updating patient:", error);
    res.status(400).send({ error: error.message });
  }
};





// export const editPatient = async (req, res) => {
//   //const updates = Object.keys(req.body);
//   // const allowedUpdates = [
//   //   "firstName",
//   //   "email",
//   //   "diagnosis",
//   //   "plan",
//   //   "age",
//   //   "exercises",
//   // ];
//   // const isValidOperation = updates.every((update) =>
//   //   allowedUpdates.includes(update)
//   // );

//   // if (!isValidOperation) {
//   //   return res.status(400).send({ error: "Invalid Update" });
//   // }
//   try {
//     const patient = await Patient.findByIdAndUpdate(
//       { _id: req.params.id },
//       { $set: req.body },
//       { new: true }
//     );

//     //updates.forEach((update) => (patient[update] = req.body[update]));
//     console.log(patient);
//     //await Patient.save();

//     if (!patient) {
//       return res.status(404).send();
//     }

//     res.send(patient);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

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

//------------------Patient Feedback---------------------

export const updateExerciseFeedback = async (req, res) => {
  const { id, exerciseId } = req.params;
  const { setsCompleted, repsCompleted, notes } = req.body;

  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    const exercise = patient.exercises.find((ex) => ex._id.toString() === exerciseId.toString());

    if (!exercise) {
      return res.status(404).send("Exercise not found");
    }

    if (setsCompleted !== undefined) exercise.setsCompleted = setsCompleted;
    if (repsCompleted !== undefined) exercise.repsCompleted = repsCompleted;
    if (notes !== undefined) exercise.notes = notes;

    await patient.save();
    res.status(200).send(patient);
  } catch (error) {
    console.error("Error updating exercise feedback:", error);
    res.status(500).send("Server error");
  }
};

//------------------Add a new therapist---------------------


export const createTherapist = async (req, res) => {
  try {
    const therapist = new Therapist(req.body);
    await therapist.save();
    res.status(201).send(therapist);
  } catch (error) {
    res.status(400).send(error);
  }
};



