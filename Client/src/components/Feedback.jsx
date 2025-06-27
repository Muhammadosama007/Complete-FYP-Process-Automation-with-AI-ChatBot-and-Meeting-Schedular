import React, { useState, useEffect } from "react";
import DataTable from "../components/DataTable";

const Feedback = ({ senderName, projectId, readOnly = false }) => {
  const [newFeedback, setNewFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedFeedback, setEditedFeedback] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("googleUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (!projectId) return;

      try {
        const res = await fetch(`http://localhost:3002/api/feedbacks/${projectId}`);
        const data = await res.json();
        setFeedbacks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching feedbacks", err);
      }
    };

    fetchFeedbacks();
  }, [projectId]);

  const handleSendFeedback = async () => {
    if (!newFeedback.trim() || !user || !user._id || !user.name) return;

    const feedbackEntry = {
      senderName: senderName || user.name,
      message: newFeedback,
      userId: user._id, // your backend should map this to `sender`
    };

    try {
      const res = await fetch(`http://localhost:3002/api/feedbacks/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(feedbackEntry)
      });

      if (!res.ok) throw new Error("Failed to send feedback");

      const saved = await res.json();
      setFeedbacks([...feedbacks, saved]);
      setNewFeedback("");
    } catch (err) {
      console.error("Error sending feedback", err);
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (!user || !user._id) return;

    try {
      const res = await fetch(`http://localhost:3002/api/feedbacks/${id}?userId=${user._id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete feedback");

      setFeedbacks(feedbacks.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Error deleting feedback", err);
    }
  };

  const handleEditFeedback = (id, message) => {
    setEditingId(id);
    setEditedFeedback(message);
  };

  const handleSaveEdit = async (id) => {
    if (!user || !user._id) return;

    try {
      const res = await fetch(`http://localhost:3002/api/feedbacks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: editedFeedback,
          userId: user._id,
        })
      });

      if (!res.ok) throw new Error("Failed to update feedback");

      const updated = await res.json();
      const updatedList = feedbacks.map((f) => (f._id === id ? updated : f));
      setFeedbacks(updatedList);
      setEditingId(null);
      setEditedFeedback("");
    } catch (err) {
      console.error("Error editing feedback", err);
    }
  };

  return (
    <div className="space-y-4">
      <DataTable
        columns={["Date", "Sender", "Message", "Actions"]}
        data={(Array.isArray(feedbacks) ? feedbacks : []).map((f) => {
          const isOwner = f.sender === user?._id;

          return [
            <div className="w-42">{new Date(f.createdAt).toLocaleString()}</div>,
            <div className="w-32">{f.senderName}</div>,
            editingId === f._id ? (
              <input
                type="text"
                value={editedFeedback}
                onChange={(e) => setEditedFeedback(e.target.value)}
                className="border p-1 w-full"
                disabled={readOnly}
              />
            ) : (
              <div className="min-w-[300px] max-w-[600px] whitespace-pre-wrap">
                {f.message}
              </div>
            ),
            readOnly ? (
              "-"
            ) : isOwner ? (
              <div className="flex space-x-2">
                {editingId === f._id ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleSaveEdit(f._id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="text-blue-950 hover:underline"
                    onClick={() => handleEditFeedback(f._id, f.message)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDeleteFeedback(f._id)}
                >
                  Delete
                </button>
              </div>
            ) : (
              "-"
            )
          ];
        })}
        noDataMessage="No feedback yet"
      />

      {!readOnly && (
        <div className="mt-6 border-t pt-4">
          <h3 className="font-medium mb-2">Send New Feedback</h3>
          <textarea
            className="w-full p-2 border rounded"
            rows="3"
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            placeholder="Type your feedback/message..."
          />
          <button
            className="mt-2 bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900"
            onClick={handleSendFeedback}
          >
            Send Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default Feedback;
