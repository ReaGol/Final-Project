import axios from "axios";
import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    console.log(e)
    e.preventDefault();
    try {
      console.log(`saving user ${JSON.stringify(user)}`)
      await axios.post("http://localhost:8000/therapist/patients/new", user);
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='user-form-container'>
      <form onSubmit={saveUser} action='submit'>
        <div className='user-input-container'>
          <label htmlFor=''>Enter Patient Name</label>
          <br />
          <input
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            type='text'
            placeholder='First Name'
          />
        </div>
        <div className='user-input-container'>
          <label htmlFor=''>Enter Email</label>
          <br />
          <input
            // value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type='text'
            placeholder='email'
          />
        </div>
        <div className='user-input-container'>
          <label htmlFor=''>Enter Password</label>
          <br />
          <input
            // value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type='text'
            placeholder='password'
          />
        </div>
        <div className='user-input-container'>
          <label htmlFor=''>Enter Diagnosis</label>
          <br />
          <input
            value={user.diagnosis}
            onChange={(e) => setUser({ ...user, diagnosis: e.target.value })}
            type='text'
            placeholder='diagnosis'
          />
        </div>
        <div className='user-input-container'>
          <label htmlFor=''>Enter Treatment Plan</label>
          <br />
          <input
            value={user.plan}
            onChange={(e) => setUser({ ...user, plan: e.target.value })}
            type='text'
            placeholder='plan'
          />
        </div>
        <div>
          <input className='user-btn' type='submit' value='Create' />
        </div>
      </form>
      <Link to='/' className='user-btn'>
        <i class='fa-solid fa-arrow-left-long'></i>
      </Link>
    </div>
  );
}

export default AddUser;
