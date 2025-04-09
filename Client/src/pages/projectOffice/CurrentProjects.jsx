import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Breadcrumb from "../../components/Breadcrumb";
import ChatButton from "../../components/ChatButton";

const bgColor = "#1F3F6A";

const CurrentProjects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const projects = [
    {
      title: "AI Chatbot for Campus Automation",
      description: "A smart assistant to automate campus queries using NLP.",
    },
    {
      title: "Smart Attendance System",
      description: "A facial recognition based solution to track attendance.",
    },
    {
      title: "Project Management Web App",
      description: "A tool for FYP students and supervisors to collaborate.",
    },
  ];

  return (
    // <div className="font-sans flex flex-col min-h-screen">
    //   <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} bgColor={bgColor} />
    //   <div className="flex mt-10">
    //     <Sidebar isSidebarOpen={isSidebarOpen} bgColor={bgColor} />
        <div className={`flex-1 pt-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
          <Breadcrumb bgColor={bgColor} />
          <div className="px-4 mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ongoing FYP Projects (BSSE)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((proj, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800">{proj.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        {/* </div>
      </div> */}
      <ChatButton bgColor={bgColor} />
    </div>
  );
};

export default CurrentProjects;
