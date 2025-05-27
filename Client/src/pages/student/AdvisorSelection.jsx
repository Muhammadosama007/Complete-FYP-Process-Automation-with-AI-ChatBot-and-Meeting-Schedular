import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import DataTable from "../../components/DataTable";
import Feedback from "../../components/Feedback";
import Meeting from "../../components/Meeting";
import { saveAs } from 'file-saver';

import SendRequestModal from "../../components/SendRequestModal";
import RequestButton from "../../components/RequestButton";
import DownloadButton from "../../components/DownloadButton";

const AdvisorSelection = () => {
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [selectedAdvisor, setSelectedAdvisor] = useState(null);
    const [attachment, setAttachment] = useState(null);

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

    const handleSendRequestClick = (advisor) => {
        setSelectedAdvisor(advisor);
        setShowRequestModal(true);
    };

    const handleAttachmentChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleSubmitRequest = () => {
        if (!attachment) {
            alert("Please attach a file before sending request.");
            return;
        }

        const existingRequests = JSON.parse(localStorage.getItem("requests")) || [];

        const newRequest = {
            id: Date.now(),
            name: "Current Student",
            title: selectedAdvisor?.description,
            attachment: attachment.name,
            status: "Pending",
        };

        const updatedRequests = [...existingRequests, newRequest];
        localStorage.setItem("requests", JSON.stringify(updatedRequests));

        setShowRequestModal(false);
        setSelectedAdvisor(null);
        setAttachment(null);
        alert("Request sent successfully!");
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
                    <RequestButton key={advisor.id} advisor={advisor} onClick={handleSendRequestClick} />
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
                    <DownloadButton key={material.id} onDownload={() => handleDownload(material.downloadLink, material.title + ".pdf")} />
                ])}
                noDataMessage="No Course Material"
            />
        ),
        "Feedback": (
            <Feedback sender="Student" feedbackKey="advisorFeedbacks" />
        ),
        "Meeting": (
            <Meeting readOnly={true} />
        )
    };

    return (
        <>
            <PageLayout
                initialActiveTab="Advisor Selection"
                tabs={["Advisor Selection", "Material", "Feedback", "Meeting"]}
                contentMap={contentMap}
            />

            {showRequestModal && (
                <SendRequestModal
                    advisor={selectedAdvisor}
                    onClose={() => setShowRequestModal(false)}
                    onFileChange={handleAttachmentChange}
                    onSubmit={handleSubmitRequest}
                />
            )}
        </>
    );
};

export default AdvisorSelection;
