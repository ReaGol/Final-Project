import React from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    try {
      const response = await axios.post("/users/login", {
        email,
        password,
      });
      const data = response.data;
      const token = data.token;
      Cookies.set("jwt", token, { expires: 7 });
      localStorage.setItem("firstName", JSON.stringify(data.user.name));
      console.log(data.user.name);

      if (data) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='form-container'>
      <div>
        <h3>Login</h3>
        <form onSubmit={loginUser}>
          <div className='input-container'>
            <label htmlFor='email'>email</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className='input-container'>
            <label htmlFor='password'>password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
}
