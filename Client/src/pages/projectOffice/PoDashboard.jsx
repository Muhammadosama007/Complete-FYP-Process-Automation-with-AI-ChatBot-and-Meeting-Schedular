import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Cards from "../../components/Cards";
import ChatButton from "../../components/ChatButton";
import background from "../../assets/images/bg.jpg";

const bgColor = "#1F3F6A";

const PoDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem("googleUser"));
    const profilePic = storedUser?.picture || background;

    const projectOffice = {
        name: storedUser?.name || "Project Office Coordinator",
        email: storedUser?.email || "QasimPo@123gmail.com",
        role: "Coordinator",
    };

    const departmentCards = [
        {
            title: "BS Software Engineering",
            text: "Manage projects under BSSE program.",
            path: "/po/dashboard/bsse",
        },
        {
            title: "BS Computer Science",
            text: "Oversee BSCS project progress.",
            path: "/po/dashboard/bscs",
        },
        {
            title: "BS Information Technology",
            text: "Track BSIT student projects.",
            path: "/po/dashboard/bsit",
        },
    ];

    const ongoingProjects = [
        "AI Chatbot for Campus Automation",
        "Smart Health Monitoring System",
        "E-Voting Blockchain System",
        "Virtual Reality Learning Platform",
    ];

    return (
        <div className={`flex-1 transition-all duration-300 ease-in-out pt-4 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
            <div className="mt-10">
                <Breadcrumb bgColor={bgColor} />
            </div>

            <div className="flex flex-col md:flex-row items-start mt-4 px-4">
                <div className="flex items-center w-full md:w-1/2">
                    <img src={profilePic} alt="Profile" className="w-16 h-16 rounded-full object-cover mr-4" />
                    <div>
                        <p className="text-gray-800 font-semibold text-lg">{projectOffice.name}</p>
                        <p className="text-gray-600 text-sm">{projectOffice.role}</p>
                    </div>
                </div>

                <div className="mt-6 md:mt-0 md:ml-auto w-full md:w-1/2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ongoing Projects</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {ongoingProjects.map((project, index) => (
                            <li key={index}>{project}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="px-4 mt-8">
                <Cards bgColor={bgColor} cardData={departmentCards} setIsSidebarOpen={setIsSidebarOpen} />
            </div>

            <ChatButton bgColor={bgColor} />
        </div>
    );
};

export default PoDashboard;
