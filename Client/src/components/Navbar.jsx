import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTh, FaBell, FaExpand, FaArrowLeft } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import background from "../assets/images/bg.jpg";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, bgColor }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem("googleUser"));
    const profilePic = storedUser?.picture || background;

    const handleSignOut = () => {
        localStorage.removeItem("googleUser");

        if (window.google?.accounts?.id) {
            window.google.accounts.id.disableAutoSelect();
        }

        navigate("/");
    };

    return (
        <header
            style={{ backgroundColor: bgColor }}
            className="text-white flex justify-between items-center px-6 py-0 fixed top-0 left-0 w-full z-50"
        >
            <div className="flex items-center space-x-4">
                {isSidebarOpen ? (
                    <FaArrowLeft className="text-xl cursor-pointer" onClick={() => setIsSidebarOpen(false)} />
                ) : (
                    <FaBars className="text-xl cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
                )}
                <FaTh className="text-xl cursor-pointer" />
                <img src={logo} alt="UCP Logo" className="h-14" />
                <div>
                    <h1 className="text-lg font-semibold">University of Central Punjab</h1>
                    <p className="text-xs text-gray-200">The Center of Your Future</p>
                </div>
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
