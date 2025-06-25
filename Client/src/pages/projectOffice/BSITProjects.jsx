import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Cards from "../../components/Cards";
import ChatButton from "../../components/ChatButton";

const bgColor = "#1F3F6A";

const BSITProjects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const projectStageCards = [
    {
      title: "Current Projects",
      text: "View ongoing FYPs of BSIT.",
      path: "/po/dashboard/bsit/current-projects",
    },
    {
      title: "Past Projects",
      text: "View completed FYPs from previous semesters.",
      path: "/po/dashboard/bsit/past-projects",
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

export default BSITProjects;
