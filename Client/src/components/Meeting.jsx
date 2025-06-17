import React, { useState, useEffect } from "react";
import axios from "axios";

const Meeting = ({ readOnly = false }) => {
    const [meetings, setMeetings] = useState([]);

    const student = JSON.parse(localStorage.getItem("googleUser"));
    console.log("student:", student);
    const studentProjectId = student?.projectId;

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const res = await axios.get("http://localhost:3002/api/meetings");
                const allMeetings = res.data;

                // Filter only meetings for student's project
                const filteredMeetings = allMeetings.filter(
                    (m) => m.projectId?._id === studentProjectId
                );

                setMeetings(filteredMeetings);
            } catch (error) {
                console.error("Error fetching meetings:", error);
            }
        };

        if (readOnly && studentProjectId) {
            fetchMeetings();
        }
    }, [readOnly, studentProjectId]);

    return (
        <div className="space-y-4">
            {!readOnly && (
                <button
                    className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-950 transition"
                    onClick={() => setShowModal(true)}
                >
                    + Add Meeting
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
                                <tr key={meeting._id} className="border border-gray-300 hover:bg-gray-100 transition">
                                    <td className="p-3 border border-gray-300">{meeting.date}</td>
                                    <td className="p-3 border border-gray-300">{meeting.time}</td>
                                    <td className="p-3 border border-gray-300">{meeting.agenda}</td>
                                    <td className="p-3 border border-gray-300">{meeting.meetingType}</td>
                                    <td className="p-3 border border-gray-300">
                                        {meeting.meetingType === "Online"
                                            ? "Zoom/Meet Link (Coming Soon)"
                                            : `Room ${meeting.roomNumber || "N/A"}`}
                                    </td>
                                    {!readOnly && (
                                        <td className="p-3 flex space-x-3">
                                            <button className="text-blue-950 hover:underline">Edit</button>
                                            <button className="text-red-600 hover:underline">Delete</button>
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
        </div>
    );
};

export default Meeting;
