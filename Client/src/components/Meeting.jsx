import React, { useState, useEffect } from "react";
import AddMeetingModal from "./AddMeetingModal";

const Meeting = ({ readOnly = false }) => {
  const [meetings, setMeetings] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedMeetings = localStorage.getItem("meetings");
      return storedMeetings ? JSON.parse(storedMeetings) : [];
    }
    return [];
  });

  const [showModal, setShowModal] = useState(false);
  const [meetingData, setMeetingData] = useState({
    id: null,
    date: "",
    time: "",
    agenda: "",
    meetingType: "In-Person",
    location: "",
    roomNumber: "",
    status: "Scheduled",
  });

  useEffect(() => {
    localStorage.setItem("meetings", JSON.stringify(meetings));
  }, [meetings]);

  const handleChange = (e) => {
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (meetingData.id) {
      setMeetings((prev) =>
        prev.map((m) => (m.id === meetingData.id ? meetingData : m))
      );
    } else {
      setMeetings((prev) => [
        ...prev,
        { ...meetingData, id: Date.now() },
      ]);
    }

    setShowModal(false);
    resetMeetingData();
  };

  const resetMeetingData = () => {
    setMeetingData({
      id: null,
      date: "",
      time: "",
      agenda: "",
      meetingType: "In-Person",
      location: "",
      roomNumber: "",
      status: "Scheduled",
    });
  };

  const handleEdit = (meeting) => {
    setMeetingData(meeting);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const updatedMeetings = meetings.filter((m) => m.id !== id);
    setMeetings(updatedMeetings);
  };

  return (
    <div className="space-y-4">
      {!readOnly && (
        <button
          className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
          onClick={() => setShowModal(true)}
        >
          Add Meeting
        </button>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-blue-950 text-white">
              <th className="p-3 border border-gray-300">Date</th>
              <th className="p-3 border border-gray-300">Time</th>
              <th className="p-3 border border-gray-300">Agenda</th>
              <th className="p-3 border border-gray-300">Meeting Type</th>
              <th className="p-3 border border-gray-300">Location / Online Link</th>
              {!readOnly && (
                <th className="p-3 border border-gray-300">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {meetings.length > 0 ? (
              meetings.map((meeting) => (
                <tr key={meeting.id} className="border border-gray-300 hover:bg-gray-100 transition">
                  <td className="p-3 border border-gray-300">{meeting.date}</td>
                  <td className="p-3 border border-gray-300">{meeting.time}</td>
                  <td className="p-3 border border-gray-300">{meeting.agenda}</td>
                  <td className="p-3 border border-gray-300">{meeting.meetingType}</td>
                  <td className="p-3 border border-gray-300">
                    {meeting.meetingType === "Online"
                      ? "Zoom/Meet Link (Coming Soon)"
                      : `Room ${meeting.roomNumber}`}
                  </td>
                  {!readOnly && (
                    <td className="p-3 flex space-x-3">
                      <button className="text-blue-950 hover:underline" onClick={() => handleEdit(meeting)}>Edit</button>
                      <button className="text-red-600 hover:underline" onClick={() => handleDelete(meeting.id)}>Delete</button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={readOnly ? 5 : 6} className="text-center p-4 text-gray-500">
                  No meetings scheduled
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {!readOnly && showModal && (
        <AddMeetingModal
          meetingData={meetingData}
          handleChange={handleChange}
          handleSave={handleSave}
          onClose={() => {
            setShowModal(false);
            resetMeetingData();
          }}
        />
      )}
    </div>
  );
};

export default Meeting;
