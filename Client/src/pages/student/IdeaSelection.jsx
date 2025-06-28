import React, { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import DataTable from "../../components/DataTable";
import Feedback from "../../components/Feedback";
import ProgressBoard from "../../components/ProgressBoard";
import GradeBook from "../../components/GradeBook";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa";

const IdeaSelection = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("googleUser"));

  const [projectId, setProjectId] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [studentFiles, setStudentFiles] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);

  const handleDownload = (fileUrl, fileName) => {
    saveAs(fileUrl, fileName);
  };

  const handleFileChange = (event, submissionId) => {
    const file = event.target.files[0];
    if (file) {
      setStudentFiles((prev) => ({ ...prev, [submissionId]: file }));
      setSelectedSubmissionId(submissionId);
      setConfirmationModalOpen(true);
    }
  };

  const handleConfirmSubmission = async () => {
    try {
      const file = studentFiles[selectedSubmissionId];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("uploadedBy", user?.name || "Unknown");

      await fetch(`http://localhost:3002/api/submissions/${selectedSubmissionId}/upload`, {
        method: "POST",
        body: formData,
      });

      setUploadedFiles((prev) => ({ ...prev, [selectedSubmissionId]: true }));
      setStudentFiles((prev) => ({ ...prev, [selectedSubmissionId]: null }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setConfirmationModalOpen(false);
  };

  const handleCancelSubmission = () => {
    setConfirmationModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = user?._id;
        if (!userId) return;

        const projectRes = await fetch("http://localhost:3002/api/projects/student/project-id", {
          headers: { "x-user-id": userId },
          credentials: "include",
        });

        const projectData = await projectRes.json();
        const projectId = projectData?.projectId;
        if (!projectId) return;
        setProjectId(projectId);

        const [announcementsRes, materialsRes, submissionsRes, meetingsRes] = await Promise.all([
          fetch(`http://localhost:3002/api/announcements?projectId=${projectId}`),
          fetch(`http://localhost:3002/api/materials?projectId=${projectId}`),
          fetch(`http://localhost:3002/api/submissions?projectId=${projectId}`),
          fetch(`http://localhost:3002/api/meetings?projectId=${projectId}`),
        ]);

        const [announcementsData, materialsData, submissionsData, meetingsData] = await Promise.all([
          announcementsRes.json(),
          materialsRes.json(),
          submissionsRes.json(),
          meetingsRes.json(),
        ]);

        setAnnouncements(announcementsData.map((a, i) => ({ ...a, srNo: i + 1 })));
        setMaterials(materialsData.map((m, i) => ({ ...m, srNo: i + 1 })));
        setSubmissions(submissionsData);
        setMeetings(meetingsData);
      } catch (err) {
        console.error("Error fetching project data:", err);
      }
    };

    fetchData();
  }, [user]);

  const contentMap = {
    "Announcement": (
      <DataTable
        columns={["Sr No.", "Subject", "Date", "Description", "Attachment"]}
        data={announcements.map((a) => [
          a.srNo,
          a.subject,
          a.date,
          a.description,
          a.attachment?.name ? (
            <button
              key={a._id}
              onClick={() => handleDownload(a.attachment.content, a.attachment.name)}
              className="px-3 py-1 ml-6 rounded bg-[#1F3F6A] hover:bg-[#1F3F6A] text-white"
            >
              <FaDownload size={20} />
            </button>
          ) : "No Attachment",
        ])}
        noDataMessage="No Announcements"
      />
    ),
    "Material": (
      <DataTable
        columns={["Sr No.", "Title", "Description", "Download"]}
        data={materials.map((m) => [
          m.srNo,
          m.subject,
          m.description,
          m.attachment?.name ? (
            <button
              key={m._id}
              onClick={() => handleDownload(m.attachment.content, m.attachment.name)}
              className="px-3 py-1 ml-6 rounded bg-[#1F3F6A] hover:bg-[#1F3F6A] text-white"
            >
              <FaDownload size={20} />
            </button>
          ) : "No Attachment",
        ])}
        noDataMessage="No Course Material"
      />
    ),
    "Progress": <ProgressBoard />,
    "Submission": (
      <DataTable
        columns={["Sr No.", "End Date", "End Time", "Upload"]}
        data={submissions.map((s, i) => [
          i + 1,
          s.endDate,
          s.endTime,
          uploadedFiles[s._id] || s.studentFile ? (
            <span className="text-green-600">Submitted</span>
          ) : (
            <div>
              <button
                onClick={() => document.getElementById(`file-upload-${s._id}`).click()}
                className="px-3 py-1 rounded bg-[#1F3F6A] hover:bg-[#1F3F6A] text-white"
              >
                Upload
              </button>
              <input
                id={`file-upload-${s._id}`}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, s._id)}
              />
            </div>
          ),
        ])}
        noDataMessage="No Submissions"
      />
    ),
    "Feedback": projectId ? (
      <Feedback senderName={user?.name || "Unknown"} projectId={projectId} readOnly={false} />
    ) : (
      <div>Loading feedback...</div>
    ),
    "Meeting": (
      <div className="space-y-4">
        <div className="overflow-x-auto bg-white rounded shadow p-4">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#1F3F6A] text-white">
                {["Date", "Time", "Agenda", "Location/Link", "Type"].map((h) => (
                  <th key={h} className="border px-4 py-2 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {meetings.length > 0 ? (
                meetings.map((m, i) => (
                  <tr key={m._id || i} className="bg-gray-50">
                    <td className="border px-4 py-2">{m.date}</td>
                    <td className="border px-4 py-2">{m.time}</td>
                    <td className="border px-4 py-2">{m.agenda}</td>
                  <td className="border px-4 py-2">
  {m.meetingType === "Online" ? (
    m.onlineLink ? (
      <a
        href={m.onlineLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 underline hover:text-blue-900"
      >
        Join Meeting
      </a>
    ) : (
      "Link not provided"
    )
  ) : (
    m.roomNumber || "Room not specified"
  )}
</td>

                    <td className="border px-4 py-2">{m.meetingType}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No meetings scheduled
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    ),
    "Grade Book": <GradeBook projectId={projectId || id} user={user} />,
  };

  return (
    <div>
      <PageLayout
        initialActiveTab="Announcement"
        tabs={["Announcement", "Material", "Progress", "Feedback", "Meeting", "Submission", "Grade Book"]}
        contentMap={contentMap}
      />

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
                className="px-4 py-2 bg-[#1F3F6A] text-white rounded hover:bg-blue-600"
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
