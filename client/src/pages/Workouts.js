// import {useEffect, useState} from 'react'
// import axios from 'axios';
// import WorkoutCard from './WorkoutCard'

// function Workouts() {
//   const [workout, setGetWorkout] = useState([]);

//   useEffect(() => {
//     getWorkout();
//   }, []);

//   const getWorkout = async (id) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/workouts/:${id}`
//       );
//       setGetWorkout(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className='workouts-container'>
//       {exercises?.map((exercise) => (
//       <></>
//       ))}
//     </div>
//   );
// }

// export default Workouts