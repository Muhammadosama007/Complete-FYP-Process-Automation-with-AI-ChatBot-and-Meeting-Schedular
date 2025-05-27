import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import DataTable from "../../components/DataTable";
import Feedback from "../../components/Feedback";
import ProgressBoard from "../../components/ProgressBoard";
import { useParams } from "react-router-dom";
import { saveAs } from 'file-saver';
import { FaDownload } from 'react-icons/fa';

const IdeaSelection = () => {
    const { id } = useParams();

    const [uploadedFiles, setUploadedFiles] = useState({});
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);

    const projectDetails = {
        id,
        title: "AI Chatbot",
        students: "Ali, Ayesha",
        announcements: [
            { srNo: 1, subject: "Chatbot Update", date: "2025-04-01", description: "AI model improvements", attachment: "/Client/public/files/l1f21bsse0375-SQE-Assignment1.pdf" }
        ],
        submissions: [
            { srNo: 1, name: "AI Model", description: "Initial version", startDate: "2025-03-01", endDate: "2025-04-01", upload: "link" }
        ],
        gradeBook: [
            { srNo: 1, assessmentType: "Model Accuracy", bestOf: "N/A", obtainedPercentage: "85%" }
        ]
    };

    const handleDownload = (fileUrl, fileName) => {
        saveAs(fileUrl, fileName);
    };

    const handleFileChange = (event, submissionId) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedSubmissionId(submissionId);
            setConfirmationModalOpen(true);
        }
    };

    const handleConfirmSubmission = () => {
        setUploadedFiles((prev) => ({
            ...prev,
            [selectedSubmissionId]: true,
        }));
        setConfirmationModalOpen(false);
    };

    const handleCancelSubmission = () => {
        setConfirmationModalOpen(false);
    };

    const materials = [
        { id: 1, title: "AI Chatbot Development", description: "A comprehensive guide to building AI chatbots using NLP techniques.", downloadLink: "/Client/public/files/l1f21bsse0375-SQE-Assignment1.pdf" },
        { id: 2, title: "E-Commerce Website Design", description: "Learn to design and implement e-commerce websites with payment gateways.", downloadLink: "/Client/public/files/l1f21bsse0375-SQE-Assignment1.pdf" },
        { id: 3, title: "Smart Attendance System", description: "Develop a smart attendance system using facial recognition and AI.", downloadLink: "/Client/public/files/l1f21bsse0375-SQE-Assignment1.pdf" }
    ];

    const contentMap = {
        "Anouncement": (
            <DataTable
                columns={["Sr No.", "Subject", "Date", "Description", "Attachment"]}
                data={projectDetails.announcements.map(announcement => [
                    announcement.srNo,
                    announcement.subject,
                    announcement.date,
                    announcement.description,
                    <button
                        key={announcement.id}
                        onClick={() => handleDownload(announcement.attachment, announcement.title + ".pdf")}
                        className="px-3 py-1 ml-6 rounded bg-[#1F3F6A] hover:bg-[#1F3F6A] text-white"
                    >
                        <FaDownload size={20} color="white" />
                    </button>
                ])}
                noDataMessage="No Announcements"
            />
        ),
        "Material": (
            <DataTable
                columns={["Sr No.", "Course Material", "Description", "Download"]}
                data={materials.map((material) => [
                    material.id,
                    material.title,
                    material.description,
                    <button
                        key={material.id}
                        onClick={() => handleDownload(material.downloadLink, material.title + ".pdf")}
                        className="px-3 py-1 ml-6 rounded bg-[#1F3F6A] hover:bg-[#1F3F6A] text-white"
                    >
                        <FaDownload size={20} color="white" />
                    </button>
                ])}
                noDataMessage="No Course Material"
            />
        ),
        "Progress": (
            <ProgressBoard />
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
                    uploadedFiles[submission.srNo] ? (
                        <span>Submitted</span>
                    ) : (
                        <div>
                            <button
                                onClick={() => document.getElementById(`file-upload-${submission.srNo}`).click()}
                                className="px-3 py-1 rounded bg-[#1F3F6A] hover:bg-[#1F3F6A] text-white"
                            >
                                Upload
                            </button>
                            <input
                                id={`file-upload-${submission.srNo}`}
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => handleFileChange(e, submission.srNo)}
                            />
                        </div>
                    )
                ])}
                noDataMessage="No Submissions"
            />
        ),
        "Feedback": (
            <Feedback sender="Advisor" feedbackKey="ideaFeedbacks" />
        ),
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
        <div>
            <PageLayout
                initialActiveTab="Anouncement"
                tabs={["Anouncement", "Material", "Progress", "Submission", "Feedback", "Grade Book"]}
                contentMap={contentMap}
            />

            {/* Modal for confirmation */}
            {confirmationModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h3 className="text-lg font-semibold">Confirm Submission</h3>
                        <p className="mt-2">Are you sure you want to submit this file?</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={handleCancelSubmission}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmSubmission}
                                className="px-4 py-2  bg-[#1F3F6A] text-white rounded hover:bg-blue-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IdeaSelection;
