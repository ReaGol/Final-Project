// import { Link, NavLink } from 'react-router-dom';
// import { Link } from "react-router-dom";
import "./Sidebar.css";
import { SidebarData } from "./SidebarData.js";
import {MdOutlineCancel} from 'react-icons/md'
// import {FaHome} from 'react-icons/fa'
import { useStateContext } from "../../contexts/ContextProvider";

function Sidebar() {
  const { activeMenu, setActiveMenu } = useStateContext();

  return (
    <div className='sidebar'>
      {activeMenu && (
        <>
          <div className='sidebar-content'>
            {/* <Link to='/' onClick={() => setActiveMenu(false)}>
            </Link> */}
            <button
              type='button'
              onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
              className='close-sidebar-button'
            >
              <MdOutlineCancel />
            </button>
            <ul className='sidebar-list'>
              {SidebarData.map((val, key) => {
                return (
                  <li
                    key={key}
                    className='row'
                    id={window.location.pathname === val.link ? "active" : ''}
                    onClick={() => {
                      window.location.pathname = val.link;
                    }}
                  >
                    <div id='icon'>{val.icon}</div>
                    <div id='title'>{val.title}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
