import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const ProjectOfficeLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const bgColor = "#1F3F6A"; 
    
    // Track the current route location
    const location = useLocation();

    // Close the sidebar whenever the route changes
    useEffect(() => {
        setIsSidebarOpen(false); // Close the sidebar on route change
    }, [location]);

    return (
        <div className="flex">
            <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} bgColor={bgColor} />
            <Sidebar isSidebarOpen={isSidebarOpen} bgColor={bgColor} />
            <div className={` ${isSidebarOpen ? "ml-64" : "ml-0"} w-full transition-all`}>
                <div >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ProjectOfficeLayout;
