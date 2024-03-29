import {useEffect, useState} from 'react'
import axios from 'axios';
import ExerciseCard from './exercises/ExerciseCard';
import "./users/UserExercise.css";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Workouts({ exercises, users }) {
  const [assignedExercises, setAssignedExercises] = useState([]);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [daysTrained, setDaysTrained] = useState([]);
  const [setsCompleted, setSetsCompleted] = useState([]);
  const [repsCompleted, setRepsCompleted] = useState([]);
  const [setsCompletedInput, setSetsCompletedInput] = useState(0);
  const [repsCompletedInput, setRepsCompletedInput] = useState(0);
  const { id } = useParams();

  useEffect(() => {
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
const handleCheckboxChange = (exerciseId) => {
  setCompletedExercises((prevExercises) => {
    if (prevExercises.includes(exerciseId)) {
      return prevExercises.filter((id) => id !== exerciseId);
    } else {
      return [...prevExercises, exerciseId];
    }
  });
};


    const handleSetRepsChange = (exerciseId, field, value) => {
      setAssignedExercises((prevExercises) => {
        const updatedExercises = prevExercises.map((exercise) =>
          exercise._id === exerciseId
            ? { ...exercise, [field]: value }
            : exercise
        );
        return updatedExercises;
      });
    };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/therapist/patients/edit/${id}`,
        {
          exercises: assignedExercises.map((exercise) => ({
            _id: exercise._id,
            sets: exercise.sets,
            reps: exercise.reps,
          })),
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
    <div className='container-own-excersices'>
      <h3>Your Exercises</h3>
      <form className='exercise-wrapper'>
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
            <div>
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
            </div>
            <label htmlFor={exercise._id}>
              <input
                type='checkbox'
                value={exercise._id}
                id={`checkbox-${exercise._id}`}
                onChange={() => handleCheckboxChange(exercise._id)}
                checked={completedExercises.includes(exercise._id)}
              />
              {completedExercises.includes(exercise._id)
                ? "Exercise Completed"
                : "Mark as Completed"}
            </label>
          </div>
        ))}
      </form>

      <button className='save-btn' onClick={handleSave}>
        Save
      </button>
      <Link to='/'>
        <button>Back</button>
      </Link>
    </div>
  );
}
  

export default Workouts

