import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className='header'>
      <Link to='/'>{/* <img className='logo' src={} alt='logo' /> */}</Link>

      <nav>
        <ul>
          <li></li>
          <li>
            <Link to='/'>Homepage</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          {/* <li>
            <Link to='/addUser'>Create New User</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
