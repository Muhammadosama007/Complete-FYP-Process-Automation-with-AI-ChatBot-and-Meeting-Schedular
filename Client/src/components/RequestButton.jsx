import React from "react";

const RequestButton = ({ advisor, onClick }) => {
    const isAvailable = advisor.isAvailable; // boolean from backend

    return (
        <button
            className={`px-3 py-1 rounded text-white ${isAvailable ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
            onClick={() => isAvailable && onClick(advisor)}
            disabled={!isAvailable}
        >
            Send Request
        </button>
    );
};

export default RequestButton;
