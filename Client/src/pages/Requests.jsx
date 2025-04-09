import React, { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import RequestList from "../components/RequestList";
import AddMeetingModal from "../components/AddMeetingModal";

const Requests = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    setAllRequests(storedRequests.length ? storedRequests : dummyRequests);

    const storedMeetings = JSON.parse(localStorage.getItem("meetings")) || [];
    setMeetings(storedMeetings);
  }, []);

  const handleDeleteMeeting = (id) => {
    const updated = meetings.filter((m) => m.id !== id);
    setMeetings(updated);
    localStorage.setItem("meetings", JSON.stringify(updated));
  };

  const handleEditMeeting = (meeting) => {
    setEditingMeeting(meeting);
    setShowMeetingModal(true);
  };

  const handleMeetingChange = (e) => {
    const { name, value } = e.target;
    setEditingMeeting((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveMeeting = () => {
    if (!editingMeeting.date || !editingMeeting.time || !editingMeeting.agenda) {
      return alert("Please fill in all meeting details.");
    }

    let updatedMeetings;
    if (editingMeeting.id) {
      updatedMeetings = meetings.map((m) =>
        m.id === editingMeeting.id ? editingMeeting : m
      );
    } else {
      updatedMeetings = [
        ...meetings,
        { ...editingMeeting, id: Date.now(), student: editingMeeting.student },
      ];
    }

    setMeetings(updatedMeetings);
    localStorage.setItem("meetings", JSON.stringify(updatedMeetings));
    setShowMeetingModal(false);
    setEditingMeeting(null);
  };

  const tabs = ["Pending Requests", "Approved Requests", "Rejected Requests", "Meetings"];

  const contentMap = {
    "Pending Requests": (
      <RequestList
        requests={allRequests.filter((r) => r.status === "Pending")}
        updateRequests={setAllRequests}
        openMeetingModal={(student) =>
          setEditingMeeting({ student, date: "", time: "", agenda: "", meetingType: "In-Person", roomNumber: "" }) ||
          setShowMeetingModal(true)
        }
      />
    ),
    "Approved Requests": (
      <RequestList
        requests={allRequests.filter((r) => r.status === "Approved")}
        updateRequests={setAllRequests}
        openMeetingModal={(student) =>
          setEditingMeeting({ student, date: "", time: "", agenda: "", meetingType: "In-Person", roomNumber: "" }) ||
          setShowMeetingModal(true)
        }
      />
    ),
    "Rejected Requests": (
      <RequestList
        requests={allRequests.filter((r) => r.status === "Rejected")}
        updateRequests={setAllRequests}
        openMeetingModal={(student) =>
          setEditingMeeting({ student, date: "", time: "", agenda: "", meetingType: "In-Person", roomNumber: "" }) ||
          setShowMeetingModal(true)
        }
      />
    ),
    "Meetings": (
      <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#1F3F6A] text-white">
              {["Student", "Date", "Time", "Agenda", "Location/Link", "Type", "Actions"].map((col, i) => (
                <th key={i} className="border px-4 py-2 text-left">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, i) => (
              <tr key={meeting.id || i} className="bg-gray-50">
                <td className="border px-4 py-2">{meeting.student?.name}</td>
                <td className="border px-4 py-2">{meeting.date}</td>
                <td className="border px-4 py-2">{meeting.time}</td>
                <td className="border px-4 py-2">{meeting.agenda}</td>
                <td className="border px-4 py-2">
                  {meeting.meetingType === "Online"
                    ? "Online Link (coming soon)"
                    : meeting.roomNumber}
                </td>
                <td className="border px-4 py-2">{meeting.meetingType}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEditMeeting(meeting)}
                    className="text-yellow-600 hover:underline"
                  > 
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMeeting(meeting.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  };

  return (
    <>
      <PageLayout
        initialActiveTab="Pending Requests"
        tabs={tabs}
        contentMap={contentMap}
        bgColor="#1F3F6A"
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

const dummyRequests = [
  {
    id: 1,
    name: "Ali Raza",
    title: "AI for Agriculture",
    attachment: "proposal.pdf",
    status: "Pending",
  },
  {
    id: 2,
    name: "Sara Khan",
    title: "Smart Traffic System",
    attachment: "design.docx",
    status: "Pending",
  },
  {
    id: 3,
    name: "Usman Tariq",
    title: "Chatbot for University",
    attachment: "abstract.pdf",
    status: "Pending",
  },
];

export default Requests;
