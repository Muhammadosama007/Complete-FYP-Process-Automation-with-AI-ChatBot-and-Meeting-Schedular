import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
    FaBars,
    FaTh,
    FaBell,
    FaExpand,
    FaArrowLeft,
    FaCalendarAlt,
    FaBookOpen,
    FaClipboardCheck,
    FaClipboardList,
    FaFileInvoiceDollar,
    FaCommentDots,
    FaChartBar
} from "react-icons/fa";
import logo from "../assets/images/logo.png";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, bgColor }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:3002/api/users/get");
                const users = response.data.users;

                // Determine role based on current path
                let roleToFind = "student"; // default role

                if (location.pathname.startsWith("/advisor")) {
                    roleToFind = "advisor";
                } else if (location.pathname.startsWith("/po")) {
                    roleToFind = "po";
                } else if (location.pathname.startsWith("/student")) {
                    roleToFind = "student";
                }

                // Find the user with matching role
                const portalUser = users.find(u => u.role === roleToFind);

                // Set user or fallback to first user if none found
                setUser(portalUser || users[0]);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUser();
    }, [location.pathname]);

    const handleSignOut = () => {
        if (window.google?.accounts?.id) {
            window.google.accounts.id.disableAutoSelect();
        }
        navigate("/");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !event.target.closest(".menu-toggle")
            ) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        { label: "Notifications", icon: <FaBell className="text-2xl" /> },
        { label: "DateSheet", icon: <FaCalendarAlt className="text-2xl" /> },
        { label: "Enrolled Courses", icon: <FaBookOpen className="text-2xl" /> },
        { label: "Attendance", icon: <FaClipboardCheck className="text-2xl" /> },
        { label: "Class Schedules", icon: <FaClipboardList className="text-2xl" /> },
        { label: "Invoices", icon: <FaFileInvoiceDollar className="text-2xl" /> },
        { label: "Complain", icon: <FaCommentDots className="text-2xl" /> },
        { label: "Results", icon: <FaChartBar className="text-2xl" /> },
    ];

    return (
        <header
            style={{ backgroundColor: bgColor }}
            className="text-white flex justify-between items-center px-6 py-0 fixed top-0 left-0 w-full z-50"
        >
            <div className="flex items-center space-x-4 relative">
                {isSidebarOpen ? (
                    <FaArrowLeft className="text-xl cursor-pointer" onClick={() => setIsSidebarOpen(false)} />
                ) : (
                    <FaBars className="text-xl cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
                )}
                <FaTh
                    className="text-xl cursor-pointer menu-toggle"
                    onClick={() => setMenuOpen(prev => !prev)}
                />

                <img src={logo} alt="UCP Logo" className="h-14" />
                <div>
                    <h1 className="text-lg font-semibold">University of Central Punjab</h1>
                    <p className="text-xs text-gray-200">The Center of Your Future</p>
                </div>

                {/* Floating Menu */}
                {menuOpen && (
                    <div
                        ref={menuRef}
                        className="absolute top-16 left-10 w-[600px] bg-white text-black shadow-lg rounded-md p-6 z-50 animate-slide-down"
                    >
                        <div className="grid grid-cols-3 gap-6 text-center">
                            {menuItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex flex-col items-center hover:text-blue-700 cursor-pointer"
                                >
                                    {item.icon}
                                    <span className="text-sm mt-1">{item.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 border-t pt-3 text-sm text-blue-900 font-medium">
                            <p className="text-gray-400 text-xs mb-1">REQUESTS</p>
                            <a href="#" className="hover:underline">VIS Registration</a>
                        </div>
                    </div>
                )}
            </div>

            <div className="relative flex items-center space-x-4">
                <div className="cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <img
                        src={user?.image || "https://via.placeholder.com/32"}
                        alt={`${user?.role || "User"} Profile`}
                        title={user?.role}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                </div>

                {dropdownOpen && (
                    <div className="absolute top-12 right-0 bg-white text-black shadow-lg rounded-md w-40 z-50">
                        <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Sign Out
                        </button>
                    </div>
                )}

                <FaExpand className="text-xl cursor-pointer" />
                <FaBell className="text-xl cursor-pointer" />
            </div>
        </header>
    );
};

export default Navbar;