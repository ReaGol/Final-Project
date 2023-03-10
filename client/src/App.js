import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
import ExerciseChart from "./pages/ExerciseChart";
import UserExercises from "./pages/users/UserExercises";

function App() {
  const [exercises, setExercises] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userData = await axios.get("http://localhost:8000/users");
      setUsers((prevUsers) => userData.data);
      console.log(userData);
      

      const exerciseData = await axios.get("http://localhost:8000/exercises");
      setExercises((prevExercises) => exerciseData.data);
         console.log(exerciseData.data);
         console.log(userData.data);
    }
 
    fetchData();
  }, []);

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/homepage' element={<Homepage />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/addUser' element={<AddUser />} />
        <Route path='/users/login' element={<Login />} />
        <Route path='/users/new' element={<Register />} />
        <Route path='/users/edit/:id' element={<EditUser />} />
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
      </Routes>
    </div>
  );
}

export default App;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import UserList from "./pages/users/UserList";
// import AddUser from "./pages/users/AddUser";
// import Dashboard from "./components/dashbord/Dashbord";
// import ExerciseList from "./pages/exercises/ExerciseList.js";

// function App() {
// const [exercises, setExercises] = useState([])
// const [users, setUsers] = useState([])

//   useEffect(() => {
//     async function getUsers() {
//       const userData = await axios.get("http://localhost:8000/users");
//       setUsers(userData.data);
//       console.log(userData.data);
//     }

//     async function getExerciseList() {
//       const exerciseData = await axios.get("http://localhost:8000/exercises");
//       setExercises(exerciseData.data);
//       console.log(exerciseData.data);
//     }
//     getUsers();
//     getExerciseList();
//   }, []);

//   return (
//     <div className='App'>
//       <Routes>
//         <Route path='/' element={<Dashboard />} />
//         <Route path='/users' element={<UserList />} />
//         <Route path='/addUser' element={<AddUser />} />
//         <Route path='/exercises' element={<ExerciseList />} />
//         {/* <Route path='/addExercise' element={<AddExercise />} /> */}
//       </Routes>
//     </div>
//   );
// }

// export default App;

// const [data, setData] = useState({
//   usersData: [],
//   exercisesData: [],
// });
