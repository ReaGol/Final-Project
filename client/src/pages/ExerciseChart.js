// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import './chart.css'
// // import axios from "axios";

// function ExerciseChart({ userId }) {
//   console.log("ExerciseChart rendered");
//   const [exerciseData, setExerciseData] = useState({
//     days: [],
//     reps: [],
//     sets: [],
//   });
//   useEffect(() => {

//       const hardcodedData = {
//         days: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
//         reps: [10, 12, 8, 15, 10],
//         sets: [3, 4, 3, 5, 3],
//       };
//     // async function fetchData() {
//     //   try {
//     //     const response = await axios.get(
//     //       `http://localhost:8000/users/edit/${Id}/exercises`
//     //     );
//         setExerciseData(hardcodedData);
//       // } catch (error) {
//       //   console.error("Error fetching exercise data:", error);
//       // }
//     // }
//     // fetchData();  
//   }, [userId]);

//   console.log(exerciseData);

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//   };


 
//   // const data = {
//   //   labels: exerciseData.days || [],
//   //   datasets: [
//   //     {
//   //       label: "Reps",
//   //       data: exerciseData.reps || [],
//   //       borderColor: "rgba(255, 99, 132, 1)",
//   //       backgroundColor: "rgba(255, 99, 132, 0.2)",
//   //     },
//   //     {
//   //       label: "Sets",
//   //       data: exerciseData.sets || [],
//   //       borderColor: "rgba(54, 162, 235, 1)",
//   //       backgroundColor: "rgba(54, 162, 235, 0.2)",
//   //     },
//   //   ],
//   // };

//   return (
//     <div className='chart-container'>
//       <h1>heloooooo</h1>
//       <Bar options={options} />;
//     </div>
//   );
// }

// export default ExerciseChart;
