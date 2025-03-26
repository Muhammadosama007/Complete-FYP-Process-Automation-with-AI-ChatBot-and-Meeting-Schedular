import React from "react";

const ChatButton = ({ bgColor }) => {
    return (
        <footer className="fixed bottom-9 right-6">
            <button style={{ backgroundColor: bgColor }} className="border text-white px-4 py-3 rounded-full shadow-md hover:bg-blue-600">
                Chat Bot
            </button>
        </footer>
    );
};

export default ChatButton;