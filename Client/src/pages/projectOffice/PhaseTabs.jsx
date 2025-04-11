import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DataTable from "../../components/DataTable";
import PageLayout from "../../components/PageLayout";
import { Breadcrumb } from "../../components/Breadcrumb";

const PhaseTabs = () => {
    const { phaseId } = useParams();
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const initialSubmissions = [
            { id: 1, title: "AI Chatbot for Campus", description: "Campus chatbot for queries", documentLink: "/submissions/ai-chatbot.pdf" },
            { id: 2, title: "Virtual Assistant", description: "Assistant to help students", documentLink: "/submissions/virtual-assistant.pdf" }
        ];
        setSubmissions(initialSubmissions);
    }, [phaseId]);

    const contentMap = {
        "Announcement": <div>Announcements for {phaseId}</div>,
        "Material": <div>Materials for {phaseId}</div>,
        "Submission": (
            <DataTable
                columns={["Sr No.", "Title", "Description", "Document", "Action"]}
                data={submissions.map((submission) => [
                    submission.id,
                    submission.title,
                    submission.description,
                    <a href={submission.documentLink} target="_blank" className="text-blue-600 underline">Download</a>,
                    <Link to={`/project-office/phase/${phaseId}/submission/${submission.id}`} className="text-blue-600">View</Link>
                ])}
                noDataMessage="No Submissions"
            />
        )
    };

    return (
        <div>
            <Breadcrumb currentPage={phaseId} />
            <PageLayout
                initialActiveTab="Announcement"
                tabs={["Announcement", "Material", "Submission"]}
                contentMap={contentMap}
            />
        </div>
    );
};

export default PhaseTabs;
