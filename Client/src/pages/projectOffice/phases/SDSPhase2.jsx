import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../../components/PageLayout";
import DataTable from "../../../components/DataTable";
import AnnouncementModal from "../../../components/AnnouncementModal";
import TemplateModal from "../../../components/TemplateModal";

const SDSPhase2 = () => {
    const navigate = useNavigate();

    const [announcements, setAnnouncements] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

    // === Load data from localStorage on mount ===
    useEffect(() => {
        const savedAnnouncements = JSON.parse(localStorage.getItem("announcements-sdsphase2")) || [];
        const savedSubmissions = JSON.parse(localStorage.getItem("sdsphase2-submissions")) || [];
        const savedMaterials = JSON.parse(localStorage.getItem("sdsphase2-materials")) || [];

        if (savedAnnouncements.length) setAnnouncements(savedAnnouncements);
        else {
            const defaultAnnouncements = [{
                srNo: 1,
                subject: "Initial Announcement",
                date: "2025-04-01",
                description: "Details for SDSPhase2",
                attachment: null
            }];
            setAnnouncements(defaultAnnouncements);
            localStorage.setItem("announcements-sdsphase2", JSON.stringify(defaultAnnouncements));
        }

        if (savedSubmissions.length) setSubmissions(savedSubmissions);
        else {
            const defaultSubs = [{
                srNo: 1,
                groupName: "Team Alpha",
                description: "Submission Description",
                status: "Submitted",
                startDate: "2025-03-01",
                endDate: "2025-04-01",
                fileName: "submission.pdf"
            }];
            setSubmissions(defaultSubs);
            localStorage.setItem("sdsphase2-submissions", JSON.stringify(defaultSubs));
        }

        if (savedMaterials.length) setMaterials(savedMaterials);
        else {
            const defaultMaterials = [{
                srNo: 1,
                material: "Template",
                description: "Standard format",
                file: {
                    name: "template.docx",
                    content: ""
                }
            }];
            setMaterials(defaultMaterials);
            localStorage.setItem("sdsphase2-materials", JSON.stringify(defaultMaterials));
        }
    }, []);

    // === Handlers ===
    const handleAddAnnouncement = (newAnnouncement) => {
        const updated = [
            ...announcements,
            { srNo: announcements.length + 1, ...newAnnouncement }
        ];
        setAnnouncements(updated);
        localStorage.setItem("announcements-sdsphase2", JSON.stringify(updated));
        setIsModalOpen(false); // ✅ close modal
    };

    const handleAddMaterial = (newMaterial) => {
        const updated = [
            ...materials,
            { srNo: materials.length + 1, ...newMaterial }
        ];
        setMaterials(updated);
        localStorage.setItem("sdsphase2-materials", JSON.stringify(updated));
        setIsTemplateModalOpen(false); // ✅ close modal
    };

    // === Tab Content Map ===
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
            <div className="space-y-4">
                <button
                    className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900"
                    onClick={() => setIsTemplateModalOpen(true)}
                >
                    + Add Template
                </button>

                <DataTable
                    columns={["Sr No.", "Course Material", "Description", "Download"]}
                    data={materials.map(m => [
                        m.srNo,
                        m.material,
                        m.description,
                        m.file?.name ? (
                            <a href={m.file.content} download={m.file.name} className="text-blue-600 underline">
                                Download
                            </a>
                        ) : "No File"
                    ])}
                    noDataMessage="No Course Materials"
                />

                <TemplateModal
                    isOpen={isTemplateModalOpen}
                    onClose={() => setIsTemplateModalOpen(false)}
                    onSave={handleAddMaterial}
                />
            </div>
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
                        onClick={() => navigate(`/po/dashboard/bsse/current-projects/sds-phase2/${sub.srNo}`)}
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

export default SDSPhase2;
