import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import './components/sidebar/Sidebar.css'
import "./App.css";
import Dashboard from "./components/dashbord/Dashbord";
import ExerciseList from "./pages/exercises/ExerciseList.js";
import AddUser from "./pages/users/AddUser";
import AddExercise from "./pages/exercises/AddExercise";
import UserList from "./pages/users/UserList";
import Register from './pages/users/Register.js'
import Login from "./pages/users/Login.js";
import EditUser from "./pages/users/EditUser";
import AddExercisePerClient from "./pages/exercises/AddExercisePerClient";
import Homepage from "./pages/homepage/Homepage";
import UserExercises from "./pages/users/UserExercises";
import ExerciseDetails from "./pages/exercises/ExerciseDetails";
import { useStateContext } from "./contexts/ContextProvider";
import Modal from 'react-modal'
import Patients from "./pages/Patients";
import {LineChart, BarChart, PieChart} from './components'
Modal.setAppElement('#root')

function App() {
  const { activeMenu } = useStateContext()
  const [exercises, setExercises] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await axios.get(
          "http://localhost:8000/therapist/patients"
        );
        
        setUsers((prevUsers) => userData.data);
        console.log(userData);
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
        {/* <Route path='/' element={<Dashboard />} /> */}
        <Route path='/homepage' element={<Homepage />} />
        <Route path='/patients' element={<Patients />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/addUser' element={<AddUser />} />
        <Route path='/users/login' element={<Login />} />
        <Route path='/users/new' element={<Register />} />
        <Route path='/users/edit/:id' element={<EditUser />} />
        <Route path='/exercises/exercise/:id' element={<ExerciseDetails />} />
        {/* <Route path='/charts' element={<ExerciseChart />} /> */}
        <Route
          path='/users/:id'
          element={<UserExercises exercises={exercises} users={users} />}
        />
        {/* <Route
          path='/userexercises'
          element={<UserExercises exercises={exercises} users={users} />}
        /> */}
        <Route
          path='/exercises'
          element={<ExerciseList exercises={exercises} />}
        />
        <Route
          path='/users/edit/:id/exercises'
          element={<AddExercisePerClient exercises={exercises} users={users} />}
        />
        <Route path='/addexercise' element={<AddExercise />} />
        {/*CHARTS*/}
        <Route path='/bar' element={<BarChart />} />
        <Route path='/pie' element={<PieChart />} />
        <Route path='/line' element={<LineChart />} />
      </Routes>
    </div>
  );
}

export default App;
