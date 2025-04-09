import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import DataTable from "../components/DataTable";
import Meeting from "../components/Meeting";
import Feedback from "../components/Feedback";
import AnnouncementModal from "../components/AnnouncementModal";

const ProjectDetail = () => {
    const { id } = useParams();
    const [meetings, setMeetings] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isAdvisor = true; 
    useEffect(() => {
        const saved = localStorage.getItem(`announcements-${id}`);
        if (saved) {
            setAnnouncements(JSON.parse(saved));
        } else {
           
            const initial = [
                {
                    srNo: 1,
                    subject: "Chatbot Update",
                    date: "2025-04-01",
                    description: "AI model improvements",
                    attachment: null
                }
            ];
            setAnnouncements(initial);
            localStorage.setItem(`announcements-${id}`, JSON.stringify(initial));
        }
    }, [id]);

    const handleAddAnnouncement = (newAnnouncement) => {
        const updated = [
            ...announcements,
            {
                srNo: announcements.length + 1,
                ...newAnnouncement
            }
        ];
        setAnnouncements(updated);
        localStorage.setItem(`announcements-${id}`, JSON.stringify(updated));
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
                        announcement.attachment?.name
                            ? <a
                                href={announcement.attachment.content}
                                download={announcement.attachment.name}
                                className="text-blue-600 underline"
                              >
                                Download
                              </a>
                            : "No Attachment"
                    ])}
                    noDataMessage="No Announcements"
                />

                <AnnouncementModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleAddAnnouncement}
                />
            </div>
        ),
        "Material": (
            <DataTable
                columns={["Sr No.", "Course Material", "Description", "Download"]}
                data={[{ srNo: 1, material: "Chatbot Documentation", description: "Complete guide", download: "link" }].map(material => [
                    material.srNo,
                    material.material,
                    material.description,
                    material.download
                ])}
                noDataMessage="No Course Materials"
            />
        ),
        "Submission": (
            <DataTable
                columns={["Sr No.", "Name", "Description", "Start Date", "End Date", "Upload"]}
                data={[{ srNo: 1, name: "AI Model", description: "Initial version", startDate: "2025-03-01", endDate: "2025-04-01", upload: "link" }].map(submission => [
                    submission.srNo,
                    submission.name,
                    submission.description,
                    submission.startDate,
                    submission.endDate,
                    submission.upload
                ])}
                noDataMessage="No Submissions"
            />
        ),
        "Feedback": <Feedback sender="Advisor" />,
        "Meeting": <Meeting meetings={meetings} setMeetings={setMeetings} />,
        "Grade Book": (
            <DataTable
                columns={["Sr No.", "Assessment Type", "Best Of", "Obtained Percentage"]}
                data={[{ srNo: 1, assessmentType: "Model Accuracy", bestOf: "N/A", obtainedPercentage: "85%" }].map(grade => [
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
