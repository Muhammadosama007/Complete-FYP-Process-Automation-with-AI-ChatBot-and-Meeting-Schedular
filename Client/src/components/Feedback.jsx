import React, { useState, useEffect } from "react";
import DataTable from "../components/DataTable";

const Feedback = ({ sender }) => {
    const [newFeedback, setNewFeedback] = useState("");
    const [feedbacks, setFeedbacks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedFeedback, setEditedFeedback] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
    const [replyText, setReplyText] = useState("");

    useEffect(() => {
        const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
        setFeedbacks(storedFeedbacks);
    }, []);

    const updateLocalStorage = (updatedFeedbacks) => {
        setFeedbacks(updatedFeedbacks);
        localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));
    };

    const handleSendFeedback = () => {
        if (!newFeedback.trim()) return;
        const updatedFeedbacks = [
            ...feedbacks,
            {
                id: Date.now(),
                date: new Date().toLocaleString(),
                sender,
                message: newFeedback,
                reply: ""
            }
        ];
        updateLocalStorage(updatedFeedbacks);
        setNewFeedback("");
    };

    const handleDeleteFeedback = (id) => {
        const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== id);
        updateLocalStorage(updatedFeedbacks);
    };

    const handleEditFeedback = (id, message) => {
        setEditingId(id);
        setEditedFeedback(message);
    };

    const handleSaveEdit = (id) => {
        const updatedFeedbacks = feedbacks.map(feedback =>
            feedback.id === id ? { ...feedback, message: editedFeedback } : feedback
        );
        updateLocalStorage(updatedFeedbacks);
        setEditingId(null);
        setEditedFeedback("");
    };

    const openReplyModal = (id) => {
        const feedback = feedbacks.find(fb => fb.id === id);
        setSelectedFeedbackId(id);
        setReplyText(feedback.reply || "");  // Pre-fill the reply if available
        setIsModalOpen(true);
    };

    const handleSaveReply = () => {
        const updatedFeedbacks = feedbacks.map(feedback =>
            feedback.id === selectedFeedbackId ? { ...feedback, reply: replyText } : feedback
        );
        updateLocalStorage(updatedFeedbacks);
        setIsModalOpen(false);  // Close modal after saving reply
        setReplyText(""); // Clear reply field
    };

    return (
        <div className="space-y-4">
            <DataTable
                columns={["Date", "Sender", "Message", "Reply", "Actions"]}
                data={feedbacks.map(feedback => [
                    feedback.date,
                    feedback.sender,
                    editingId === feedback.id ? (
                        <input
                            type="text"
                            value={editedFeedback}
                            onChange={(e) => setEditedFeedback(e.target.value)}
                            className="border p-1 w-full"
                        />
                    ) : (
                        feedback.message
                    ),
                    feedback.reply || "-",
                    <div className="flex space-x-2">
                        {editingId === feedback.id ? (
                            <button
                                className="bg-green-500 text-white px-2 py-1 rounded"
                                onClick={() => handleSaveEdit(feedback.id)}
                            >
                                Save
                            </button>
                        ) : (
                            <button className="text-blue-950 hover:underline" onClick={() => handleEditFeedback(feedback.id, feedback.message)}>Edit</button>
                        )}
                        <button className="text-red-600 hover:underline" onClick={() => handleDeleteFeedback(feedback.id)}>Delete</button>
                        <button
                            className="text-green-600 hover:underline"
                            onClick={() => openReplyModal(feedback.id)}
                        >
                            Reply
                        </button>
                    </div>
                ])}
                noDataMessage="No feedback yet"
            />

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
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleSendFeedback}
                >
                    Send Feedback
                </button>
            </div>

            {/* Modal for replying */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="font-semibold text-lg">Reply to Feedback</h2>
                        <textarea
                            className="w-full p-2 border rounded mt-2"
                            rows="4"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your reply..."
                        />
                        <div className="mt-4 flex justify-between">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleSaveReply}
                            >
                                Save Reply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Feedback;
