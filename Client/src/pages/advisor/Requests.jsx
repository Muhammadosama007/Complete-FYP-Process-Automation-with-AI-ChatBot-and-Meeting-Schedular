import React, { useEffect, useState } from "react";
import axios from "axios";
import PageLayout from "../../components/PageLayout";
import RequestList from "../../components/RequestList";
import AddMeetingModal from "../../components/AddMeetingModal";

const Requests = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);

  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get("http://localhost:3002/api/requests/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllRequests(data.requests);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };

  const fetchMeetings = async () => {
    try {
      const { data } = await axios.get("http://localhost:3002/api/meetings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMeetings(data);
    } catch (err) {
      console.error("Failed to fetch meetings", err);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchMeetings();
  }, []);

  const handleDeleteMeeting = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/meetings/${id}`);
      fetchMeetings();
    } catch (err) {
      console.error("Failed to delete meeting", err);
    }
  };

  const handleEditMeeting = (meeting) => {
    setEditingMeeting({
      ...meeting,
      roomNumber: meeting.roomNumber || "",
      onlineLink: meeting.onlineLink || "",
    });
    setShowMeetingModal(true);
  };

  const handleMeetingChange = (e) => {
    const { name, value } = e.target;
    setEditingMeeting((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveMeeting = async () => {
    const { date, time, agenda, meetingType, roomNumber, onlineLink, requestId } = editingMeeting;

    if (!date || !time || !agenda) return alert("Please fill in all meeting details.");
    if (!editingMeeting._id && !requestId) return alert("Request ID is missing for new meeting.");

    const payload = {
      requestId,
      date,
      time,
      agenda,
      meetingType,
      roomNumber: meetingType === "In-Person" ? roomNumber : "",
      onlineLink: meetingType === "Online" ? onlineLink : "",
    };

    try {
      if (editingMeeting._id) {
        await axios.put(`http://localhost:3002/api/meetings/${editingMeeting._id}`, payload);
      } else {
        await axios.post(`http://localhost:3002/api/meetings`, payload);
      }
      fetchMeetings();
      setShowMeetingModal(false);
      setEditingMeeting(null);
    } catch (err) {
      console.error("Failed to save meeting", err);
    }
  };

  const createMeetingHandler = (requestId) => {
    setEditingMeeting({
      requestId,
      date: "",
      time: "",
      agenda: "",
      meetingType: "In-Person",
      roomNumber: "",
      onlineLink: "",
    });
    setShowMeetingModal(true);
  };

  const tabs = ["Pending Requests", "Approved Requests", "Rejected Requests", "Meetings"];

  const contentMap = {
    "Pending Requests": (
      <RequestList
        requests={allRequests.filter((r) => r.status === "Pending")}
        updateRequests={fetchRequests}
        openMeetingModal={createMeetingHandler}
      />
    ),
    "Approved Requests": (
      <RequestList
        requests={allRequests.filter((r) => r.status?.toLowerCase() === "approved")}
        updateRequests={fetchRequests}
        openMeetingModal={createMeetingHandler}
      />
    ),
    "Rejected Requests": (
      <RequestList
        requests={allRequests.filter((r) => r.status?.toLowerCase() === "rejected")}
        updateRequests={fetchRequests}
        openMeetingModal={createMeetingHandler}
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
              <tr key={meeting._id || i} className="bg-gray-50">
                <td className="border px-4 py-2">{meeting.student?.name}</td>
                <td className="border px-4 py-2">{meeting.date}</td>
                <td className="border px-4 py-2">{meeting.time}</td>
                <td className="border px-4 py-2">{meeting.agenda}</td>
                <td className="border px-4 py-2">
                  {meeting.meetingType === "Online" ? (
                    meeting.onlineLink ? (
                      <a
                        href={meeting.onlineLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Link
                      </a>
                    ) : (
                      "No Link Provided"
                    )
                  ) : (
                    meeting.roomNumber || "No Room Assigned"
                  )}
                </td>
                <td className="border px-4 py-2">{meeting.meetingType}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button onClick={() => handleEditMeeting(meeting)} className="text-yellow-600 hover:underline">Edit</button>
                  <button onClick={() => handleDeleteMeeting(meeting._id)} className="text-red-600 hover:underline">Delete</button>
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

export default Requests;
