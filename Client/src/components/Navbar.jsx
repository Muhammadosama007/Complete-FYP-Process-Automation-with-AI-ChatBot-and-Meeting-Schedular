import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import background from "../assets/images/bg.jpg";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, bgColor }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const menuRef = useRef(null);
    const notifRef = useRef(null);
    const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem("googleUser"));
    const profilePic = storedUser?.picture || background;
    const userId = storedUser?._id;
    const userRole = storedUser?.role;

    const handleSignOut = () => {
        localStorage.removeItem("googleUser");
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
            if (
                notifRef.current &&
                !notifRef.current.contains(event.target) &&
                !event.target.closest(".notification-toggle")
            ) {
                setNotifOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/api/notifications`, {
                    params: { userId }
                });
                setNotifications(response.data || []);
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            }
        };

        if (userId && userRole === "student") {
            fetchNotifications();
        }
    }, [userId, userRole]);

    const unseenCount = notifications.filter(n => !(n.seenBy || []).includes(userId)).length;

    const handleNotificationClick = async () => {
        const willOpen = !notifOpen;
        setNotifOpen(willOpen);

        if (willOpen && unseenCount > 0) {
            try {
                await axios.patch("http://localhost:3002/api/notifications/mark-seen", { userId });
                const updated = notifications.map(notif => ({
                    ...notif,
                    seenBy: [...(notif.seenBy || []), userId]
                }));
                setNotifications(updated);
            } catch (error) {
                console.error("Failed to mark notifications as seen", error);
            }
        }
    };

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
                        src={profilePic}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                </div>

                {dropdownOpen && (
                    <div className="absolute top-12 right-12 bg-white text-black shadow-lg rounded-md w-40 z-50">
                        <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Sign Out
                        </button>
                    </div>
                )}

                <FaExpand className="text-xl cursor-pointer" />

                {/* Only show notifications if role is student */}
                {userRole === "student" && (
                    <div className="relative">
                        <FaBell
                            className="text-xl cursor-pointer notification-toggle"
                            onClick={handleNotificationClick}
                        />
                        {unseenCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                {Math.min(unseenCount, 99)}
                            </span>
                        )}

                        {notifOpen && (
                            <div
                                ref={notifRef}
                                className="absolute right-0 mt-2 w-80 max-h-96 overflow-auto bg-white text-black shadow-md rounded-md z-50"
                            >
                                <div className="p-4 border-b font-semibold">Notifications</div>
                                {notifications.length === 0 ? (
                                    <div className="p-4 text-sm text-gray-500">No new notifications</div>
                                ) : (
                                    notifications.map((notif, index) => (
                                        <div key={index} className="px-4 py-2 hover:bg-gray-100 border-b">
                                            <p className="text-sm">{notif.message}</p>
                                            <p className="text-xs text-gray-500">{new Date(notif.createdAt).toLocaleString()}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
