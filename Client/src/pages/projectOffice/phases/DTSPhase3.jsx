import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../../components/PageLayout";
import DataTable from "../../../components/DataTable";
import AnnouncementModal from "../../../components/AnnouncementModal";
import TemplateModal from "../../../components/TemplateModal";

const DTSPhase3 = () => {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submissions, setSubmissions] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("announcements-dtsphase3");
        if (saved) {
            setAnnouncements(JSON.parse(saved));
        } else {
            const initial = [
                {
                    srNo: 1,
                    subject: "Initial Announcement",
                    date: "2025-04-01",
                    description: "Details for DTSPhase3",
                    attachment: null
                }
            ];
            setAnnouncements(initial);
            localStorage.setItem("announcements-dtsphase3", JSON.stringify(initial));
        }

        const savedSubmissions = localStorage.getItem("dtsphase3-submissions");
        if (savedSubmissions) {
            setSubmissions(JSON.parse(savedSubmissions));
        } else {
            const defaultSubmissions = [
                {
                    srNo: 1,
                    groupName: "Team Alpha",
                    description: "Submission Description",
                    status: "Submitted",
                    startDate: "2025-03-01",
                    endDate: "2025-04-01",
                    fileName: "submission.pdf"
                }
            ];
            setSubmissions(defaultSubmissions);
            localStorage.setItem("dtsphase3-submissions", JSON.stringify(defaultSubmissions));
        }

        const savedMaterials = localStorage.getItem("dtsphase3-materials");
        if (savedMaterials) {
            setMaterials(JSON.parse(savedMaterials));
        } else {
            const defaultMaterials = [
                {
                    srNo: 1,
                    material: "Template",
                    description: "Standard format",
                    file: {
                        name: "template.docx",
                        content: ""
                    }
                }
            ];
            setMaterials(defaultMaterials);
            localStorage.setItem("dtsphase3-materials", JSON.stringify(defaultMaterials));
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
        localStorage.setItem("announcements-dtsphase3", JSON.stringify(updated));
    };

    const handleAddMaterial = (newMaterial) => {
        const updated = [
            ...materials,
            {
                srNo: materials.length + 1,
                ...newMaterial
            }
        ];
        setMaterials(updated);
        localStorage.setItem("dtsphase3-materials", JSON.stringify(updated));
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
                        onClick={() => navigate(`/po/dashboard/bsse/current-projects/dts-phase3/` + sub.srNo)}
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

export default DTSPhase3;
