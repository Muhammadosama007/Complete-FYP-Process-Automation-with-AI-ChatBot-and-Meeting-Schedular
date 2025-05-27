import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaUser,
    FaCommentDots,
    FaCalendarCheck,
    FaTable,
    FaChartBar,
    FaTachometerAlt,
    FaBell,
    FaClipboardList,
    FaChalkboardTeacher,
} from "react-icons/fa";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, bgColor }) => {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const userRole = pathSegments[0] || "student";

    const studentMenu = [
        { name: "Dashboard", icon: <FaTachometerAlt />, path: "dashboard" },
        { name: "Profile", icon: <FaUser />, path: "profile" },
        { name: "Feedback", icon: <FaCommentDots />, path: "feedback" },
        { name: "Scheduled Meetings", icon: <FaCalendarCheck />, path: "scheduled-meetings" },
        { name: "Notifications", icon: <FaBell />, path: "notifications" },
        { name: "Project Progress", icon: <FaChartBar />, path: "project-progress" },
    ];

    const advisorMenu = [
        { name: "Dashboard", icon: <FaTachometerAlt />, path: "dashboard" },
        { name: "Advisees", icon: <FaClipboardList />, path: "advisees" },
        { name: "Meetings", icon: <FaCalendarCheck />, path: "meetings" },
        { name: "Feedback", icon: <FaCommentDots />, path: "feedback" },
        { name: "Reports", icon: <FaChartBar />, path: "reports" },
    ];

    const poMenu = [
        { name: "Dashboard", icon: <FaTachometerAlt />, path: "dashboard" },
        { name: "Project Overview", icon: <FaClipboardList />, path: "projects" },
        { name: "Manage Students", icon: <FaUser />, path: "students" },
        { name: "Manage Advisors", icon: <FaChalkboardTeacher />, path: "advisors" },
        { name: "Reports", icon: <FaChartBar />, path: "reports" },
    ];

    let menuItems = studentMenu;
    if (userRole === "advisor") menuItems = advisorMenu;
    else if (userRole === "po") menuItems = poMenu;

    return (
        <div
            className={`fixed top-10 left-0 h-full w-64 bg-white shadow-md transition-transform duration-300 ease-in-out z-40
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"}`}
        >
            <div className="text-white bg-blue-950 p-4 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full mt-4"></div>
                <p className="mt-2 text-lg capitalize">{userRole} Panel</p>
            </div>

            <ul className="mt-4">
                {menuItems.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <Link
                            to={`/${userRole}/${item.path}`}
                            className="flex items-center space-x-3 w-full"
                            onClick={() => setIsSidebarOpen(false)} // Auto close
                        >
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
