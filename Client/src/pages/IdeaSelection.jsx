import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import ChatButton from "../components/ChatButton";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TabButton from "../components/TabButton";
import ContentArea from "../components/ContentArea";

const IdeaSelection = () => {
    const [activeTab, setActiveTab] = useState("Anouncement");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const bgColor = "#1F3F6A";

    // Define content for each tab
    const contentMap = {
        "Anouncement": (
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-[#1F3F6A] text-white">
                            <th className="border border-gray-300 px-4 py-3 text-left">Sr No.</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Subject</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Date</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Attachment</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5} className="border border-gray-300 px-4 py-3 text-gray-700">
                                No Announcement
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ),
        "Material": (
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-[#1F3F6A] text-white">
                            <th className="border border-gray-300 px-4 py-3 text-left">Sr No.</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Course Material</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={4} className="border border-gray-300 px-4 py-3 text-gray-700">
                                No Course Material
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ),
        "Submission": (
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-[#1F3F6A] text-white">
                            <th className="border border-gray-300 px-4 py-3 text-left">Sr No.</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Name</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Start Date</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">End Date</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Upload</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={6} className="border border-gray-300 px-4 py-3 text-gray-700">
                                No Course Material
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ),
        "Feedback": (
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-[#1F3F6A] text-white">
                            <th className="border border-gray-300 px-4 py-3 text-left">Sr No.</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Status</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3} className="border border-gray-300 px-4 py-3 text-gray-700">
                                No FeedBack
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ),
        "Grade Book": (
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-[#1F3F6A] text-white">
                            <th className="border border-gray-300 px-4 py-3 text-left">Sr No.</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Assessment Type</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Select Best Of</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Obtained Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={4} className="border border-gray-300 px-4 py-3 text-gray-700">
                                No Course Material
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    };

    return (
        <div className="font-sans min-h-screen bg-gray-50 transition-all duration-300 ease-in-out">
            <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} bgColor={bgColor} />
            <Sidebar isSidebarOpen={isSidebarOpen} bgColor={bgColor} />
            <div className={`mt-16 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                <Breadcrumb bgColor={bgColor} />
                <main className="container mx-auto px-4 py-6">
                    <div className="flex justify-around gap-4 mb-6">
                        {["Anouncement", "Material", "Submission", "Feedback", "Grade Book"].map((tab) => (
                            <TabButton key={tab} tab={tab} activeTab={activeTab} setActiveTab={setActiveTab} />
                        ))}
                    </div>
                    <ContentArea activeTab={activeTab} contentMap={contentMap} />
                </main>
            </div>
            <ChatButton bgColor={bgColor} />
        </div>
    );
};

export default IdeaSelection;
