import React from 'react'
import './homepage.css'
import { FaChartLine, FaCheckSquare, FaEnvelope } from "react-icons/fa";



function Homepage() {
    return (
      <div className='HomePage'>
        <div className='image-bg'>
          <h1>PhysioTrack</h1>
          <p>
            Welcome physios!
            <br />
            This website was developed by and for physiotherapists,
            <br />
            so that they can create and upload an exercise plan for their
            patients quickly and easily.
            <br />
            No more sending your patients exercises on WhatsApp, <br />
            no more wondering whether they did them or not. <br />
            From now on you can interact with your patients and help them
            recover or achieve their goals faster.
          </p>
        </div>
        <div className='icons-div'>
          <div className='card'>
            <FaChartLine style={{ color: "magenta", alignSelf: "center" }} />
            <p>Track your patients progress</p>
          </div>
          <div className='card'>
            <FaEnvelope style={{ color: "magenta", alignSelf: "center" }} />
            <p>Send reminders</p>
          </div>
          <div className='card'>
            <FaCheckSquare style={{ color: "magenta", alignSelf: "center" }} />
            <p>Lorem ipsum dolor sit</p>
          </div>
        </div>
      </div>
    );
}

export default Homepage