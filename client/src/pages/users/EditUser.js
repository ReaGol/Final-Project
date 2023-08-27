import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./UserList.css";

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
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={updateUser} action='submit'>
        <div className='input-container'>
          <label htmlFor=''>Enter First Name</label>
          <br />
          <input
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            type='text'
            placeholder='First Name'
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Enter Email</label>
          <br />
          <input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type='text'
            placeholder='email'
          />
        </div>
        {/* <div className='input-container'>
          <label htmlFor=''>Enter Password</label>
          <br />
          <input
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            type='text'
            placeholder='password'
          />
        </div> */}
        <div className='input-container'>
          <label htmlFor=''>Enter Diagnosis</label>
          <br />
          <input
            value={user.diagnosis}
            onChange={(e) => setUser({ ...user, diagnosis: e.target.value })}
            type='text'
            placeholder='diagnosis'
          />
        </div>
        <div className='input-container'>
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
          <Link to={`/users/edit/${id}/exercises`} exercises={user.exercises} id={id} className='link-btn'>
            Add Exercises To Client
          </Link>
        </div>
        <div>
          <Link to={`/users/${id}`}>
            Review Client Exercises
          </Link>
        </div>
        <div>
          <input className='btn' type='submit' value='Save Changes' />
        </div>
      </form>
      <Link to='/' className='btn'>
        <i class='fa-solid fa-arrow-left-long'></i>
      </Link>
    </div>
  );
};

export default EditUser;
