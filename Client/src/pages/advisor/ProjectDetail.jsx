import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import DataTable from "../../components/DataTable";
import Meeting from "../../components/Meeting";
import Feedback from "../../components/Feedback";
import AnnouncementModal from "../../components/AnnouncementModal";
import MaterialModal from "../../components/AddMaterialModal";
import { FaDownload } from 'react-icons/fa';

const ProjectDetail = () => {
    const { id } = useParams();
    const [meetings, setMeetings] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [materials, setMaterials] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);

    const isAdvisor = true;

    // Announcements
   useEffect(() => {
    const fetchAnnouncements = async () => {
        try {
            const res = await fetch(`http://localhost:3002/api/announcements?projectId=${id}`);
            const data = await res.json();

            // Handle non-array (error) response gracefully
            if (!Array.isArray(data)) {
                throw new Error("Invalid data received");
            }

            const withSrNo = data.map((a, i) => ({ ...a, srNo: i + 1 }));
            setAnnouncements(withSrNo);
        } catch (err) {
            console.error("Error fetching announcements:", err);
        }
    };

    if (id) fetchAnnouncements();
}, [id]);


    const handleAddAnnouncement = (newAnnouncement) => {
        const updated = [...announcements, { ...newAnnouncement, srNo: announcements.length + 1 }];
        setAnnouncements(updated);
    };

    // Materials
    useEffect(() => {
        const saved = localStorage.getItem(`materials-${id}`);
        if (saved) {
            setMaterials(JSON.parse(saved));
        }
    }, [id]);

    const handleAddMaterial = (newMaterial) => {
        const updated = [...materials, { srNo: materials.length + 1, ...newMaterial }];
        setMaterials(updated);
        localStorage.setItem(`materials-${id}`, JSON.stringify(updated));
    };

    const contentMap = {
        "Announcement": (
            <div className="space-y-4">
                {isAdvisor && (
                    <button
                        className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + Add Announcement
                    </button>
                )}
                <DataTable
                    columns={["Sr No.", "Subject", "Date", "Description", "Attachment"]}
                    data={announcements.map(announcement => [
                        announcement.srNo,
                        announcement.subject,
                        announcement.date,
                        announcement.description,
                        announcement.attachment?.name ? (
                            <a
                                href={announcement.attachment.content}
                                download={announcement.attachment.name}
                            >
                                <FaDownload size={20} />
                            </a>
                        ) : "No Attachment"
                    ])}
                    noDataMessage="No Announcements"
                />
                <AnnouncementModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleAddAnnouncement}
                    projectId={id}
                />
            </div>
        ),
        "Material": (
            <div className="space-y-4">
                {isAdvisor && (
                    <button
                        className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900"
                        onClick={() => setIsMaterialModalOpen(true)}
                    >
                        + Add Material
                    </button>
                )}
                <DataTable
                    columns={["Sr No.", "Course Material", "Description", "Download"]}
                    data={materials.map(material => [
                        material.srNo,
                        material.material,
                        material.description,
                        material.attachment?.name ? (
                            <a
                                href={material.attachment.content}
                                download={material.attachment.name}
                            >
                                <FaDownload size={20} />
                            </a>
                        ) : "No Attachment"
                    ])}
                    noDataMessage="No Course Materials"
                />
                <MaterialModal
                    isOpen={isMaterialModalOpen}
                    onClose={() => setIsMaterialModalOpen(false)}
                    onSave={handleAddMaterial}
                />
            </div>
        ),
        "Submission": (
            <DataTable
                columns={["Sr No.", "Name", "Description", "Start Date", "End Date", "Submission"]}
                data={[{
                    srNo: 1,
                    name: "AI Model",
                    description: "Initial version",
                    startDate: "2025-03-01",
                    endDate: "2025-04-01",
                    submissions: "download"
                }].map(submission => [
                    submission.srNo,
                    submission.name,
                    submission.description,
                    submission.startDate,
                    submission.endDate,
                    submission.submissions
                ])}
                noDataMessage="No Submissions"
            />
        ),
        "Feedback": <Feedback sender="Advisor" />,
        "Meeting": <Meeting meetings={meetings} setMeetings={setMeetings} />,
        "Grade Book": (
            <DataTable
                columns={["Sr No.", "Assessment Type", "Best Of", "Obtained Percentage"]}
                data={[{
                    srNo: 1,
                    assessmentType: "Model Accuracy",
                    bestOf: "N/A",
                    obtainedPercentage: "85%"
                }].map(grade => [
                    grade.srNo,
                    grade.assessmentType,
                    grade.bestOf,
                    grade.obtainedPercentage
                ])}
                noDataMessage="No grade data available"
            />
        )
    };

    return (
        <PageLayout
            initialActiveTab="Announcement"
            tabs={["Announcement", "Material", "Feedback", "Meeting", "Submission", "Grade Book"]}
            contentMap={contentMap}
        />
    );
};

export default ProjectDetail;
