import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AddUser.css";

const EditUser = () => {
  const [user, setUser] = useState({
    firstName: "",
    email: "",
    password: "",
    diagnosis: "",
    plan: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:8000/therapist/patients/${id}`);
    setUser(response.data);
    console.log('user id: ', id);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8000/therapist/patients/edit/${id}`, {
        firstName: user.firstName,
        email: user.email,
        diagnosis: user.diagnosis,
        plan: user.plan,
      });
      navigate("/patients");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='user-form-container'>
      <form onSubmit={updateUser} action='submit'>
        <div className='user-input-container'>
          <label htmlFor=''>Enter First Name</label>
          <br />
          <input
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            type='text'
            placeholder='First Name'
          />
        </div>
        <div className='user-input-container'>
          <label htmlFor=''>Enter Email</label>
          <br />
          <input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type='text'
            placeholder='email'
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
          <Link
            to={`/patients/edit/${id}/exercises`}
            exercises={user.exercises}
            id={id}
            className='link-user-btn'
          >
            Add Exercises To Client
          </Link>
        </div>
        <br />
        <div>
          <Link to={`/patients/${id}/workout`} className='link-user-btn'>
            Review Workout
          </Link>
        </div>
        <div>
          <input className='user-btn' type='submit' value='Save Changes' />
        </div>
      </form>
      <Link to='/' className='user-btn'>
        <i class='fa-solid fa-arrow-left-long'></i>
      </Link>
    </div>
  );
};

export default EditUser;
