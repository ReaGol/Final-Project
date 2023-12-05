import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import "./homepage.css";
import logo from "../../images/PhysioTrack-logos_transparent.png";
import { FaChartLine, FaCheckSquare, FaEnvelope } from "react-icons/fa";

function Homepage() {
  return (
    <div className='HomePage'>
      <div className='image-bg'>
        <div className='logo'>
          <Link to='/'>
            <img src={logo} alt='' />
          </Link>
        </div>
        <p>
          Welcome physios!
          <br />
          This website was developed by and for physiotherapists, so that they
          can create and upload an exercise plan for their patients quickly and
          easily. No more sending your patients exercises on WhatsApp, no more
          wondering whether they did them or not. From now on you can interact
          with your patients and help them recover or achieve their goals
          faster.
        </p>
      </div>
      <div className='register'>
        <button className='register-button'>Create Your Account</button>
        <p>
          Already have an account?
          <br />
          <span>
            <Link>Sign in Here</Link>
          </span>
        </p>
      </div>
      <section>
        <div className='icons-div'>
          <div className='card'>
            <FaChartLine />
            <p>Track progress</p>
          </div>
          <div className='card'>
            <FaEnvelope />
            <p>Send reminders</p>
          </div>
          <div className='card'>
            <FaCheckSquare />
            <p>Upload Exercises</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
