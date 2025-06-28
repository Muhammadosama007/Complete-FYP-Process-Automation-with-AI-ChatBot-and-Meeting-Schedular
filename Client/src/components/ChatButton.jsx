import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const ChatButton = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '👋 Hello! I am your FYP AI Assistant. Ask me anything about your FYP process.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput('');
    const user = JSON.parse(localStorage.getItem('googleUser'));
    const userId = user?._id;
    try {
      const res = await axios.post('http://localhost:3002/api/ideas/check-idea-smart', {
        message: input,
        userId,
      });

      const botReply = res.data;
      const botMessages = [{ sender: 'bot', text: botReply.reply }];

      if (botReply.similarityScore !== undefined) {
        botMessages.push({
          sender: 'bot',
          text: `🔍 Similarity Score: ${botReply.similarityScore.toFixed(3)}`,
        });
      }

      if (botReply.similarIdea) {
        botMessages.push({
          sender: 'bot',
          text: `📝 Similar Idea:\n${botReply.similarIdea}`,
        });
      }

      if (botReply.suggestion) {
        botMessages.push({
          sender: 'bot',
          text: `💡 Suggestion:\n${botReply.suggestion}`,
        });
      }

      if (botReply.templateUrl) {
        const url = botReply.templateUrl;
        const isFile = /\.(docx|pdf|pptx|xlsx|zip)$/i.test(url);
        const icon = isFile ? '📄' : '🌐';
        const label = isFile ? 'Click here to download the template' : 'Click here to view material';

        botMessages.push({
          sender: 'bot',
          text: (
            <span>
              {icon}{' '}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {label}
              </a>
            </span>
          ),
        });
      }

      setMessages((prev) => [...prev, ...botMessages]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: '⚠️ Something went wrong. Try again later.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const user = JSON.parse(localStorage.getItem('googleUser'));
    const userId = user?._id;
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: `📤 Uploaded file: ${file.name}` },
    ]);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    try {
      await axios.post('http://localhost:3002/api/chatBotUpload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },

      });

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '✅ File uploaded successfully.' },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '⚠️ File upload failed. Try again.' },
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
      >
        💬
      </button>

      {/* Chatbot Modal */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-2xl flex flex-col h-[70vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b bg-blue-600 rounded-t-xl text-white">
            <h2 className="font-bold text-lg">🎓 FYP AI Chatbot</h2>
            <button
              className="text-white text-xl hover:text-red-300"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md text-sm ${msg.sender === 'user'
                  ? 'text-right bg-blue-100 ml-16'
                  : 'text-left bg-green-100 mr-16'
                  }`}
              >
                <p className="whitespace-pre-wrap">
                  {typeof msg.text === 'string' ? msg.text : msg.text}
                </p>
              </div>
            ))}
            {loading && <p className="text-gray-500 italic text-sm">Typing...</p>}
            <div ref={chatEndRef} />
          </div>

          {/* Input & Upload */}
          <div className="flex flex-col border-t">
            <div className="flex p-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-l px-4 py-2 text-sm"
                placeholder="Ask about FYP phases, templates..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 text-sm"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
            <div className="px-2 pb-2">
              <input
                type="file"
                onChange={handleFileUpload}
                className="text-sm text-gray-700"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatButton;
