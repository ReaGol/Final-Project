import React from 'react'
import { FaHome, FaUser, FaDumbbell, FaChartLine, FaCalendarDay } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { PiKanbanFill } from "react-icons/pi";



export const SidebarData = [
  {
    title: "Homepage",
    icon: <FaHome />,
    link: "/homepage",
  },
  {
    title: "Users",
    icon: <FaUser />,
    link: "/users",
  },
  {
    title: "Patients",
    icon: <FaPerson />,
    link: "/patients",
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
    icon: <FaCalendarDay />,
    link: "/calendar",
  },
  {
    title: "Kanban",
    icon: <PiKanbanFill />,
    link: "/kanban",
  },
];
