import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let apiUrl = "http://localhost:8000/";
  // if (process.env.NODE_ENV === "production") {
  //   apiUrl = "/users";
  //}
  async function registerUser(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/users/new", {
        firstName: name,
        email,
        password,
      }); 
      const data = response.data;
      const token = data.token;
      Cookies.set("jwt", token, { expires: 7 });
      localStorage.setItem("userName", JSON.stringify(data.user.name));
      const jwt = Cookies.get("jwt");
      console.log(jwt);
      // if (data) {
      //   var body = JSON.stringify({
      //     name: "",
      //     description: "",
      //     reps: "",
      //     sets: "",
      //     image: "",
      //   });

      //   var config = {
      //     method: "post",
      //     url: `${apiUrl}/exercises`,
      //     headers: {
      //       Authorization: `Bearer ${jwt}`,
      //       "Content-Type": "application/json",
      //     },
      //     data: body,
      //   };

      //   axios(config)
      //     .then(function (response) {
      //       console.log(JSON.stringify(response.data._id));
      //       localStorage.setItem("_id", JSON.stringify(response.data._id));
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
        
      // }
      navigate("/users");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='form-container'>
      <div>
        <h3>Register</h3>
        <form onSubmit={registerUser}>
          <div className='input-container'>
            <label htmlFor='name'>name</label>
            <input
              type='string'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
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
          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  );
}
