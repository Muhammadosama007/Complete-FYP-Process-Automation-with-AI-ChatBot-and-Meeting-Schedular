import React, { useEffect, useState } from "react";

const AddMaterialModal = ({ isOpen, onClose, onSave, projectId }) => {
    const [formData, setFormData] = useState({
        subject: "", // ✅ changed from "material" to "subject" to match backend
        description: "",
        attachment: null,
    });

    useEffect(() => {
        if (isOpen) {
            setFormData({
                subject: "",
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

    const handleSubmit = async () => {
        try {
            const formPayload = new FormData();
            formPayload.append("subject", formData.subject);
            formPayload.append("description", formData.description);
            formPayload.append("projectId", projectId);

            if (formData.attachment) {
                formPayload.append("attachment", formData.attachment);
            }

            const response = await fetch("http://localhost:3002/api/materials", {
                method: "POST",
                body: formPayload
            });

            const data = await response.json();
            onSave(data);
            onClose();
        } catch (error) {
            console.error("Failed to upload material:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-semibold mb-4">Add Course Material</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Material Title"
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

export default AddMaterialModal;
