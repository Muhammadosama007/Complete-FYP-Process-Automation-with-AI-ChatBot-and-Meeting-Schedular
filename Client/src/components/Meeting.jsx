import React, { useState, useEffect } from "react";

import AddMeetingModal from "./AddMeetingModal";

const Meeting = ({ readOnly = false }) => {
  const [meetings, setMeetings] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedMeetings = localStorage.getItem("meetings");
      return storedMeetings ? JSON.parse(storedMeetings) : [];
    }
    return [];
  });

  const [showModal, setShowModal] = useState(false);
  const [meetingData, setMeetingData] = useState({
    id: null,
    date: "",
    time: "",
    agenda: "",
    meetingType: "In-Person",
    location: "",
    roomNumber: "",
    status: "Scheduled",
  });

  useEffect(() => {
    localStorage.setItem("meetings", JSON.stringify(meetings));
  }, [meetings]);

  const handleChange = (e) => {
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (meetingData.id) {
      setMeetings((prev) =>
        prev.map((m) => (m.id === meetingData.id ? meetingData : m))
      );
    } else {
      setMeetings((prev) => [
        ...prev,
        { ...meetingData, id: Date.now() },
      ]);
    }

    setShowModal(false);
    resetMeetingData();
  };

  const resetMeetingData = () => {
    setMeetingData({
      id: null,
      date: "",
      time: "",
      agenda: "",
      meetingType: "In-Person",
      location: "",
      roomNumber: "",
      status: "Scheduled",
    });
  };

  const handleEdit = (meeting) => {
    setMeetingData(meeting);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const updatedMeetings = meetings.filter((m) => m.id !== id);
    setMeetings(updatedMeetings);
  };

  return (
    <div className="space-y-4">
      {!readOnly && (
        <button
          className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
          onClick={() => setShowModal(true)}
        >
          Add Meeting
        </button>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-blue-950 text-white">
              <th className="p-3 border border-gray-300">Date</th>
              <th className="p-3 border border-gray-300">Time</th>
              <th className="p-3 border border-gray-300">Agenda</th>
              <th className="p-3 border border-gray-300">Meeting Type</th>
              <th className="p-3 border border-gray-300">Location / Online Link</th>
              {!readOnly && (
                <th className="p-3 border border-gray-300">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {meetings.length > 0 ? (
              meetings.map((meeting) => (
                <tr key={meeting.id} className="border border-gray-300 hover:bg-gray-100 transition">
                  <td className="p-3 border border-gray-300">{meeting.date}</td>
                  <td className="p-3 border border-gray-300">{meeting.time}</td>
                  <td className="p-3 border border-gray-300">{meeting.agenda}</td>
                  <td className="p-3 border border-gray-300">{meeting.meetingType}</td>
                  <td className="p-3 border border-gray-300">
                    {meeting.meetingType === "Online"
                      ? "Zoom/Meet Link (Coming Soon)"
                      : `Room ${meeting.roomNumber}`}
                  </td>
                  {!readOnly && (
                    <td className="p-3 flex space-x-3">
                      <button className="text-blue-950 hover:underline" onClick={() => handleEdit(meeting)}>Edit</button>
                      <button className="text-red-600 hover:underline" onClick={() => handleDelete(meeting.id)}>Delete</button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={readOnly ? 5 : 6} className="text-center p-4 text-gray-500">
                  No meetings scheduled
                </td>
              </tr>


const Meeting = ({ readOnly = false }) => {
    const [meetings, setMeetings] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedMeetings = localStorage.getItem("meetings");
            return storedMeetings ? JSON.parse(storedMeetings) : [];
        }
        return [];
    });

    const [showModal, setShowModal] = useState(false);
    const [meetingData, setMeetingData] = useState({
        id: null,
        date: "",
        time: "",
        agenda: "",
        meetingType: "In-Person",
        location: "",
        roomNumber: "",
        status: "Scheduled",
    });

    useEffect(() => {
        localStorage.setItem("meetings", JSON.stringify(meetings));
    }, [meetings]);

    const handleChange = (e) => {
        setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (meetingData.id) {
            setMeetings((prev) =>
                prev.map((m) => (m.id === meetingData.id ? meetingData : m))
            );
        } else {
            setMeetings((prev) => [
                ...prev,
                { ...meetingData, id: Date.now() },
            ]);
        }

        setShowModal(false);
        setMeetingData({
            id: null,
            date: "",
            time: "",
            agenda: "",
            meetingType: "In-Person",
            location: "",
            roomNumber: "",
            status: "Scheduled",
        });
    };

    const handleEdit = (meeting) => {
        setMeetingData(meeting);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        const updatedMeetings = meetings.filter((m) => m.id !== id);
        setMeetings(updatedMeetings);
    };

    return (
        <div className="space-y-4">
            {!readOnly && (
                <button
                    className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-950 transition"
                    onClick={() => setShowModal(true)}
                >
                    Add Meeting
                </button>
            )}

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 shadow-md">
                    <thead>
                        <tr className="bg-blue-950 text-white">
                            <th className="p-3 border border-gray-300">Date</th>
                            <th className="p-3 border border-gray-300">Time</th>
                            <th className="p-3 border border-gray-300">Agenda</th>
                            <th className="p-3 border border-gray-300">Meeting Type</th>
                            <th className="p-3 border border-gray-300">Location / Online Link</th>
                            {!readOnly && (
                                <th className="p-3 border border-gray-300">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {meetings.length > 0 ? (
                            meetings.map((meeting) => (
                                <tr key={meeting.id} className="border border-gray-300 hover:bg-gray-100 transition">
                                    <td className="p-3 border border-gray-300">{meeting.date}</td>
                                    <td className="p-3 border border-gray-300">{meeting.time}</td>
                                    <td className="p-3 border border-gray-300">{meeting.agenda}</td>
                                    <td className="p-3 border border-gray-300">{meeting.meetingType}</td>
                                    <td className="p-3 border border-gray-300">
                                        {meeting.meetingType === "Online"
                                            ? "Zoom/Meet Link (Coming Soon)"
                                            : `Room ${meeting.roomNumber}`}
                                    </td>
                                    {!readOnly && (
                                        <td className="p-3 flex space-x-3">
                                            <button className="text-blue-950 hover:underline" onClick={() => handleEdit(meeting)}>Edit</button>
                                            <button className="text-red-600 hover:underline" onClick={() => handleDelete(meeting.id)}>Delete</button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={readOnly ? 5 : 6} className="text-center p-4 text-gray-500">
                                    No meetings scheduled
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {!readOnly && showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300">
                        <h2 className="text-xl font-bold mb-4">
                            {meetingData.id ? "Edit Meeting" : "Add Meeting"}
                        </h2>
                        <input
                            type="date"
                            name="date"
                            value={meetingData.date}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded mb-3"
                        />
                        <input
                            type="time"
                            name="time"
                            value={meetingData.time}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded mb-3"
                        />
                        <input
                            type="text"
                            name="agenda"
                            value={meetingData.agenda}
                            onChange={handleChange}
                            placeholder="Agenda"
                            className="w-full p-2 border border-gray-300 rounded mb-3"
                        />

                        <div className="mb-3">
                            <p className="font-semibold mb-2">Meeting Type:</p>
                            <label className="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    name="meetingType"
                                    value="In-Person"
                                    checked={meetingData.meetingType === "In-Person"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                In-Person
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="meetingType"
                                    value="Online"
                                    checked={meetingData.meetingType === "Online"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Online
                            </label>
                        </div>

                        {meetingData.meetingType === "In-Person" && (
                            <input
                                type="text"
                                name="roomNumber"
                                value={meetingData.roomNumber}
                                onChange={handleChange}
                                placeholder="Room Number"
                                className="w-full p-2 border border-gray-300 rounded mb-3"
                            />
                        )}

                        {meetingData.meetingType === "Online" && (
                            <div className="p-2 bg-gray-100 border border-gray-300 rounded mb-3 text-center text-gray-600">
                                Online Meeting Link (Coming Soon)
                            </div>
                        )}

                        <div className="flex justify-end space-x-2 mt-4">
                            <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-950 transition" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>

            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {!readOnly && showModal && (
        <AddMeetingModal
          meetingData={meetingData}
          handleChange={handleChange}
          handleSave={handleSave}
          onClose={() => {
            setShowModal(false);
            resetMeetingData();
          }}
        />
      )}
    </div>
  );
};

export default Meeting;
