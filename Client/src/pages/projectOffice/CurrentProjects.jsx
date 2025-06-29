import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Cards from "../../components/Cards";
import ChatButton from "../../components/ChatButton";

const bgColor = "#1F3F6A";

const CurrentProjects = () => {
    const { dept } = useParams(); // Get dept from URL
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const phaseCards = [
        { title: "Idea Selection", text: "Initial project idea phase.", path: `/po/dashboard/${dept}/current-projects/idea-selection` },
        { title: "Presentations", text: "Presentation and defense phase.", path: `/po/dashboard/${dept}/current-projects/presentations` },
        { title: "Proposal Phase", text: "Formal proposal submission.", path: `/po/dashboard/${dept}/current-projects/proposal` },
        { title: "RS Phase 1", text: "Requirement Specification Phase 1.", path: `/po/dashboard/${dept}/current-projects/rs-phase1` },
        { title: "SDS Phase 2", text: "System Design Specification Phase 2.", path: `/po/dashboard/${dept}/current-projects/sds-phase2` },
        { title: "DTS Phase 3", text: "Detailed Technical Specification Phase 3.", path: `/po/dashboard/${dept}/current-projects/dts-phase3` },
        { title: "Final Phase 4", text: "Final project submission and evaluation.", path: `/po/dashboard/${dept}/current-projects/final-phase4` },
    ];

    return (
        <div className={`flex-1 transition-all duration-300 ease-in-out pt-4 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
            <div className="mt-10">
                <Breadcrumb bgColor={bgColor} />
            </div>
            <div className="px-4 mt-8">
                <Cards bgColor={bgColor} cardData={phaseCards} />
            </div>
            <ChatButton bgColor={bgColor} />
        </div>
    );
};

export default CurrentProjects;
