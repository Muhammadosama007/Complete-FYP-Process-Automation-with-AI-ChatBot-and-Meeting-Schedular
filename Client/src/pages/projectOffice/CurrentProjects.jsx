// src/pages/po/CurrentProjects.jsx

import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Cards from "../../components/Cards";
import ChatButton from "../../components/ChatButton";

const bgColor = "#1F3F6A";

// These phase cards are common across departments
const phaseCards = [
  { title: "Idea Selection", text: "Initial project idea phase." },
  { title: "Presentations", text: "Presentation and defense phase." },
  { title: "Proposal Phase", text: "Formal proposal submission." },
  { title: "RS Phase 1", text: "Requirement Specification Phase 1." },
  { title: "SDS Phase 2", text: "System Design Specification Phase 2." },
  { title: "DTS Phase 3", text: "Detailed Technical Specification Phase 3." },
  { title: "Final Phase 4", text: "Final project submission and evaluation." },
];

const CurrentProjects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { dept } = useParams(); 

  const departmentPath = `/po/dashboard/${dept}/current-projects`;

  // Add dynamic path to each card
  const cardsWithPath = phaseCards.map((card) => ({
    ...card,
    path: `${departmentPath}/${card.title.toLowerCase().replace(/\s+/g, "-")}`,
  }));

  return (
    <div className={`flex-1 transition-all duration-300 ease-in-out pt-4 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
      <div className="mt-10">
        <Breadcrumb bgColor={bgColor} />
      </div>
      <div className="px-4 mt-8">
        <Cards bgColor={bgColor} cardData={cardsWithPath} />
      </div>
      <ChatButton bgColor={bgColor} />
    </div>
  );
};

export default CurrentProjects;
