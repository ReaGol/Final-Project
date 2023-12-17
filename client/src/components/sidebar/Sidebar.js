import { NavLink, Link } from "react-router-dom";
import "./Sidebar.css";
import { SidebarData } from "./SidebarData.js";
import { MdOutlineCancel } from "react-icons/md";
// import {FaHome} from 'react-icons/fa'
import { useStateContext } from "../../contexts/ContextProvider";

function Sidebar() {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 800) {
      setActiveMenu(false);
    }
  };

  return (
    <div className='sidebar'>
      {activeMenu && (
        <>
          <div className='sidebar-content'>
            <Link to='/' onClick={() => handleCloseSideBar}></Link>
            <button
              type='button'
              onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
              className='close-sidebar-button'
            >
              <MdOutlineCancel />
            </button>
            <ul className='sidebar-list'>
              {SidebarData.map((link) => (
                <NavLink
                  to={`/${link.title}`}
                  key={link.title}
                  onClick={handleCloseSideBar}
                  className='row'
                >
                  <div id='icon'>{link.icon}</div>
                  <div id='title'>{link.title}</div>
                </NavLink>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
