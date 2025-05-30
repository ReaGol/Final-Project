import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import './components/sidebar/Sidebar.css'
import "./App.css";
import Dashboard from "./components/dashbord/Dashbord.js";
import ExerciseList from "./pages/exercises/ExerciseList.js";
import AddUser from "./pages/users/AddUser.js";
import AddExercise from "./pages/exercises/AddExercise.js";
import UserList from "./pages/users/UserList.js";
import Register from './pages/users/Register.js'
import Login from "./pages/users/Login.js";
import EditUser from "./pages/users/EditUser.js";
import AddExercisePerClient from "./pages/exercises/AddExercisePerClient.js";
import Homepage from "./pages/homepage/Homepage.js";
import UserExercises from "./pages/users/UserExercises.js";
import ExerciseDetails from "./pages/exercises/ExerciseDetails.js";
import BarChart  from './pages/BarChart.js'
import Calendar from './pages/Calendar.js'
import TrainingCalendar from "./pages/TrainingCalendar.js";
import Kanban from "./pages/Kanban.js";
// import { useStateContext } from "./contexts/ContextProvider";
import Modal from 'react-modal'
import Workouts from "./pages/Workouts.js";
import UserProfilePage from "./components/UserProfilePage.js";
import TherapistProfile from "./pages/therapist/TherapistProfile.js";
Modal.setAppElement('#root')

const dummyChartData = [
  { dayOfWeek: "Sunday", reps: 10, sets: 3 },
  { dayOfWeek: "Monday", reps: 12, sets: 4 },
  { dayOfWeek: "Tuesday", reps: 8, sets: 2 },
];

function App() {
  // const { activeMenu } = useStateContext()
  const [exercises, setExercises] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await axios.get(
          "http://localhost:8000/therapist/patients"
        );
        
        setUsers((prevUsers) => userData.data);
        // console.log(userData);
      } catch (error) {
        console.log(error);
      }
      
      

      const exerciseData = await axios.get("http://localhost:8000/exercises");
      setExercises((prevExercises) => exerciseData.data);
    }
 
    fetchData();
  }, []);

  return (
    <div className='app'>
      <Dashboard></Dashboard>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/homepage' element={<Homepage />} />
        <Route path='/therapist' element={<TherapistProfile />} />
        <Route path='/patients/:id/workout' element={<Workouts />} />
        <Route path='/userprofile/:id' element={<UserProfilePage />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/userprofile/calendar' element={<TrainingCalendar />} />

        <Route path='/kanban' element={<Kanban />} />
        <Route
          path='/charts'
          element={<BarChart chartData={dummyChartData} />}
        />
        <Route path='/patients' element={<UserList />} />
        <Route path='/addUser' element={<AddUser />} />
        <Route path='/patients/login' element={<Login />} />
        <Route path='/therapist/patients/new' element={<Register />} />
        <Route path='/patients/edit/:id' element={<EditUser />} />
        <Route path='/exercises/exercise/:id' element={<ExerciseDetails />} />
        <Route
          path='/patients/:id'
          element={<UserExercises exercises={exercises} users={users} />}
        />
        <Route
          path='/exercises'
          element={<ExerciseList exercises={exercises} />}
        />
        <Route
          path='/patients/edit/:id/exercises'
          element={<AddExercisePerClient exercises={exercises} users={users} />}
        />
        <Route path='/addexercise' element={<AddExercise />} />
      </Routes>
    </div>
  );
}

export default App;
