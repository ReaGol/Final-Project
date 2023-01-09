import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExerciseChart from "../ExerciseChart";
import { Link } from "react-router-dom";
import './UserExercise.css'

function UserExercises({ exercises, users }) {
const [completedExercises, setCompletedExercises] = useState([]);
const [daysTrained, setDaysTrained] = useState([]);
const [setsCompleted, setSetsCompleted] = useState([]);
const [repsCompleted, setRepsCompleted] = useState([]);
const [setsCompletedInput, setSetsCompletedInput] = useState(0);
const [repsCompletedInput, setRepsCompletedInput] = useState(0);
const { userId } = useParams();
console.log(users);
console.log(userId);

useEffect(() => {
  const areExercisesCompleted = async () => {
    console.log(users);
    const currentUser = await users.find((user) => user._id === userId);
    setCompletedExercises(currentUser.exercises);
    
  }
  areExercisesCompleted()
}, [userId, users]);

const handleCheckboxChange = (e) => {
const checkedExerciseId = e.target.value;
if (completedExercises.includes(checkedExerciseId)) {
setCompletedExercises(
completedExercises.filter(
(exerciseId) => exerciseId !== checkedExerciseId
)
);
} else {
setCompletedExercises([...completedExercises, checkedExerciseId]);
}
};

const handleSave = async () => {
try {
const response = await axios.patch(
`http://localhost:8000/users/${userId}`,
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
};

  return (
    <div className='container'>
      <h3>Your Exercises</h3>
      <form>
        {exercises.map((exercise) => (
          <div key={exercise._id}>
            <label htmlFor={exercise._id}>
              <input
                type='checkbox'
                value={exercise._id}
                onChange={handleCheckboxChange}
                checked={completedExercises.includes(exercise._id)}
              />
              {exercise.name}
            </label>
          </div>
        ))}
      </form>
      <br />
      <label htmlFor=''>Sets</label>
      <input
        type='number'
        name='sets'
        value={setsCompletedInput}
        onChange={(e) => setSetsCompletedInput(e.target.value)}
      />
      <label htmlFor=''>Reps</label>
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
      {/* <ExerciseChart exercises={exercises} userId={userId} /> */}
    </div>
  );
}

export default UserExercises;


