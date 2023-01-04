import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
    const response = await axios.get(`http://localhost:8000/users/${id}`);
    setUser(response.data.user);
    console.log('id', id);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8000/edit/${id}`, {
        firstName,
        email,
        password,
        diagnosis,
        plan,
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
            value={firstName}
            onChange={(e) => setUser({...user, firstName: e.target.value})}
            type='text'
            placeholder='First Name'
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Enter Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            type='text'
            placeholder='email'
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Enter Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            type='text'
            placeholder='password'
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Enter Diagnosis</label>
          <br />
          <input
            value={diagnosis}
            onChange={(e) => setUser({...user, diagnosis: e.target.value})}
            type='text'
            placeholder='diagnosis'
          />
        </div>
        <div className='input-container'>
          <label htmlFor=''>Enter Treatment Plan</label>
          <br />
          <input
            value={plan}
            onChange={(e) => setUser({...user, plan: e.target.value})}
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
};

export default EditUser;
