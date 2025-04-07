import React, { useState, useEffect } from "react";

const RequestList = ({ requests: initialRequests = [] }) => {
  const [requests, setRequests] = useState(() => {
    const stored = localStorage.getItem("requests");
    return stored ? JSON.parse(stored) : initialRequests;
  });

  const [showFeedbackInput, setShowFeedbackInput] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [meetingDetails, setMeetingDetails] = useState({
    date: "",
    time: "",
    location: "",
  });

  const handleDecision = (id, decision) => {
    if (!feedbackText.trim()) return alert("Feedback is required!");

    const updatedRequests = requests.map(req =>
      req.id === id
        ? { ...req, status: decision, feedback: feedbackText }
        : req
    );
    setRequests(updatedRequests);
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
    setShowFeedbackInput(null);
    setFeedbackText("");
  };

  const handleOpenMeetingModal = (student) => {
    setSelectedStudent(student);
    setShowMeetingModal(true);
  };

  const handleSaveMeeting = () => {
    const { date, time, location } = meetingDetails;
    if (!date || !time || !location) {
      return alert("Please fill in all meeting details.");
    }

    const meetingData = JSON.parse(localStorage.getItem("meetings")) || [];
    meetingData.push({ ...meetingDetails, student: selectedStudent });
    localStorage.setItem("meetings", JSON.stringify(meetingData));

    alert(`Meeting arranged with ${selectedStudent.name}`);
    setShowMeetingModal(false);
    setMeetingDetails({ date: "", time: "", location: "" });
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[#1F3F6A] text-white">
            {["Student Name", "Project Title", "Attachment", "Status", "Feedback", "Actions"].map((col, i) => (
              <th key={i} className="border px-4 py-2 text-left">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="bg-gray-50">
              <td className="border px-4 py-2">{req.name}</td>
              <td className="border px-4 py-2">{req.title}</td>
              <td className="border px-4 py-2 text-blue-600 underline cursor-pointer">{req.attachment}</td>
              <td className="border px-4 py-2">{req.status}</td>
              <td className="border px-4 py-2">{req.feedback || "-"}</td>
              <td className="border px-4 py-2 space-x-2">
                {req.status === "Pending" ? (
                  <>
                    <button
                      onClick={() => setShowFeedbackInput(req.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => setShowFeedbackInput(req.id * -1)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                ) : null}
                <button
                  onClick={() => handleOpenMeetingModal(req)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Arrange Meeting
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Feedback Popup */}
      {showFeedbackInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow-md w-[400px]">
            <h2 className="text-lg font-semibold mb-2">Provide Feedback</h2>
            <textarea
              rows="4"
              className="w-full border p-2 rounded"
              placeholder="Write your feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => {
                  setShowFeedbackInput(null);
                  setFeedbackText("");
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() =>
                  handleDecision(
                    Math.abs(showFeedbackInput),
                    showFeedbackInput > 0 ? "Approved" : "Rejected"
                  )
                }
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Arrange Meeting Modal */}
      {showMeetingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow-md w-[400px]">
            <h2 className="text-lg font-semibold mb-4">
              Arrange Meeting with {selectedStudent?.name}
            </h2>
            <input
              type="date"
              className="w-full border p-2 rounded mb-2"
              value={meetingDetails.date}
              onChange={(e) =>
                setMeetingDetails({ ...meetingDetails, date: e.target.value })
              }
            />
            <input
              type="time"
              className="w-full border p-2 rounded mb-2"
              value={meetingDetails.time}
              onChange={(e) =>
                setMeetingDetails({ ...meetingDetails, time: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full border p-2 rounded mb-2"
              value={meetingDetails.location}
              onChange={(e) =>
                setMeetingDetails({
                  ...meetingDetails,
                  location: e.target.value,
                })
              }
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowMeetingModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleSaveMeeting}
              >
                Save Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestList;
