import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import ExerciseChart from "../ExerciseChart";
import { Link } from "react-router-dom";
import './UserExercise.css'

// function UserExercises({ exercises, users }) {
// const [completedExercises, setCompletedExercises] = useState([]);
// const [daysTrained, setDaysTrained] = useState([]);
// const [setsCompleted, setSetsCompleted] = useState([]);
// const [repsCompleted, setRepsCompleted] = useState([]);
// const [setsCompletedInput, setSetsCompletedInput] = useState(0);
// const [repsCompletedInput, setRepsCompletedInput] = useState(0);
// const { id } = useParams();
// console.log(users);
// console.log(id);

// useEffect(() => {
//   const areExercisesCompleted = async () => {
//     console.log(users);
//     const currentUser = await users.find((user) => user._id === id);
//     setCompletedExercises(currentUser.exerciseArray);
//     console.log(currentUser);
    
//   }
//   areExercisesCompleted()
// }, [id, users]);

//   function handleCheckboxChange(e) {
//     const checkedExerciseId = e.target.value;
//     if (completedExercises.includes(checkedExerciseId)) {
//       setCompletedExercises(
//         completedExercises.filter(
//           (exerciseId) => exerciseId !== checkedExerciseId
//         )
//       );
//     } else {
//       setCompletedExercises([...completedExercises, checkedExerciseId]);
//     }
//   }

// const handleSave = async () => {
// try {
//    const validatedSets = parseInt(setsCompletedInput);
//     const validatedReps = parseInt(repsCompletedInput);

//     if (isNaN(validatedSets) || isNaN(validatedReps)) {
//       console.log("Invalid input for sets or reps.");
//       return;
//     }
// const response = await axios.patch(
//   `http://localhost:8000/therapist/patients/${id}`,
//   {
//     exerciseArray: completedExercises,
//     daysTrained: [...daysTrained, new Date()],
//     setsCompleted: [...setsCompleted, setsCompletedInput],
//     repsCompleted: [...repsCompleted, repsCompletedInput],
//   }
// );
// console.log(response.data);
// } catch (error) {
// console.log(error);
// }
// };

//   return (
//     <div className='container'>
//       <h3>Your Exercises</h3>
//       <form>
//         {completedExercises.map((exercise) => (
//           <div key={exercise._id}>
//             <label htmlFor={exercise._id}>
//               <input
//                 type='checkbox'
//                 value={exercise._id}
//                 onChange={handleCheckboxChange}
//                 checked={completedExercises.includes(exercise._id)}
//               />
//               {exercises.find(e => e._id === exercise.exercise).name}
//             </label>
//           </div>
//         ))}
//       </form>
//       <br />
//       <label htmlFor=''>Sets</label>
//       <input
//         type='number'
//         name='sets'
//         value={setsCompletedInput}
//         onChange={(e) => setSetsCompletedInput(e.target.value)}
//       />
//       <label htmlFor=''>Reps</label>
//       <input
//         type='number'
//         name='reps'
//         value={repsCompletedInput}
//         onChange={(e) => setRepsCompletedInput(e.target.value)}
//       />
//       <button onClick={handleSave}>Save</button>
//       <Link to='/'>
//         <button>Back</button>
//       </Link>
//       {/* <ExerciseChart exercises={exercises} id={id} /> */}
//     </div>
//   );
// }

// export default UserExercises;


function UserExercises({ exercises, users }) {
  const [completedExercises, setCompletedExercises] = useState([]);
  const [daysTrained, setDaysTrained] = useState([]);
  const [setsCompleted, setSetsCompleted] = useState([]);
  const [repsCompleted, setRepsCompleted] = useState([]);
  const [setsCompletedInput, setSetsCompletedInput] = useState(0);
  const [repsCompletedInput, setRepsCompletedInput] = useState(0);
  const { id } = useParams();

useEffect(() => {
  console.log("users:", users);
  console.log("id:", id);
  const currentUser = users.find((user) => user._id === id);
  console.log("currentUser:", currentUser);

  if (currentUser) {
    setCompletedExercises(currentUser.exerciseArray);
  }
}, [id, users]);



  function handleCheckboxChange(e) {
    const checkedExerciseId = e.target.value;

    // Toggle completion status
    setCompletedExercises((prevExercises) => {
      if (prevExercises.includes(checkedExerciseId)) {
        return prevExercises.filter(
          (exerciseId) => exerciseId !== checkedExerciseId
        );
      } else {
        return [...prevExercises, checkedExerciseId];
      }
    });
  }

  const handleSave = async () => {
    try {
      const validatedSets = parseInt(setsCompletedInput);
      const validatedReps = parseInt(repsCompletedInput);

      if (isNaN(validatedSets) || isNaN(validatedReps)) {
        console.log("Invalid input for sets or reps.");
        return;
      }
      const response = await axios.patch(
        `http://localhost:8000/therapist/patients/${id}`,
        {
          exerciseArray: completedExercises,
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
  // function handleSave() {
  //   // Prepare data for saving (completed exercises, sets, reps)
  //   const data = {
  //     exerciseArray: completedExercises,
  //     daysTrained: [new Date()], // For example, you can update this logic
  //     setsCompleted: setsCompletedInput,
  //     repsCompleted: repsCompletedInput,
  //   };

  //   // Send data to the server using axios or any other method
  //   // ...

  //   // Clear input fields after saving
  //   setSetsCompletedInput(0);
  //   setRepsCompletedInput(0);
  // }

  // Filter exercises based on the completedExercises array
  const filteredExercises = exercises.filter((exercise) =>
    completedExercises.includes(exercise._id)
  );

  return (
    <div className='container'>
      <h3>Your Exercises</h3>
      <form>
        {filteredExercises.map((exercise) => (
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