import React from "react";
import styles from "./dashboard.module.css";
import Header from "../navbar/Header";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Header />
      </div>
      <div className={styles.dashboardContent}>
        <div onClick={() => navigate("/users")}>Users</div>
        <div onClick={() => navigate("/adduser")}>Add User</div>
        <div onClick={() => navigate("/exercises")}>Exercises</div>
        {/* <div onClick={() => navigate("/addexercise")}>Add Exercise</div> */}
      </div>
    </>
  );
}

export default Dashboard;
