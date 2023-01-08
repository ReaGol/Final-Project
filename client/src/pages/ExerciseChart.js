import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";


function ExerciseChart({ exercises, userId }) {
  const [exerciseData, setExerciseData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:8000/users/edit/${userId}/exercises`
      );
      setExerciseData(response.data);
    }
    fetchData();
  }, [userId]);

  const data = {
    labels: exerciseData.days,
    datasets: [
      {
        label: "Reps",
        data: exerciseData.reps,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Sets",
        data: exerciseData.sets,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
}

export default ExerciseChart;
