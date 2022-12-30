import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddUser.css";


function AddUser() {
  const [user, setUser] = useState({
    firstName: "",
    email: "",
    password: "",
    diagnosis: "",
    plan: "",
  });
 
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.prevent.default();
    try {
      
      await axios.post("https://final-project-kye7.onrender.com/users", 
       user
      );
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='form-container'>
      <form onSubmit={saveUser} action='submit'>
        <div className='input-container'>
          <label htmlFor=''>Enter First Name</label>
          <br />
          <input
            value={user.firstName}
            onChange={(e) => setUser(e.target.value)}
            type='text'
            placeholder='First Name'
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Enter Email</label>
          <br />
          <input
            value={user.email}
            onChange={(e) => setUser(e.target.value)}
            type='text'
            placeholder='email'
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Enter Password</label>
          <br />
          <input
            value={user.password}
            onChange={(e) => setUser(e.target.value)}
            type='text'
            placeholder='password'
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Enter Diagnosis</label>
          <br />
          <input
            value={user.diagnosis}
            onChange={(e) => setUser(e.target.value)}
            type='text'
            placeholder='diagnosis'
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Enter Treatment Plan</label>
          <br />
          <input
            value={user.plan}
            onChange={(e) => setUser(e.target.value)}
            type='text'
            placeholder='plan'
          />
        </div>
        <div>
          <input className='btn' type='submit' value='Create' />
        </div>
      </form>
    </div>
  );
}

export default AddUser;
