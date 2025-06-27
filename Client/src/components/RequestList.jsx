import React, { useState } from "react";
import axios from "axios";

const RequestList = ({ requests = [], updateRequests, openMeetingModal }) => {
  const [showFeedbackInput, setShowFeedbackInput] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Prevent double submission

  const token = localStorage.getItem("token");

  const handleDecision = async (id, decision) => {
    if (!feedbackText.trim()) return alert("Feedback is required!");
    if (isSubmitting) return; // ✅ Prevent multiple calls

    setIsSubmitting(true); // ✅ Lock
    try {
      await axios.put(
        `http://localhost:3002/api/requests/${id}/decision`,
        {
          status: decision,
          feedback: feedbackText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowFeedbackInput(null);
      setFeedbackText("");
      updateRequests();
      alert(`Request ${decision.toLowerCase()} successfully!`);
    } catch (err) {
      alert("Failed to update request");
    } finally {
      setIsSubmitting(false); // ✅ Unlock after complete
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[#1F3F6A] text-white">
            {["Student Name", "Project Title", "Attachment", "Status", "Feedback", "Actions"].map(
              (col, i) => (
                <th key={i} className="border px-4 py-2 text-left">
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id} className="bg-gray-50">
              <td className="border px-4 py-2">{req.student?.name || "N/A"}</td>
              <td className="border px-4 py-2">{req.projectId?.title || "N/A"}</td>
              <td className="border px-4 py-2 text-blue-600 underline cursor-pointer">
                <a
                  href={`http://localhost:3002/api/requests/file/${req._id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {req.file?.fileName || "N/A"}
                </a>
              </td>
              <td className="border px-4 py-2">{req.status}</td>
              <td className="border px-4 py-2">{req.feedback || "-"}</td>
              <td className="border px-4 py-2 space-x-2">
                {req.status === "Pending" && (
                  <>
                    <button
                      onClick={() =>
                        setShowFeedbackInput({ id: req._id, decision: "Approved" })
                      }
                      className="text-green-600 hover:underline"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        setShowFeedbackInput({ id: req._id, decision: "Rejected" })
                      }
                      className="text-red-600 hover:underline"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => openMeetingModal(req._id)}
                  className="text-blue-950 hover:underline"
                >
                  Arrange Meeting
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 text-white rounded ${
                  isSubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={() =>
                  handleDecision(showFeedbackInput.id, showFeedbackInput.decision)
                }
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestList;
