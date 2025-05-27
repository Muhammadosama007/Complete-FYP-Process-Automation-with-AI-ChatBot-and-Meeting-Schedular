import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const bgColor = "#1F3F6A";

    const location = useLocation();

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    return (
        <div className="flex">
            <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} bgColor={bgColor} />
            <Sidebar isSidebarOpen={isSidebarOpen} bgColor={bgColor} />
            <div className={`${isSidebarOpen ? "ml-64" : "ml-0"} w-full transition-all`}>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default StudentLayout;
