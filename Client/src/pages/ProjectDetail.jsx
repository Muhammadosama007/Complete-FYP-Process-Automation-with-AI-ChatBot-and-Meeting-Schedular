import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import DataTable from "../components/DataTable";
import Meeting from "../components/Meeting";
import Feedback from "../components/Feedback";

const ProjectDetail = () => {
    const { id } = useParams();
    const [meetings, setMeetings] = useState([]);
    
    const projectDetails = {
        id,
        title: "AI Chatbot",
        students: "Ali, Ayesha",
        announcements: [
            { srNo: 1, subject: "Chatbot Update", date: "2025-04-01", description: "AI model improvements", attachment: "link" }
        ],
        materials: [
            { srNo: 1, material: "Chatbot Documentation", description: "Complete guide", download: "link" }
        ],
        submissions: [
            { srNo: 1, name: "AI Model", description: "Initial version", startDate: "2025-03-01", endDate: "2025-04-01", upload: "link" }
        ],
        gradeBook: [
            { srNo: 1, assessmentType: "Model Accuracy", bestOf: "N/A", obtainedPercentage: "85%" }
        ]
    };

    const contentMap = {
        "Announcement": (
            <DataTable
                columns={["Sr No.", "Subject", "Date", "Description", "Attachment"]}
                data={projectDetails.announcements.map(announcement => [
                    announcement.srNo,
                    announcement.subject,
                    announcement.date,
                    announcement.description,
                    announcement.attachment
                ])}
                noDataMessage="No Announcements"
            />
        ),
        "Material": (
            <DataTable
                columns={["Sr No.", "Course Material", "Description", "Download"]}
                data={projectDetails.materials.map(material => [
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
                data={projectDetails.submissions.map(submission => [
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
                data={projectDetails.gradeBook.map(grade => [
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
