import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './addExPerClient.css'

import ExerciseCard from "../../components/ExerciseCard";

function AddExercisePerClient({ exercises, users }) {
  const navigate = useNavigate();
  const [selectedExercises, setSelectedExercises] = useState([]);
  const { id } = useParams();
  
  //take user id from params - filter users to get user and exercises
  useEffect(() => {
    console.log(id, users)
    const currentUser = users.find((user) => user._id === id);
    console.log(currentUser);
    setSelectedExercises(currentUser.exerciseArray.map(e => e.exercise));
  }, [id, users]);

  const handleCheckboxChange = (exerciseId) => {
    //checkboxes for each exercise (check if already checked)
    //filter checked exercises
    // const checkedExerciseId = e.target.value;
    // if (selectedExercises.includes(checkedExerciseId)) {
    //   setSelectedExercises(
    //     selectedExercises.filter(
    //       (exerciseId) => exerciseId !== checkedExerciseId
    //     )
    //   );
    // } else {
    //   setSelectedExercises([...selectedExercises, checkedExerciseId]);
    // }

    if (selectedExercises.includes(exerciseId)){
      setSelectedExercises(selectedExercises.filter(e => e._id !== exerciseId))
    } else {
      setSelectedExercises([...selectedExercises, exerciseId])
    }
  };

  const handleSave = async () => {
    //save button:
    //edit user (using patch)
    try {
      const response = await axios.patch(
        `http://localhost:8000/users/edit/${id}`,
        {
          exerciseArray: selectedExercises.map(e => ({exercise:e})),
        }
      );
      console.log(response.data);
      //navigate to user page
      navigate(`/users/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    //show all exercises
    <div>
      {exercises.map((exercise) => (
        <div className='wrapper'>
          <ExerciseCard
            key={exercise._id}
            name={exercise.name}
            description={exercise.description}
            sets={exercise.sets}
            reps={exercise.reps}
            image={exercise.image}
            //exercise={exercise}
            //handleCheckboxChange={handleCheckboxChange}
            //selectedExercises={selectedExercises}
          />
          <button className="card-btn" onClick={() => handleCheckboxChange(exercise._id)}>
            {!selectedExercises.includes(exercise._id)
              ? `add to list`
              : `remove from list`}
          </button>
        </div>
      ))}
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default AddExercisePerClient