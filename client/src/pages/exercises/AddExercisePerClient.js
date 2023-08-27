import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./addExPerClient.css";

import ExerciseCard from "../exercises/ExerciseCard.js";

function AddExercisePerClient({ exercises, users }) {
  const navigate = useNavigate();
  const [selectedExercises, setSelectedExercises] = useState([]);
  const { id } = useParams();

  const handleCheckboxChange = (exercise) => {
    const isSelected = selectedExercises.some((ex) => ex._id === exercise._id);

    if (isSelected) {
      setSelectedExercises(
        selectedExercises.filter((ex) => ex._id !== exercise._id)
      );
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const handleSave = async () => {
    console.log("selected: ", selectedExercises);

    try {
      const response = await axios.patch(
        `http://localhost:8000/therapist/patients/edit/${id}`,
        {
          exercises: selectedExercises,
        }
      );

      navigate(`/users/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='exercises-container'>
      {exercises.map((exercise) => (
        <div className='wrapper' key={exercise._id}>
          <ExerciseCard
            name={exercise.name}
            description={exercise.description}
            sets={exercise.sets}
            reps={exercise.reps}
            image={exercise.image}
            exercise={exercise}
          />
          <button
            className='card-btn'
            onClick={() => handleCheckboxChange(exercise)}
          >
            {!selectedExercises.some((ex) => ex._id === exercise._id)
              ? `Add to List`
              : `Remove from List`}
          </button>
        </div>
      ))}
      <div className='btn-save'>
        <button onClick={handleSave}>Save</button>
      </div>
      <Link to='/'>
        <button>Back</button>
      </Link>
    </div>
  );
}

export default AddExercisePerClient;
