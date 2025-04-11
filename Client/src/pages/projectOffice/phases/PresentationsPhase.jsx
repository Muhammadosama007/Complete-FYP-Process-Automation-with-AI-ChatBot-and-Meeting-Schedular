import React, { useState } from "react";
import PageLayout from "../../../components/PageLayout";
import DataTable from "../../../components/DataTable";
import AnnouncementModal from "../../../components/AnnouncementModal";
import { useNavigate } from "react-router-dom";

const PresentationsPhase = () => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [submissions, setSubmissions] = useState([
        {
            srNo: 1,
            groupName: "Group A",
            description: "Presentation slides for milestone 1",
            status: "Reviewed",
            startDate: "2025-03-01",
            endDate: "2025-03-10"
        },
        {
            srNo: 2,
            groupName: "Group B",
            description: "Final presentation slides",
            status: "Pending",
            startDate: "2025-03-05",
            endDate: "2025-03-15"
        }
    ]);

    const handleAddAnnouncement = (announcement) => {
        const newAnnouncement = {
            srNo: announcements.length + 1,
            ...announcement
        };
        setAnnouncements(prev => [...prev, newAnnouncement]);
    };

    const contentMap = {
        "Announcement": (
            <div className="p-4">
                <button
                    className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
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
                    material: "Presentation Guidelines",
                    description: "Standards for final year presentations",
                    download: "presentation_guidelines.pdf"
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

export default PresentationsPhase;
