
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ExerciseCard from "./exercises/ExerciseCard";
import "./Workouts.css";

function Workouts() {
  const { id: userId } = useParams();
  const [assignedExercises, setAssignedExercises] = useState([]);
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const fetchAssignedExercises = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/therapist/patients/${userId}`
        );
        setAssignedExercises(response.data.exercises);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchAssignedExercises();
    }
  }, [userId]);

  const handleInputChange = (exerciseId, field, value) => {
    setInputs((prev) => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (exerciseId) => {
    try {
      const feedback = inputs[exerciseId] || {};

      await axios.patch(
        `http://localhost:8000/therapist/patients/${userId}/exercises/${exerciseId}`,
        {
          setsCompleted: Number(feedback.setsCompleted) || 0,
          repsCompleted: Number(feedback.repsCompleted) || 0,
          notes: feedback.notes || "",
        }
      );

      alert("Feedback saved!");
    } catch (error) {
      console.error("Error updating exercise feedback:", error);
    }
  };

  return (
    <div className='container-own-exercises'>
      <h3>Update Your Exercise Feedback</h3>
      <form className='exercise-wrapper'>
        {assignedExercises.map((ex) => (
          <div key={ex._id} className='exercise-box'>
            <ExerciseCard
              id={ex.exercise?._id}
              name={ex.exercise?.name}
              description={ex.exercise?.description}
              sets={ex.exercise?.sets}
              reps={ex.exercise?.reps}
              image={ex.exercise?.image}
            />
            <div className='feedback-inputs'>
              <label>Sets Completed</label>
              <input
                type='number'
                value={inputs[ex._id]?.setsCompleted || ""}
                onChange={(e) =>
                  handleInputChange(ex._id, "setsCompleted", e.target.value)
                }
              />

          
              <label>Reps Completed</label>
              <input
                type='number'
                value={inputs[ex._id]?.repsCompleted || ""}
                onChange={(e) =>
                  handleInputChange(ex._id, "repsCompleted", e.target.value)
                }
              />

              <label>Notes</label>
              <textarea
                value={inputs[ex._id]?.notes || ""}
                onChange={(e) =>
                  handleInputChange(ex._id, "notes", e.target.value)
                }
              />

              <button type='button' onClick={() => handleSubmit(ex._id)}>
                Save Feedback
              </button>
            </div>
          </div>
        ))}
      </form>
      <button
        onClick={() => navigate(`/userprofile/${userId}`)}
        className='go-back-btn'
      >
        Back to Profile
      </button>
    </div>
  );
}

export default Workouts;
