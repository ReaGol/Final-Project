import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ExerciseCard from "./exercises/ExerciseCard";
import "./Workouts.css";

function Workouts() {
  const { id: userId } = useParams(); 

  const [assignedExercises, setAssignedExercises] = useState([]);
  const [setsCompletedInput, setSetsCompletedInput] = useState(0);
  const [repsCompletedInput, setRepsCompletedInput] = useState(0);

  useEffect(() => {
    const fetchAssignedExercises = async () => {
      try {
        console.log("Fetching exercises for userId:", userId);
        const response = await axios.get(
          `http://localhost:8000/patients/${userId}/workouts`
        );
        console.log("API Response:", response.data);
        setAssignedExercises(response.data.exercises);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchAssignedExercises();
    }
  }, [userId]);

  const handleAddRepsAndSets = async (exerciseId) => {
    try {
      const response = await axios.post(
        `/api/patients/${userId}/workout/${exerciseId}`,
        {
          setsCompleted: setsCompletedInput,
          repsCompleted: repsCompletedInput,
        }
      );
      console.log("Update Response:", response.data);

      setAssignedExercises((prevExercises) =>
        prevExercises.map((exercise) =>
          exercise._id === exerciseId
            ? {
                ...exercise,
                setsCompleted: setsCompletedInput,
                repsCompleted: repsCompletedInput,
              }
            : exercise
        )
      );
    } catch (error) {
      console.log(error);
    }
    setSetsCompletedInput(0);
    setRepsCompletedInput(0);
  };

  console.log("Assigned Exercises:", assignedExercises);

  return (
    <div className='container-own-exercises'>
      <h3>Your Exercises</h3>
      <form className='exercise-wrapper'>
        {assignedExercises.length > 0 ? (
          assignedExercises.map((exercise) => (
            <div key={exercise._id}>
              <ExerciseCard
                id={exercise._id}
                name={exercise.name}
                description={exercise.description}
                sets={exercise.sets}
                reps={exercise.reps}
                image={exercise.image}
              />
              <div>
                <label>Sets</label>
                <input
                  type='number'
                  value={setsCompletedInput}
                  onChange={(e) => setSetsCompletedInput(e.target.value)}
                />
                <label>Reps</label>
                <input
                  type='number'
                  value={repsCompletedInput}
                  onChange={(e) => setRepsCompletedInput(e.target.value)}
                />
                <button
                  type='button'
                  onClick={() => handleAddRepsAndSets(exercise._id)}
                >
                  Add Reps and Sets
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No exercises assigned.</p>
        )}
      </form>
    </div>
  );
}

export default Workouts;
