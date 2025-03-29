import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import ChatButton from "../components/ChatButton";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TabButton from "../components/TabButton";
import ContentArea from "../components/IdeaContentArea";

const IdeaSelection = () => {
    const [activeTab, setActiveTab] = useState("Announcement");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const bgColor = "#1F3F6A";

    return (
        <div className="font-sans min-h-screen bg-gray-50 transition-all duration-300 ease-in-out">
            {/* Navbar */}
            <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} bgColor={bgColor} />

            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} bgColor={bgColor} />

            {/* Content Wrapper */}
            <div className={`mt-16 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                {/* Breadcrumb Navigation */}
                <Breadcrumb bgColor={bgColor} />

                {/* Main Content */}
                <main className="container mx-auto px-4 py-6">
                    {/* Tabs */}
                    <div className="flex justify-around gap-4 mb-6">
                        {["Announcement", "Material", "Submission", "Feedback", "Grade Book"].map((tab) => (
                            <TabButton key={tab} tab={tab} activeTab={activeTab} setActiveTab={setActiveTab} />
                        ))}
                    </div>

                    {/* Content Area */}
                    <ContentArea activeTab={activeTab} />
                </main>
            </div>

            {/* Chat Button */}
            <ChatButton bgColor={bgColor} />
        </div>
    );
};

export default IdeaSelection;