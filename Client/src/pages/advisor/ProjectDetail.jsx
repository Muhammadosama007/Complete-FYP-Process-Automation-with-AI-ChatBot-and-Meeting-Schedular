import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import DataTable from "../../components/DataTable";
import Meeting from "../../components/Meeting";
import Feedback from "../../components/Feedback";
import AnnouncementModal from "../../components/AnnouncementModal";
import ProgressBoard from "../../components/ProgressBoard";
import MaterialModal from "../../components/AddMaterialModal";
import { FaDownload } from "react-icons/fa";

const ProjectDetail = () => {
  const { id } = useParams();
  const [meetings, setMeetings] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("googleUser"));
  const isAdvisor = user?.role === "advisor";

  // Fetch Announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(`http://localhost:3002/api/announcements?projectId=${id}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid data received");

        const withSrNo = data.map((a, i) => ({ ...a, srNo: i + 1 }));
        setAnnouncements(withSrNo);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    if (id) fetchAnnouncements();
  }, [id]);

  const handleAddAnnouncement = (newAnnouncement) => {
    const updated = [...announcements, { ...newAnnouncement, srNo: announcements.length + 1 }];
    setAnnouncements(updated);
  };

  // Fetch Materials
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch(`http://localhost:3002/api/materials?projectId=${id}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid materials data");

        const withSrNo = data.map((m, i) => ({ ...m, srNo: i + 1 }));
        setMaterials(withSrNo);
      } catch (err) {
        console.error("Error fetching materials:", err);
      }
    };

    if (id) fetchMaterials();
  }, [id]);

  const handleAddMaterial = (newMaterial) => {
    const updated = [...materials, { ...newMaterial, srNo: materials.length + 1 }];
    setMaterials(updated);
  };

  const contentMap = {
    "Announcement": (
      <div className="space-y-4">
        {isAdvisor && (
          <button
            className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Announcement
          </button>
        )}
        <DataTable
          columns={["Sr No.", "Subject", "Date", "Description", "Attachment"]}
          data={announcements.map((a) => [
            a.srNo,
            a.subject,
            a.date,
            a.description,
            a.attachment?.name ? (
              <a href={a.attachment.content} download={a.attachment.name}>
                <FaDownload size={20} />
              </a>
            ) : "No Attachment"
          ])}
          noDataMessage="No Announcements"
        />
        <AnnouncementModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddAnnouncement}
          projectId={id}
        />
      </div>
    ),
    "Material": (
      <div className="space-y-4">
        {isAdvisor && (
          <button
            className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900"
            onClick={() => setIsMaterialModalOpen(true)}
          >
            + Add Material
          </button>
        )}
        <DataTable
          columns={["Sr No.", "Title", "Description", "Download"]}
          data={materials.map((m) => [
            m.srNo,
            m.subject,
            m.description,
            m.attachment?.name ? (
              <a href={m.attachment.content} download={m.attachment.name}>
                <FaDownload size={20} />
              </a>
            ) : "No Attachment"
          ])}
          noDataMessage="No Course Materials"
        />
        <MaterialModal
          isOpen={isMaterialModalOpen}
          onClose={() => setIsMaterialModalOpen(false)}
          onSave={handleAddMaterial}
          projectId={id}
        />
      </div>
    ),
    "Progress": <ProgressBoard />,
    "Submission": (
      <DataTable
        columns={["Sr No.", "Name", "Description", "Start Date", "End Date", "Submission"]}
        data={[{
          srNo: 1,
          name: "AI Model",
          description: "Initial version",
          startDate: "2025-03-01",
          endDate: "2025-04-01",
          submissions: "download"
        }].map((s) => [
          s.srNo,
          s.name,
          s.description,
          s.startDate,
          s.endDate,
          s.submissions
        ])}
        noDataMessage="No Submissions"
      />
    ),
    "Feedback": (
      <Feedback
        senderName={user?.name || "Unknown"}
        projectId={id}
        readOnly={false}
      />
    ),
    "Meeting": <Meeting meetings={meetings} setMeetings={setMeetings} />,
    "Grade Book": (
      <DataTable
        columns={["Sr No.", "Assessment Type", "Best Of", "Obtained Percentage"]}
        data={[{
          srNo: 1,
          assessmentType: "Model Accuracy",
          bestOf: "N/A",
          obtainedPercentage: "85%"
        }].map((g) => [
          g.srNo,
          g.assessmentType,
          g.bestOf,
          g.obtainedPercentage
        ])}
        noDataMessage="No grade data available"
      />
    )
  };

  return (
    <PageLayout
      initialActiveTab="Announcement"
      tabs={["Announcement", "Material", "Progress", "Feedback", "Meeting", "Submission", "Grade Book"]}
      contentMap={contentMap}
    />
  );
};

export default ProjectDetail;
