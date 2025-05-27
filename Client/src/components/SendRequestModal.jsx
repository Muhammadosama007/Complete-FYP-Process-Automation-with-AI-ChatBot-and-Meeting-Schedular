import React from "react";

const SendRequestModal = ({ advisor, onClose, onFileChange, onSubmit }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-[600px] p-6 rounded-lg shadow-lg flex flex-col space-y-4">
                <h2 className="text-xl font-semibold mb-4">Send Request to {advisor?.name}</h2>
                
                <input
                    type="file"
                    onChange={onFileChange}
                    className="border rounded p-2"
                />

                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Send Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SendRequestModal;
