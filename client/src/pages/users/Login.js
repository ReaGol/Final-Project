import React from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import axios from "axios";
import './Login.css'

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
    <div className='login-form-container'>
      <Link to='/homepage'>
        <i class='fa-solid fa-arrow-left-long'></i>
      </Link>
      <div>
        {/* <img src="../../images/moran-logo.png" alt="logo" /> */}
        <h3>Login</h3>
        <form onSubmit={loginUser}>
          <div className='login-input-container'>
            <label htmlFor='email'>email</label>
            <br />
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className='login-input-container'>
            <label htmlFor='password'>password</label>
            <br />
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button className='login-btn' type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
