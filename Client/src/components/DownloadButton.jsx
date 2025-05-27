import React from "react";
import { FaDownload } from "react-icons/fa";

const DownloadButton = ({ onDownload }) => {
    return (
        <button
            onClick={onDownload}
            className="px-3 py-1 ml-6 rounded bg-[#1F3F6A] hover:bg-[#1F3F6A] text-white"
        >
            <FaDownload size={20} color="white" />
        </button>
    );
};

export default DownloadButton;
