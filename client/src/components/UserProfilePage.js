import React, { useEffect, useState } from "react";
import Workouts from "../pages/Workouts";
import BarChart from "../pages/BarChart"; 
import { useParams } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";
import { getChartDataFromExercises } from "../services/workoutService";


const fetchUserDetails = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/therapist/patients/${id}`
    );
    const user = response.data;

    if (user && user.exercises) {
      user.workouts = user.exercises;  
    }

    return user;
  } catch (error) {
    console.log("Error fetching user details:", error);
    return null;
  }
};



function UserProfilePage() {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    const getUserDetails = async () => {
      const userDetails = await fetchUserDetails(id);
      setUser(userDetails);
      
   if (userDetails && userDetails.exercises) {
     const chartData = getChartDataFromExercises(userDetails.exercises);
     setWorkoutData(chartData);
   }
    };

    getUserDetails();
  }, [id]);

  return (
    <div className='user-profile'>
      {user ? (
        <>
          <h1>{user.firstName}'s Profile</h1>
          <BarChart chartData={workoutData} />
          <Workouts userId={id} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfilePage;
