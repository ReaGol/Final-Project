import React from "react";
import Sidebar from "../../components/sidebar/Sidebar.js";
// import { FiSetting } from "react-icons/fi";
import { useStateContext } from "../../contexts/ContextProvider";

import styles from "./dashboard.module.css";
import Header from "../navbar/Header";
import Navbar from "../navbar/Navbar.js";
// import { useNavigate } from "react-router-dom";

function Dashboard() {
  // const navigate = useNavigate();
  const { activeMenu } = useStateContext();

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={styles.dashboardContent}>
        {activeMenu ? (
          <div className='sidebar'>
            <Sidebar />
          </div>
        ) : (
          <div className='sidebar hidden'>
            <Sidebar />
          </div>
        )}
        <div></div>
        {/* <div onClick={() => navigate("/users")}>Users</div>
        <div onClick={() => navigate("/adduser")}>Add User</div>
        <div onClick={() => navigate("/exercises")}>Exercises</div>
        <div onClick={() => navigate("/addexercise")}>Add Exercise</div>
        <div onClick={() => navigate("/users/:id")}>User Exercises</div> */}
      </div>
    </>
  );
}

export default Dashboard;
