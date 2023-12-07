import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import "./homepage.css";
import logo from "../../images/PhysioTrack-logos_transparent.png";
import { FaChartLine, FaCheckSquare, FaEnvelope } from "react-icons/fa";

function Homepage() {
  return (
    <div className='HomePage'>
      <div className='logo'>
        <Link to='/'>
          <img src={logo} alt='' />
        </Link>
      </div>
      <h1 className='slogan'>Healing Through Movement</h1>

      <div className='main-content'>
        <div className='main-text'>
          <h3>Welcome physios!</h3>
          <p className='short-p'>
            This website was developed by and for physiotherapists, so that they
            can create and upload an exercise plan for their patients quickly
            and easily.
          </p>
          <p className='long-p'>
            No more sending your patients exercises on WhatsApp, no more
            wondering whether they did them or not. From now on you can interact
            with your patients and help them recover or achieve their goals
            faster.
          </p>
        </div>
        <div className='img-div'></div>
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
      <div className='bottom-icons'>
        <div className='icons-div'>
          <div className='icons-card'>
            <FaChartLine />
            <p>Track progress</p>
          </div>
          <div className='icons-card'>
            <FaEnvelope />
            <p>Send reminders</p>
          </div>
          <div className='icons-card'>
            <FaCheckSquare />
            <p>Upload Exercises</p>
          </div>
        </div>
      </div>
      <footer className='copyright'>
        Photo by{" "}
        <a href='https://unsplash.com/@joshduke10?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>
          Josh Duke
        </a>{" "}
        on{" "}
        <a href='https://unsplash.com/photos/a-woman-is-doing-exercises-on-a-yoga-mat-_PInKGPLPCA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>
          Unsplash
        </a>
      </footer>
    </div>
  );
}

export default Homepage;
