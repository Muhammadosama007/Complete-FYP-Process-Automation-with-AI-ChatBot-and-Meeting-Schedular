import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import DataTable from "../../components/DataTable";
import Feedback from "../../components/Feedback";
import AnnouncementModal from "../../components/AnnouncementModal";
import ProgressBoard from "../../components/ProgressBoard";
import MaterialModal from "../../components/AddMaterialModal";
import Submission from "../../components/Submission";
import GradeBook from "../../components/GradeBook";
import AddMeetingModal from "../../components/AddMeetingModal"; // ✅ Add this
import { FaDownload } from "react-icons/fa";

const ProjectDetail = () => {
  const { id } = useParams();
  const [meetings, setMeetings] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [showMeetingModal, setShowMeetingModal] = useState(false);

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

  // ✅ Fetch meetings
  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3002/api/meetings?projectId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMeetings(data);
    } catch (err) {
      console.error("Failed to fetch meetings", err);
    }
  };

  useEffect(() => {
    if (id) fetchMeetings();
  }, [id]);

  // ✅ Meeting handlers
  const handleEditMeeting = (meeting) => {
    setEditingMeeting(meeting);
    setShowMeetingModal(true);
  };

  const handleDeleteMeeting = async (meetingId) => {
    try {
      await fetch(`http://localhost:3002/api/meetings/${meetingId}`, { method: "DELETE" });
      fetchMeetings();
    } catch (err) {
      console.error("Failed to delete meeting", err);
    }
  };

  const handleMeetingChange = (e) => {
    const { name, value } = e.target;
    setEditingMeeting((prev) => ({ ...prev, [name]: value }));
  };

 const handleSaveMeeting = async () => {
  const token = localStorage.getItem("token");
  const { date, time, agenda, meetingType, roomNumber, onlineLink } = editingMeeting;

  if (!date || !time || !agenda) return alert("Please fill in all meeting details.");

  try {
    if (editingMeeting._id) {
      await fetch(`http://localhost:3002/api/meetings/${editingMeeting._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingMeeting), // already contains onlineLink if present
      });
    } else {
      await fetch(`http://localhost:3002/api/meetings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          requestId: editingMeeting.requestId || null,
          date,
          time,
          agenda,
          meetingType,
          roomNumber,
          onlineLink, // ✅ INCLUDE THIS FIELD
          projectId: id,
        }),
      });
    }

    fetchMeetings();
    setShowMeetingModal(false);
    setEditingMeeting(null);
  } catch (err) {
    console.error("Failed to save meeting", err);
  }
};


  const createMeetingHandler = () => {
    setEditingMeeting({
      date: "",
      time: "",
      agenda: "",
      meetingType: "In-Person",
      roomNumber: "",
    });
    setShowMeetingModal(true);
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
    "Submission": <Submission projectId={id} user={user} />,
    "Feedback": <Feedback senderName={user?.name || "Unknown"} projectId={id} readOnly={false} />,
    "Meeting": (
      <div className="space-y-4">
        {isAdvisor && (
          <button
            className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900"
            onClick={createMeetingHandler}
          >
            + Schedule Meeting
          </button>
        )}
        <div className="overflow-x-auto bg-white rounded shadow p-4">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#1F3F6A] text-white">
                {["Date", "Time", "Agenda", "Location/Link", "Type", "Actions"].map((h) => (
                  <th key={h} className="border px-4 py-2 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {meetings.map((m, i) => (
                <tr key={m._id || i} className="bg-gray-50">
                  <td className="border px-4 py-2">{m.date}</td>
                  <td className="border px-4 py-2">{m.time}</td>
                  <td className="border px-4 py-2">{m.agenda}</td>
                 <td className="border px-4 py-2">
  {m.meetingType === "Online"
    ? (m.onlineLink ? (
        <a href={m.onlineLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          Join Meeting
        </a>
      ) : "Online Link (TBD)")
    : m.roomNumber}
</td>

                  <td className="border px-4 py-2">{m.meetingType}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button onClick={() => handleEditMeeting(m)} className="text-yellow-600 hover:underline">Edit</button>
                    <button onClick={() => handleDeleteMeeting(m._id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    "Grade Book": <GradeBook projectId={id} user={user} />
  };

  return (
    <>
      <PageLayout
        initialActiveTab="Announcement"
        tabs={["Announcement", "Material", "Progress", "Feedback", "Meeting", "Submission", "Grade Book"]}
        contentMap={contentMap}
      />
      {showMeetingModal && (
        <AddMeetingModal
          meetingData={editingMeeting}
          handleChange={handleMeetingChange}
          handleSave={handleSaveMeeting}
          onClose={() => {
            setShowMeetingModal(false);
            setEditingMeeting(null);
          }}
        />
      )}
    </>
  );
};

export default ProjectDetail;
