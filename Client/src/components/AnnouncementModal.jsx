import React, { useEffect, useState } from "react";

const AnnouncementModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        subject: "",
        date: "",
        description: "",
        attachment: null,
    });

    useEffect(() => {
        if (isOpen) {
            const today = new Date().toISOString().split("T")[0];
            setFormData({
                subject: "",
                date: today,
                description: "",
                attachment: null
            });
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, attachment: file }));
    };

    const handleSubmit = () => {
        const saveAnnouncement = (attachmentContent = null) => {
            const announcement = {
                id: Date.now(),
                subject: formData.subject,
                description: formData.description,
                date: formData.date,
                type: window.location.pathname.includes("advisor") ? "advisor" : "po",
                timestamp: new Date().toISOString(),
                attachment: attachmentContent
            };

            const stored = JSON.parse(localStorage.getItem("announcements")) || [];
            stored.push(announcement);
            localStorage.setItem("announcements", JSON.stringify(stored));

            onSave(announcement);
            onClose();
        };

        if (formData.attachment) {
            const reader = new FileReader();
            reader.onload = () => {
                const attachmentContent = {
                    name: formData.attachment.name,
                    content: reader.result,
                };
                saveAnnouncement(attachmentContent);
            };
            reader.readAsDataURL(formData.attachment);
        } else {
            saveAnnouncement(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-semibold mb-4">Add Announcement</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full"
                    />
                </div>

                <div className="mt-6 flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementModal;
