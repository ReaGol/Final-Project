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
            <Link to='/homepage'>Homepage</Link>
          </li>
          <li>
            <Link to='/users/login' >Login</Link>
          </li>
          <li>
            <Link to='/users/new'>Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
