import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCommentDots, FaCalendarCheck, FaTable, FaChartBar, FaTachometerAlt, FaBell } from "react-icons/fa";

const Sidebar = ({ isSidebarOpen, bgColor }) => {
    const menuItems = [
        { name: "Dashboard", icon: <FaTachometerAlt />, path: "/" },
        { name: "Profile", icon: <FaUser />, path: "/profile" },
        { name: "Feedback", icon: <FaCommentDots />, path: "/feedback" },
        { name: "Schedule Meeting", icon: <FaCalendarCheck />, path: "/schedule-meeting" },
        { name: "Meeting Table", icon: <FaTable />, path: "/meeting-table" },
        { name: "Notifications", icon: <FaBell />, path: "/notifications" },
        { name: "Project Progress", icon: <FaChartBar />, path: "/project-progress" },
    ];

    return (
        <div
            className={`fixed top-10 left-0 h-full w-64 bg-white shadow-md transition-transform duration-300 ease-in-out z-40
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"}`}
        >
            <div className="text-white bg-blue-950 p-4 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full mt-4"></div>
                <p className="mt-2 text-lg">Student Name</p>
            </div>
            <ul className="mt-4">
                {menuItems.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <Link to={item.path} className="flex items-center space-x-3 w-full">
                            <span className="text-lg" style={{ color: bgColor }}>{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
