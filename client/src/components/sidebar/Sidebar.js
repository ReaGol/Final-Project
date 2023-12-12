import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import './Sidebar.css'

function Sidebar() {
    const activeMenu = true;

  return (
    <div className='sidebar-left'>
      {activeMenu && (
        <>
          <div className='sidebar-content'>
            <Link to='/' onClick={() => {}}>
              Dashboard
            </Link>
            <Link to='/users' onClick={() => {}}>
              Users
            </Link>
            <Link to='/exercises' onClick={() => {}}>
              Exercises
            </Link>
            <Link to='/charts' onClick={() => {}}>
              Charts
            </Link>
            <Link to='/calendar' onClick={() => {}}>
              Calendar
            </Link>
            {/* <button className='sidebar-button' type='button' onClick={() => {}}>
              <MdOutlineCancel />
            </button> */}
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar