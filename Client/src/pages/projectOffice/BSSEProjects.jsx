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
      path: "/po/dashboard/bsse/current-projects",
    },
    {
      title: "Past Projects",
      text: "View completed FYPs from previous semesters.",
      path: "/po/dashboard/bsse/past-projects",
    },
  ];

  return (
    <div className={`flex-1 transition-all duration-300 ease-in-out pt-4 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
    <div className="mt-10">
    <Breadcrumb bgColor={bgColor} />
    </div>
          <div className="px-4 mt-8">
            <Cards bgColor={bgColor} cardData={projectStageCards} />
          </div>
      <ChatButton bgColor={bgColor} />
    </div>
  );
};

export default BSSEProjects;
