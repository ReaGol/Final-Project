import React, { useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import avatar from '../../images/avatar.jpg'
import { useStateContext } from "../../contexts/ContextProvider";
import './Navbar.css'
import UserProfile from "../UserProfile";

const NavButton = ({ customFunc, icon }) => (
    <button
      type='button'
      onClick={() => customFunc()}
      className='navbar-button'
    >
      {icon}
    </button>
);

function Navbar() {
  const {
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setIsClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

//   const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className='main'>
      <NavButton
        title='Menu'
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        // color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className='menu'>

      </div>
      <div className='user-profile' onClick={() => handleClick("userProfile")}>
        <img className='user-avatar hide-avatar' src={avatar} alt='user-profile' />
        <p className="user-name">
          <span>Hi</span>
          {' '} 
          <span>John</span>
        <MdKeyboardArrowDown className="arrow-down" />
        </p>
      </div>
      {isClicked.userProfile && <UserProfile />}
    </div>
  );
}

export default Navbar;
