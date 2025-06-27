import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import DataTable from "../../components/DataTable";
import TemplateModal from "../../components/TemplateModal"; // Optional for document upload

const PastProjects = () => {
    const { dept } = useParams(); // Get dynamic department
    const [projects, setProjects] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [isDocModalOpen, setIsDocModalOpen] = useState(false);

    useEffect(() => {
        // Simulate past project data per department
        const key = `past-projects-${dept}`;
        const saved = localStorage.getItem(key);
        if (saved) {
            setProjects(JSON.parse(saved));
        } else {
            const defaultData = [
                {
                    srNo: 1,
                    title: "AI Chatbot",
                    group: "Team Alpha",
                    supervisor: "Dr. Adeel",
                    year: "2024",
                    document: {
                        name: "chatbot_final.pdf",
                        content: "/documents/chatbot_final.pdf"
                    }
                }
            ];
            setProjects(defaultData);
            localStorage.setItem(key, JSON.stringify(defaultData));
        }

        // Documents (Optional)
        const docKey = `past-documents-${dept}`;
        const savedDocs = localStorage.getItem(docKey);
        if (savedDocs) {
            setDocuments(JSON.parse(savedDocs));
        } else {
            const defaultDocs = [
                {
                    srNo: 1,
                    material: "Final Template",
                    description: "Used for FYP final report",
                    file: {
                        name: "final_template.docx",
                        content: "/documents/final_template.docx"
                    }
                }
            ];
            setDocuments(defaultDocs);
            localStorage.setItem(docKey, JSON.stringify(defaultDocs));
        }
    }, [dept]);

    // Optional upload document
    const handleAddDocument = (newDoc) => {
        const updated = [
            ...documents,
            {
                srNo: documents.length + 1,
                ...newDoc
            }
        ];
        setDocuments(updated);
        localStorage.setItem(`past-documents-${dept}`, JSON.stringify(updated));
    };

    const contentMap = {
        "Past Projects": (
            <DataTable
                columns={["Sr No.", "Project Title", "Group", "Supervisor", "Year", "Document"]}
                data={projects.map(p => [
                    p.srNo,
                    p.title,
                    p.group,
                    p.supervisor,
                    p.year,
                    p.document?.name ? (
                        <a
                            href={p.document.content}
                            download={p.document.name}
                            className="text-blue-600 underline"
                        >
                            Download
                        </a>
                    ) : "No File"
                ])}
                noDataMessage="No Past Projects"
            />
        ),

        "Documents": (
            <div className="space-y-4">
                <button
                    className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900"
                    onClick={() => setIsDocModalOpen(true)}
                >
                    + Add Document
                </button>

                <DataTable
                    columns={["Sr No.", "Material", "Description", "Download"]}
                    data={documents.map(m => [
                        m.srNo,
                        m.material,
                        m.description,
                        m.file?.name ? (
                            <a href={m.file.content} download={m.file.name} className="text-blue-600 underline">
                                Download
                            </a>
                        ) : "No File"
                    ])}
                    noDataMessage="No Documents Available"
                />

                <TemplateModal
                    isOpen={isDocModalOpen}
                    onClose={() => setIsDocModalOpen(false)}
                    onSave={handleAddDocument}
                />
            </div>
        )
    };

    return (
        <PageLayout
            initialActiveTab="Past Projects"
            tabs={["Past Projects", "Documents"]}
            contentMap={contentMap}
        />
    );
};

export default PastProjects;
