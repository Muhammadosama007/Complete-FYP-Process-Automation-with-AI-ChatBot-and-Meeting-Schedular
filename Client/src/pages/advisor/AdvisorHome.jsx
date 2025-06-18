import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumb";
import Cards from "../../components/Cards";
import ChatButton from "../../components/ChatButton";
import background from "../../assets/images/bg.jpg";

const bgColor = "#1F3F6A";

const AdvisorHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [advisor, setAdvisor] = useState(null);

    useEffect(() => {
        const fetchAdvisorData = async () => {
            try {
                const response = await axios.get("http://localhost:3002/api/users/get");
                const advisorUser = JSON.parse(localStorage.getItem("googleUser"))

                setAdvisor({
                    name: advisorUser.name,
                    email: advisorUser.email,
                    faculty: advisorUser.faculty || "N/A",
                    TotalProjects: advisorUser.advisorProjects?.maxCapacity || 0,
                    OnGoing: advisorUser.advisorProjects?.active || 0,
                    Completed: advisorUser.advisorProjects?.completed || 0,
                    avatar: advisorUser.image || background,
                });

                console.log("Advisor Data:", advisorUser);
            } catch (error) {
                console.error("Error fetching advisor data:", error);
            }
        };

        fetchAdvisorData();
    }, []);

    const advisorCards = [
        { title: "Projects", text: "View and oversee student projects.", path: "/advisor/dashboard/projects" },
        { title: "Registration", text: "Approve or reject student group registrations.", path: "/advisor/dashboard/registration" },
        { title: "Student Requests", text: "Review project modification requests.", path: "/advisor/dashboard/requests" },
    ];

    if (!advisor) return <p className="text-center mt-20">Loading...</p>;

    return (
        <div className={`flex-1 transition-all duration-300 ease-in-out pt-4 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
            <div className="mt-10">
                <Breadcrumb bgColor={bgColor} />
            </div>

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

            <Cards bgColor={bgColor} cardData={advisorCards} setIsSidebarOpen={setIsSidebarOpen} />
            <ChatButton bgColor={bgColor} />
        </div>
    );
};

export default AdvisorHome;
