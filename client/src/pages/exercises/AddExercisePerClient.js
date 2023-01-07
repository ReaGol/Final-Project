import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ExerciseList from "./ExerciseList";

function AddExercisePerClient({ exercises, users }) {
  const navigate = useNavigate();
  const [selectedExercises, setSelectedExercises] = useState([]);
  const { userId } = useParams();
  //take user id from params - filter users to get user and exercises
  useEffect(() => {
    const currentUser = users.find((user) => user._id === userId);
    setSelectedExercises(currentUser.exerciseArray);
  }, [userId, users]);

  const handleCheckboxChange = (e) => {
    //checkboxes for each exercise (check if already checked)
    //filter checked exercises
    const checkedExerciseId = e.target.value;
    if (selectedExercises.includes(checkedExerciseId)) {
      setSelectedExercises(
        selectedExercises.filter(
          (exerciseId) => exerciseId !== checkedExerciseId
        )
      );
    } else {
      setSelectedExercises([...selectedExercises, checkedExerciseId]);
    }
  };

  const handleSave = async () => {
    //save button:
    //edit user (using patch)
    try {
      const response = await axios.patch(
        `http://localhost:8000/users/${userId}`,
        {
          exercises: selectedExercises,
        }
      );
      console.log(response.data);
      //navigate to user page
      navigate(`/users/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    //show all exercises
    <div>
      {exercises.map((exercise) => (
        <ExerciseList
          exercise={exercise}
          handleCheckboxChange={handleCheckboxChange}
          selectedExercises={selectedExercises}
        />
      ))}
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default AddExercisePerClient