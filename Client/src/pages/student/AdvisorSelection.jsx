    import { useEffect, useState } from "react";
    import axios from "axios";
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
        const [advisors, setAdvisors] = useState([]);

        const materials = [
            { id: 1, title: "AI Chatbot Development", description: "A comprehensive guide to building AI chatbots using NLP techniques.", downloadLink: "/Client/public/files/l1f21bsse0375-SQE-Assignment1.pdf" },
            { id: 2, title: "E-Commerce Website Design", description: "Learn to design and implement e-commerce websites with payment gateways.", downloadLink: "/Client/public/files/l1f21bsse0375-SQE-Assignment1.pdf" },
            { id: 3, title: "Smart Attendance System", description: "Develop a smart attendance system using facial recognition and AI.", downloadLink: "/Client/public/files/l1f21bsse0375-SQE-Assignment1.pdf" }
        ];

        useEffect(() => {
            fetchAdvisors();
        }, []);

        const fetchAdvisors = async () => {
            try {
                const res = await axios.get("http://localhost:3002/api/advisors/get");
                setAdvisors(res.data.advisors);
            } catch (error) {
                console.error("Error fetching advisors:", error);
            }
        };

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

        const handleSubmitRequest = async () => {
            if (!attachment || !selectedAdvisor) {
                alert("Please select an advisor and attach a file.");
                return;
            }

            const formData = new FormData();
            formData.append("advisorId", selectedAdvisor._id); // No studentId/projectId needed now
            formData.append("file", attachment);

            try {
                const token = localStorage.getItem("token"); // Make sure token is stored at login
            await axios.post("http://localhost:3002/api/requests/create", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("Request sent successfully!");
            setShowRequestModal(false);
            setSelectedAdvisor(null);
            setAttachment(null);
            fetchAdvisors(); //
            } catch (error) {
                console.error("Failed to send request:", error.response?.data || error);
                alert("Request failed. Please try again.");
            }
        };

        const contentMap = {
            "Advisor Selection": (
                <DataTable
                    columns={["Sr No.", "Advisor Name", "Description", "Advisor Status", "Request"]}
                    data={advisors.map((advisor, index) => [
                        index + 1,
                        advisor.name,
                        advisor.specialization || advisor.email,
                        advisor.isAvailable ? "Available" : "Not Available",
                        advisor.isAvailable ? (
                            <RequestButton
                                key={advisor._id}
                                advisor={advisor}
                                onClick={handleSendRequestClick}
                            />
                        ) : (
                            <span className="text-gray-400">Unavailable</span>
                        )
                    ])}
                    noDataMessage="No Advisors Available"
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
            "Feedback": <Feedback sender="Student" feedbackKey="advisorFeedbacks" />,
            "Meeting": <Meeting readOnly={true} />
        };

        return (
            <>
                <PageLayout
                    initialActiveTab="Advisor Selection"
                    tabs={["Advisor Selection",  "Meeting"]}
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
