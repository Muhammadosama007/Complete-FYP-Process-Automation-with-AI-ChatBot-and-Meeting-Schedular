import React, { useState, useRef, useEffect } from "react";

const ChatButton = ({ bgColor }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([
        { sender: "AI", text: "Hi, how can I help you today?" }
    ]);
    const messageEndRef = useRef(null);

    const handleSend = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;

        setMessages(prev => [...prev, { sender: "You", text: inputValue }]);
        setInputValue("");

        // Simulate AI reply
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                { sender: "You", text: inputValue },
                { sender: "AI", text: "Sorry, I couldn't find any information in the documentation about that." }
            ]);
        }, 600);
    };

    // Scroll to bottom on new message
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium border rounded-full w-16 h-16 hover:bg-gray-700 cursor-pointer border-gray-200 p-0 leading-5 text-white"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                style={{ background: bgColor }}
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="text-white">
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                </svg>
            </button>

            {/* Chat UI Panel */}
            {isOpen && (
                <div className="fixed bottom-[calc(4rem+1.5rem)] right-4 bg-white p-6 rounded-lg border border-gray-300 w-[90vw] max-w-[440px] max-h-[85vh] shadow-md z-50 flex flex-col">
                    {/* Heading */}
                    <div className="flex flex-col space-y-1.5 pb-6">
                        <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
                        <p className="text-sm text-gray-500 leading-3">Powered by Mendable and Vercel</p>
                    </div>

                    {/* Chat Container - scrollable */}
                    <div className="flex-1 overflow-y-auto pr-2 mb-4">
                        {messages.map((msg, index) => (
                            <div key={index} className="flex gap-3 my-4 text-gray-600 text-sm">
                                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                    <div className="rounded-full bg-gray-100 border p-1">
                                        <svg stroke="none" fill="black" viewBox="0 0 24 24" height="20" width="20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            {msg.sender === "AI" ? (
                                                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                            ) : (
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                            )}
                                        </svg>
                                    </div>
                                </span>
                                <p className="leading-relaxed">
                                    <span className="block font-bold text-gray-700">{msg.sender}</span>
                                    {msg.text}
                                </p>
                            </div>
                        ))}
                        <div ref={messageEndRef} />
                    </div>

                    {/* Input Area - fixed at bottom */}
                    <div className="pt-2 border-t border-gray-200">
                        <form className="flex items-center space-x-2" onSubmit={handleSend}>
                            <input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                                placeholder="Type your message"
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-white hover:bg-gray-900 h-10 px-4 py-2"
                                style={{ background: bgColor }}
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatButton;
