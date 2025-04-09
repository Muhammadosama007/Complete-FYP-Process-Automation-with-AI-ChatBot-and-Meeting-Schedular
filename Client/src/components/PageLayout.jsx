import { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import ChatButton from "./ChatButton";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ContentArea from "./ContentArea";
import TabButton from "./TabButton";

const PageLayout = ({
    initialActiveTab,
    tabs,
    contentMap,
    bgColor = "#1F3F6A",
    children
}) => {
    const [activeTab, setActiveTab] = useState(initialActiveTab);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="font-sans min-h-screen bg-gray-50 transition-all duration-300 ease-in-out">
            {/* Navbar & Sidebar */}
            <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} bgColor={bgColor} />
            <Sidebar isSidebarOpen={isSidebarOpen} bgColor={bgColor} />

            <div
                className={`fixed mt-14 left-0 w-full z-10 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0"
                    }`}
            >
                <Breadcrumb bgColor={bgColor} />
            </div>

            {/* Main Content Area */}
            <div className={`pt-28 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                <main className="container mx-auto px-4 py-6">
                    {children || (
                        <>
                            <div className="flex justify-around gap-4 mb-6">
                                {tabs.map((tab) => (
                                    <TabButton
                                        key={tab}
                                        tab={tab}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                    />
                                ))}
                            </div>
                            <ContentArea activeTab={activeTab} contentMap={contentMap} />
                        </>
                    )}
                </main>
            </div>
            <ChatButton bgColor={bgColor} />
        </div>
    );
};

export default PageLayout;
