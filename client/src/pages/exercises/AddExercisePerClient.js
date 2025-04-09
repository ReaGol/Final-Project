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
        setSelectedExercises(prev=>[...prev, exercise]);
      }
    };


const handleSave = async () => {
  try {
    const formattedExercises = selectedExercises.map((ex) => ({
      exercise: ex._id, 
      notes: ex.notes || "", 
      date: new Date(), 
    }));

    await axios.patch(`http://localhost:8000/therapist/patients/edit/${id}`, {
      exercises: formattedExercises,
    });

    navigate(`/patients/${id}`);
  } catch (error) {
    console.log(error);
  }
};


    
  //   const handleSave = async () => {
      
  //     console.log("selected: ", selectedExercises);
      
  //    const currentUser = users.filter(user=>user._id === id)

  //    const newExercises = currentUser[0].exercises.concat(selectedExercises)
  //    const uniqueIds = [];

  //    const unique = newExercises.filter((element) => {
  //      const isDuplicate = uniqueIds.includes(element._id);

  //      if (!isDuplicate) {
  //        uniqueIds.push(element._id);

  //        return true;
  //      }

  //      return false;
  //    });
  //   try {
  //     const response = await axios.patch(
  //       `http://localhost:8000/therapist/patients/edit/${id}`,
  //       {
  //         exercises: unique,
  //       }
  //     );

  //     navigate(`/patients/${id}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className='added-exercises-container'>
      {exercises.map((exercise) => (
        <div className='exercise-card-wrapper' key={exercise._id}>
          <ExerciseCard
            name={exercise.name}
            description={exercise.description}
            sets={exercise.sets}
            reps={exercise.reps}
            image={exercise.image}
            exercise={exercise}
          />
          <button
            className='exercise-card-btn'
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
        <button className="back-btn">Back</button>
      </Link>
    </div>
  );
}

export default AddExercisePerClient;
