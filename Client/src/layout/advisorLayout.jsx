import React, { useState } from "react";
import Navbar from "../components//Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdvisorLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const bgColor = "#1F3F6A"; 

    return (
        <div className="flex">
            <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} bgColor={bgColor} />
            <Sidebar isSidebarOpen={isSidebarOpen} bgColor={bgColor} />
            <div className={`pt-8 ${isSidebarOpen ? "ml-64" : "ml-0"} w-full transition-all`}>
                <div >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdvisorLayout;
