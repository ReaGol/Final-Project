import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserList.css";

const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/therapist/patients");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='container'>
        <Link to='/addUser' className='btn'>
          <i class='fa-solid fa-folder-plus'></i>
        </Link>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Diagnosis</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{user.diagnosis}</td>

                <td>
                  <Link to={`edit/${user._id}`} className='btn'>
                    <i class='fa-regular fa-pen-to-square'></i>
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className='btn-delete'
                  >
                    <i class='fa-regular fa-trash-can'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to='/' className='btn'>
          <i class='fa-solid fa-arrow-left-long'></i>
        </Link>
      </div>
    </div>
  );
};
export default UserList;
