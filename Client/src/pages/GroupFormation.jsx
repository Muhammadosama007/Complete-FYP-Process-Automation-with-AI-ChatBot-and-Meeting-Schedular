import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import ChatButton from "../components/ChatButton";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TabButton from "../components/TabButton";
import ContentArea from "../components/ContentArea";

const GroupFormation = () => {
    const [activeTab, setActiveTab] = useState("Available List");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const bgColor = "#1F3F6A";

    // Define content for each tab
    const contentMap = {
        "Available List": (
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-[#1F3F6A] text-white">
                            <th className="border border-gray-300 px-4 py-3 text-left">Sr No.</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Domain</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3} className="border border-gray-300 px-4 py-3 text-gray-700">
                                No List Yet
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ),
        "New Form": (
            <div className="w-full mx-auto mt-10 border p-6 shadow-md rounded-lg">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input type="text" className="w-96 border-b border-gray-300 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-gray-700">WhatsApp Number</label>
                        <input type="text" className="w-96 border-b border-gray-300 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Students Req in Group</label>
                        <input type="number" min="0" max="3" className="w-96 border-b border-gray-300 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Domain</label>
                        <input type="text" className="w-96 border-b border-gray-300 outline-none focus:border-blue-500" />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button className="bg-[#1F3F6A] text-white px-6 py-2 rounded-md">Submit</button>
                </div>
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
                        {["Available List", "New Form"].map((tab) => (
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

export default GroupFormation;
