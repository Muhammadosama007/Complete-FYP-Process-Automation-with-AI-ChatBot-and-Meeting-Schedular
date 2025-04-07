// src/pages/AdvisorHome.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";
import Cards from "../components/Cards";
import ChatButton from "../components/ChatButton";

const bgColor = "#1F3F6A";

const AdvisorHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const advisor = {
        name: "John Doe",
        email: "21F-1234",
        faculty: "Computer Science",
        TotalProjects: 5,
        OnGoing: 2,
        Completed: 3,
        avatar: ".png", 
    };

    const advisorCards = [
        { title: "Projects", text: "View and oversee student projects.", path: "/advisor/projects" },
        { title: "Registration", text: "Approve or reject student group registrations.", path: "/advisor/registration" },
        { title: "Student Requests", text: "Review project modification requests.", path: "/advisor/requests" },
    ];

    return (
        <div className="font-sans flex flex-col min-h-screen">
            <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} bgColor={bgColor} />

            <div className="flex mt-10 transition-all duration-300 ease-in-out">
                <Sidebar isSidebarOpen={isSidebarOpen} bgColor={bgColor} />

                <div className={`flex-1 transition-all duration-300 ease-in-out p-6 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                    <Breadcrumb bgColor={bgColor} />

                    <div className="flex flex-col md:flex-row items-start mt-4">
                        <div className="flex items-center">
                            <img
                                src={advisor.avatar}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover mr-4"
                            />
                            <div>
                                <p className="text-gray-800 font-semibold">{advisor.name}</p>
                                <p className="text-gray-600">Email: {advisor.email}</p>
                                <p className="text-gray-600">Faculty: {advisor.faculty}</p>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-16 flex flex-grow justify-evenly">
                            <div className="text-gray-700">
                                <h2 className="font-semibold">Projects</h2>
                                <p className="text-sm text-gray-500">Total: {advisor.TotalProjects}</p>
                                <p className="text-sm text-gray-500">Active: {advisor.OnGoing}</p>
                                <p className="text-sm text-gray-500">Completed: {advisor.Completed}</p>
                            </div>
                        </div>
                    </div>

                    <Cards bgColor={bgColor} cardData={advisorCards} />
                </div>
            </div>

            <ChatButton bgColor={bgColor} />
        </div>
    );
};

export default AdvisorHome;