import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../images/avatar.jpg";
// import "./navbar/Navbar.css";
import "./UserProfile.css"

const UserProfile = () => {
  const { currentColor, isClicked, setIsClicked } =
    useStateContext();

  return (
    <div>
      <div>
        <button className="close-user-profile" onClick={() => setIsClicked(isClicked => !isClicked)}>{<MdOutlineCancel />}</button>
      </div>
      <div className="user-block">
        <img className="user-photo" src={avatar} alt='user-profile' />
        <div className="user-details">
          <p> John Doe </p>
          <p> Administrator </p>
          <p> info@physio.com </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
