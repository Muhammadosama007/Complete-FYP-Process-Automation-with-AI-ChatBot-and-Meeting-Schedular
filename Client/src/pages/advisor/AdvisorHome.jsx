import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Cards from "../../components/Cards";
import ChatButton from "../../components/ChatButton";
import background from "../../assets/images/bg.jpg";

const bgColor = "#1F3F6A";

const AdvisorHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const storedUser = JSON.parse(localStorage.getItem("googleUser"));

    const profilePic = storedUser?.picture || background;
    const advisor = {
        name: storedUser?.name || "John Doe",
        email: "21F-1234",
        faculty: "Computer Science",
        TotalProjects: 5,
        OnGoing: 2,
        Completed: 3,
        avatar: ".png",
    };

    const advisorCards = [
        { title: "Projects", text: "View and oversee student projects.", path: "/advisor/dashboard/projects" },
        { title: "Registration", text: "Approve or reject student group registrations.", path: "/advisor/dashboard/registration" },
        { title: "Student Requests", text: "Review project modification requests.", path: "/advisor/dashboard/requests" },
    ];

    return (
        <div className={`flex-1 transition-all duration-300 ease-in-out pt-4 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
            <div className="mt-10">
                <Breadcrumb bgColor={bgColor} />
            </div>
            <div className="flex flex-col md:flex-row items-start mt-4">
                <div className="flex items-center">
                    <img
                        src={profilePic}
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

            <Cards bgColor={bgColor} cardData={advisorCards} setIsSidebarOpen={setIsSidebarOpen} />

            <ChatButton bgColor={bgColor} />
        </div>
    );
};

export default AdvisorHome;
