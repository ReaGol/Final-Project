import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../images/avatar.jpg";
// import "./navbar/Navbar.css";
import "./UserProfile.css"

const UserProfile = () => {
  const { isClicked, setIsClicked } =
    useStateContext();

  return (
    <div>
      <div>
        <button
          className='close-user-profile'
          onClick={() => setIsClicked((isClicked) => !isClicked)}
        >
          {<MdOutlineCancel />}
        </button>
      </div>
      <div className='user-block'>
        <img className='user-photo' src={avatar} alt='user-profile' />
        <div className='user-details'>
          <p className='user-name'> John Doe </p>
          <Link to='/' className='user-btn'>
            Go to profile page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
