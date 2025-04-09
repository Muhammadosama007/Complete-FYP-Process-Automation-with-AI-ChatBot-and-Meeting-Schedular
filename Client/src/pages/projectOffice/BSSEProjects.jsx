import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Breadcrumb from "../../components/Breadcrumb";
import Cards from "../../components/Cards";
import ChatButton from "../../components/ChatButton";

const bgColor = "#1F3F6A";

const BSSEProjects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const projectStageCards = [
    {
      title: "Current Projects",
      text: "View ongoing FYPs of BSSE.",
      path: "/po/bsse/current-projects",
    },
    {
      title: "Past Projects",
      text: "View completed FYPs from previous semesters.",
      path: "/po/bsse/past-projects",
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
            <Cards bgColor={bgColor} cardData={projectStageCards} />
          </div>
        {/* </div>
      </div> */}
      <ChatButton bgColor={bgColor} />
    </div>
  );
};

export default BSSEProjects;
