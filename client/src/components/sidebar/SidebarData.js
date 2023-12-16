import React from 'react'
import { FaHome, FaUser, FaDumbbell, FaChartLine, FaCalendarDay } from "react-icons/fa";


export const SidebarData = [
  {
    title: "Home",
    icon: <FaHome />,
    link: "/homepage",
  },
  {
    title: "Users",
    icon: <FaUser />,
    link: "/users",
  },
  {
    title: "Exercises",
    icon: <FaDumbbell />,
    link: "/exercises",
  },
  {
    title: "Charts",
    icon: <FaChartLine />,
    link: "/charts",
  },
  {
    title: "Calendar",
    icon: <FaCalendarDay/>,
    link: "/calendar",
  }
];
