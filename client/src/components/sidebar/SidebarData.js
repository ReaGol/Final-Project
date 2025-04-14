import React from "react";
import {
  FaHome,
  FaUser,
  FaDumbbell,
  FaChartLine,
  FaCalendarDay,
  FaUserMd,
} from "react-icons/fa";
import { PiKanbanFill } from "react-icons/pi";

export const SidebarData = [
  {
    title: "Homepage",
    icon: <FaHome />,
    link: "/homepage",
  },
  {
    title: "Patients",
    icon: <FaUser />,
    link: "/patients",
  },
  {
    title: "Therapist",
    icon: <FaUserMd />,
    link: "/therapist/profile",
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
