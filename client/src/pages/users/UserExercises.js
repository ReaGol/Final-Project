import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ExerciseCard from "../exercises/ExerciseCard.js";
import './UserExercise.css'

function UserExercises({ exercises, users }) {
  const [assignedExercises, setAssignedExercises] = useState([]);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [daysTrained, setDaysTrained] = useState([]);
  const [setsCompleted, setSetsCompleted] = useState([]);
  const [repsCompleted, setRepsCompleted] = useState([]);
  const [setsCompletedInput, setSetsCompletedInput] = useState(0);
  const [repsCompletedInput, setRepsCompletedInput] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    // Fetch the user's assigned exercises from the backend
    const fetchAssignedExercises = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/therapist/patients/${id}`
        );
        const userExercises = response.data.exercises; 
        setAssignedExercises(userExercises);
        console.log(userExercises);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAssignedExercises();
  }, [id]);

  // const handleCheckboxChange = (exerciseId) => {
  //   // Toggle completion status
  //   setCompletedExercises((prevExercises) => {
  //     if (prevExercises.includes(exerciseId)) {
  //       return prevExercises.filter((id) => id !== exerciseId);
  //     } else {
  //       return [...prevExercises, exerciseId];
  //     }
  //   });
  // };
const handleCheckboxChange = (exercise) => {
  const isSelected = completedExercises.includes(exercise._id);

  if (isSelected) {
    setCompletedExercises((prevCompletedExercises) =>
      prevCompletedExercises.filter((id) => id !== exercise._id)
    );
  } else {
    setCompletedExercises((prevCompletedExercises) => [
      ...prevCompletedExercises,
      exercise._id,
    ]);
  }
};


  // useEffect(() => {
   
  //   const currentUser = users.find((user) => user._id === id);

  //   if (currentUser) {
  //     setAssignedExercises(currentUser.exercises);
  //     setCompletedExercises(currentUser.exercises);
  //   }
  // }, [id, users]);

  // function handleCheckboxChange(e, exerciseId) {
  //   // const checkedExerciseId = e.target.value;

  //   // Toggle completion status
  //   setCompletedExercises((prevExercises) => {
  //     if (prevExercises.includes(exerciseId)) {
  //       return prevExercises.filter(
  //         (id) => id !== exerciseId
  //       );
  //     } else {
  //       return [...prevExercises, exerciseId];
  //     }
  //   });
  // }

  const handleSave = async () => {
    try {
      // const validatedSets = parseInt(setsCompletedInput);
      // const validatedReps = parseInt(repsCompletedInput);

      // if (isNaN(validatedSets) || isNaN(validatedReps)) {
      //   console.log("Invalid input for sets or reps.");
      //   return;
      // }
      const response = await axios.patch(
        `http://localhost:8000/therapist/patients/${id}`,
        {
          exercises: completedExercises,
          daysTrained: [...daysTrained, new Date()],
          setsCompleted: [...setsCompleted, setsCompletedInput],
          repsCompleted: [...repsCompleted, repsCompletedInput],
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setSetsCompletedInput(0);
    setRepsCompletedInput(0);
  };


  return (
    <div className='container'>
      <h3>Your Exercises</h3>
      <form>
        {assignedExercises.map((exercise) => (
          <div key={exercise._id}>
            <ExerciseCard
              id={exercise._id}
              name={exercise.name}
              description={exercise.description}
              sets={exercise.sets}
              reps={exercise.reps}
              image={exercise.image}
            />
            <label htmlFor={exercise._id}>
              <input
                type='checkbox'
                value={exercise._id}
                id={`checkbox-${exercise._id}`}
                onChange={(e) => handleCheckboxChange(e, exercise._id)}
                checked={completedExercises.includes(exercise._id)}
              />
            </label>
          </div>
        ))}
      </form>
      <label>Sets</label>
      <input
        type='number'
        name='sets'
        value={setsCompletedInput}
        onChange={(e) => setSetsCompletedInput(e.target.value)}
      />
      <label>Reps</label>
      <input
        type='number'
        name='reps'
        value={repsCompletedInput}
        onChange={(e) => setRepsCompletedInput(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <Link to='/'>
        <button>Back</button>
      </Link>
    </div>
  );
}
export default UserExercises;