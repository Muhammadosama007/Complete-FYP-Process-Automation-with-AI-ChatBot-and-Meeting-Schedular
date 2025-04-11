import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../../components/PageLayout";
import DataTable from "../../../components/DataTable";
import AnnouncementModal from "../../../components/AnnouncementModal";

const IdeaSelectionPhase = () => {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("announcements-idea-selection");
        if (saved) {
            setAnnouncements(JSON.parse(saved));
        } else {
            const initial = [
                {
                    srNo: 1,
                    subject: "Initial Idea Submission",
                    date: "2025-04-01",
                    description: "Submit your project ideas",
                    attachment: null
                }
            ];
            setAnnouncements(initial);
            localStorage.setItem("announcements-idea-selection", JSON.stringify(initial));
        }

        const savedSubmissions = localStorage.getItem("idea-selection-submissions");
        if (savedSubmissions) {
            setSubmissions(JSON.parse(savedSubmissions));
        } else {
            const defaultSubmissions = [
                {
                    srNo: 1,
                    groupName: "Team Alpha",
                    description: "AI Chatbot",
                    status: "Submitted",
                    startDate: "2025-03-01",
                    endDate: "2025-04-01",
                    fileName: "chatbot_idea.pdf"
                }
            ];
            setSubmissions(defaultSubmissions);
            localStorage.setItem("idea-selection-submissions", JSON.stringify(defaultSubmissions));
        }
    }, []);

    const handleAddAnnouncement = (newAnnouncement) => {
        const updated = [
            ...announcements,
            {
                srNo: announcements.length + 1,
                ...newAnnouncement
            }
        ];
        setAnnouncements(updated);
        localStorage.setItem("announcements-idea-selection", JSON.stringify(updated));
    };

    const contentMap = {
        "Announcement": (
            <div className="space-y-4">
                <button
                    className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Add Announcement
                </button>

                <DataTable
                    columns={["Sr No.", "Subject", "Date", "Description", "Attachment"]}
                    data={announcements.map(a => [
                        a.srNo,
                        a.subject,
                        a.date,
                        a.description,
                        a.attachment?.name ? (
                            <a href={a.attachment.content} download={a.attachment.name} className="text-blue-600 underline">
                                Download
                            </a>
                        ) : "No Attachment"
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
                data={[{
                    srNo: 1,
                    material: "Idea Template",
                    description: "Standard format",
                    download: "template.docx"
                }].map(m => [
                    m.srNo,
                    m.material,
                    m.description,
                    m.download
                ])}
                noDataMessage="No Course Materials"
            />
        ),
        "Submission": (
            <DataTable
                columns={["Sr No.", "Group Name", "Description","Status", "Start Date", "End Date", "Action"]}
                data={submissions.map(sub => [
                    sub.srNo,
                    sub.groupName,
                    sub.description,
                    sub.status,
                    sub.startDate,
                    sub.endDate,
                    <button
                        className="text-blue-600 underline"
                        onClick={() => navigate("/po/dashboard/bsse/current-projects/:phase/:id")}
                    >
                        View
                    </button>
                ])}
                noDataMessage="No Submissions"
            />
        )
    };

    return (
        <PageLayout
            initialActiveTab="Announcement"
            tabs={["Announcement", "Material", "Submission"]}
            contentMap={contentMap}
        />
    );
};

export default IdeaSelectionPhase;
