import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";
import Cards from "../components/Cards";
import ChatButton from "../components/ChatButton";

const bgColor = "#1F3F6A";

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="font-sans flex flex-col min-h-screen">
            <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} bgColor={bgColor} />

            <div className="flex mt-10 transition-all duration-300 ease-in-out">
                <Sidebar isSidebarOpen={isSidebarOpen} bgColor={bgColor} />

                <div className={`flex-1 transition-all duration-300 ease-in-out p-6 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                    <Breadcrumb bgColor={bgColor} />

                    {/* Info & Standings Section */}
                    <div className="flex flex-col md:flex-row items-start mt-4">
                        <div className="flex items-center">
                            <div className="w-20 h-20 bg-gray-300 rounded-full mr-4"></div>
                            <div>
                                <p className="text-gray-800">Name</p>
                                <p className="text-gray-800">Roll No</p>
                                <p className="text-gray-800">Faculty</p>
                            </div>
                        </div>

                        <div className="mt-4 md:mt-0 md:ml-16 flex flex-grow justify-evenly">
                            <div className="text-gray-700">
                                <h2 className="font-semibold">Project Standings</h2>
                                <p className="text-sm text-gray-500">Project Completion %age</p>
                            </div>
                            <div className="text-gray-700">
                                <h2 className="font-semibold">Earned Cr</h2>
                                <p className="text-sm text-gray-500">Total Cr</p>
                                <p className="text-sm text-gray-500">Inprogress Cr</p>
                            </div>
                            <div className="text-gray-700">
                                <h2 className="font-semibold">Academic Standings</h2>
                                <p className="text-sm text-gray-500">GPA:</p>
                                <p className="text-sm text-gray-500">CGPA:</p>
                            </div>
                        </div>
                    </div>
                    {/* End of Info & Standings Section */}

                    <Cards bgColor={bgColor} />
                </div>
            </div>

            <ChatButton bgColor={bgColor} />
        </div>
    );
};

export default Home;