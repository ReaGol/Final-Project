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
    const response = await axios.get("http://localhost:8000/users");
    setUser(response.data);
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
      <div>
        <Link to='/addUser' className='btn'>
          Add New
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
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className='btn-delete'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserList;
