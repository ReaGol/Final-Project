import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserList from "./pages/users/UserList";
import AddUser from "./pages/users/AddUser";
import Dashboard from "./components/dashbord/Dashbord";


function App() {
    const [data, setData] = useState({
      usersData: [],
      exercisesData: [],
    });
  useEffect(() => {
    async function getUsers() {
      const data = await axios.get("http://localhost:8000/users");
      console.log(data);
    }
    getUsers()
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/addUser' element={<AddUser />} />
        {/* <Route path='/exercises' element={<ExercisesList />} />
        <Route path='/addExercise' element={<AddExercise />} /> */}
      </Routes>
    </div>
  );
}

export default App;
