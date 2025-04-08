import React, { useState, useEffect } from "react";

const RequestList = ({ requests = [], updateRequests, openMeetingModal }) => {
  // remove: showMeetingModal, meetingDetails, selectedStudent, handleOpenMeetingModal, etc.

  const [showFeedbackInput, setShowFeedbackInput] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const handleDecision = (id, decision) => {
    if (!feedbackText.trim()) return alert("Feedback is required!");

    const updatedRequests = requests.map(req =>
      req.id === id
        ? { ...req, status: decision, feedback: feedbackText }
        : req
    );
    updateRequests(updatedRequests);
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
    setShowFeedbackInput(null);
    setFeedbackText("");
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
                {req.status === "Pending" && (
                  <>
                    <button
                      onClick={() => setShowFeedbackInput(req.id)}
                      className="text-green-600 hover:underline"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => setShowFeedbackInput(req.id * -1)}
                      className="text-red-600 hover:underline"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => openMeetingModal(req)}
                  className="text-blue-950 hover:underline"
                >
                  Arrange Meeting
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Feedback Modal */}
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
    </div>
  );
};

export default RequestList;
