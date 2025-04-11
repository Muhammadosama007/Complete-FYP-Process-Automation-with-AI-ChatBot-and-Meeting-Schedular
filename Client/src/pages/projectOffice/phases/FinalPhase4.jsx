import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../../components/PageLayout";
import DataTable from "../../../components/DataTable";
import AnnouncementModal from "../../../components/AnnouncementModal";

const FinalPhase4 = () => {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("announcements-final-phase4");
        if (saved) {
            setAnnouncements(JSON.parse(saved));
        } else {
            const initial = [
                {
                    srNo: 1,
                    subject: "Final Submission",
                    date: "2025-04-25",
                    description: "Submit final project documents",
                    attachment: null
                }
            ];
            setAnnouncements(initial);
            localStorage.setItem("announcements-final-phase4", JSON.stringify(initial));
        }

        const savedSubmissions = localStorage.getItem("final-phase4-submissions");
        if (savedSubmissions) {
            setSubmissions(JSON.parse(savedSubmissions));
        } else {
            const defaultSubmissions = [
                {
                    srNo: 1,
                    groupName: "Team Zeta",
                    description: "Final Project Report",
                    status: "Submitted",
                    startDate: "2025-04-20",
                    endDate: "2025-04-30",
                    fileName: "final_project_report.pdf"
                }
            ];
            setSubmissions(defaultSubmissions);
            localStorage.setItem("final-phase4-submissions", JSON.stringify(defaultSubmissions));
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
        localStorage.setItem("announcements-final-phase4", JSON.stringify(updated));
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
                    material: "Final Phase 4 Template",
                    description: "Final Project Report Template",
                    download: "final_phase4_template.docx"
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
                columns={["Sr No.", "Group Name", "Description", "Status", "Start Date", "End Date", "Action"]}
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

export default FinalPhase4;
