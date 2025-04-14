import PageLayout from "../../components/PageLayout";
import DataTable from "../../components/DataTable";
import Feedback from "../../components/Feedback";
import Meeting from "../../components/Meeting";
import { saveAs } from 'file-saver';
import { FaDownload } from 'react-icons/fa';

const AdvisorSelection = () => {
    const advisors = [
        { id: 1, name: "Dr. Ahmed", description: "Expert in AI Chatbots and NLP", status: "available" },
        { id: 2, name: "Prof. Ayesha", description: "Specialist in E-Commerce systems", status: "available" },
        { id: 3, name: "Dr. Bilal", description: "Experienced in Smart Attendance Systems", status: "not available" }
    ];

    const materials = [
        { id: 1, title: "AI Chatbot Development", description: "A comprehensive guide to building AI chatbots using NLP techniques.", downloadLink: "/Client/public/files/l1f21bsse0375-SQE-Assignment1.pdf" },
        { id: 2, title: "E-Commerce Website Design", description: "Learn to design and implement e-commerce websites with payment gateways.", downloadLink: "/Client/public/files/l1f21bsse0375-SQE-Assignment1.pdf" },
        { id: 3, title: "Smart Attendance System", description: "Develop a smart attendance system using facial recognition and AI.", downloadLink: "/Client/public/files/l1f21bsse0375-SQE-Assignment1.pdf" }
    ];

    const handleDownload = (fileUrl, fileName) => {
        saveAs(fileUrl, fileName);
    };

    const contentMap = {
        "Advisor Selection": (
            <DataTable
                columns={["Sr No.", "Advisor Name", "Description", "Advisor Status", "Request"]}
                data={advisors.map((advisor) => [
                    advisor.id,
                    advisor.name,
                    advisor.description,
                    advisor.status,
                    <button
                        key={advisor.id}
                        className={`px-3 py-1 rounded text-white ${advisor.status == "available" ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
                            }`}
                        onClick={() => sendRequest(advisor.id)}
                        disabled={!advisor.available}
                    >
                        Send Request
                    </button>
                ])}
                noDataMessage="No Projects Yet"
            />
        ),
        "Material": (
            <DataTable
                columns={["Sr No.", "Course Material", "Description", "Download"]}
                data={materials.map((material) => [
                    material.id,
                    material.title,
                    material.description,
                    <button
                        key={material.id}
                        onClick={() => handleDownload(material.downloadLink, material.title + ".pdf")}
                        className="px-3 py-1 ml-6 rounded bg-[#1F3F6A] hover:bg-[#1F3F6A] text-white"
                    >
                        <FaDownload size={20} color="white" />
                    </button>
                ])}
                noDataMessage="No Course Material"
            />
        ),
        "Feedback": (
            <>
                <Feedback sender="Student" feedbackKey="advisorFeedbacks" />
            </>
        ),
        "Meeting": (
            <Meeting readOnly={true} />
        )
    };

    return (
        <PageLayout
            initialActiveTab="Advisor Selection"
            tabs={["Advisor Selection", "Material", "Feedback", "Meeting"]}
            contentMap={contentMap}
        />
    );
};

export default AdvisorSelection;