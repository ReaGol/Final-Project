import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../images/avatar.jpg";
import './navbar/Navbar.css'

const UserProfile = () => {
  const { currentColor } = useStateContext();

  return (
    <div>
      <div>
        <p>User Profile</p>
        <button>{<MdOutlineCancel />}</button>
      </div>
      <div>
        <img src={avatar} alt='user-profile' />
        <div>
          <p> John Doe </p>
          <p> Administrator </p>
          <p> info@physio.com </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
