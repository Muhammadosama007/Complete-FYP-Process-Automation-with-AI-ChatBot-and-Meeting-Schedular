import React from "react";
import { FaBars, FaTh, FaBell, FaExpand, FaArrowLeft } from "react-icons/fa";
import logo from "../assets/images/logo.png";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, bgColor }) => {
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
            <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-white rounded-full"></div>
                <FaExpand className="text-xl cursor-pointer" />
                <FaBell className="text-xl cursor-pointer" />
            </div>
        </header>
    );
};

export default Navbar;
