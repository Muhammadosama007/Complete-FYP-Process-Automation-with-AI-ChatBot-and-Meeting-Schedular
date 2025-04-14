import React, { useState } from "react";

const TemplateModal = ({ isOpen, onClose, onSave }) => {
    const [templateName, setTemplateName] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = () => {
        if (!templateName || !file) return;

        const reader = new FileReader();
        reader.onload = () => {
            onSave({
                material: templateName,
                description,
                file: {
                    name: file.name,
                    content: reader.result
                }
            });
            setTemplateName("");
            setDescription("");
            setFile(null);
            onClose();
        };
        reader.readAsDataURL(file);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96 space-y-4">
                <h2 className="text-lg font-bold">Add Template</h2>
                <input
                    type="text"
                    placeholder="Template Name"
                    className="w-full border p-2"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    className="w-full border p-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="file"
                    className="w-full"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TemplateModal;
