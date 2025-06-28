import React, { useState, useEffect } from "react";
import axios from "axios";

const Meeting = ({ readOnly = false }) => {
    const [meetings, setMeetings] = useState([]);
    const student = JSON.parse(localStorage.getItem("googleUser"));
    const studentProjectId = student?.projectId;

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const res = await axios.get("http://localhost:3002/api/meetings");
                const allMeetings = res.data;

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
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 shadow-md">
                    <thead>
                        <tr className="bg-blue-950 text-white">
                            <th className="p-3 border">Date</th>
                            <th className="p-3 border">Time</th>
                            <th className="p-3 border">Agenda</th>
                            <th className="p-3 border">Meeting Type</th>
                            <th className="p-3 border">Location / Online Link</th>
                            {!readOnly && <th className="p-3 border">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {meetings.length > 0 ? (
                            meetings.map((meeting) => (
                                <tr key={meeting._id} className="hover:bg-gray-100">
                                    <td className="p-3 border">{meeting.date}</td>
                                    <td className="p-3 border">{meeting.time}</td>
                                    <td className="p-3 border">{meeting.agenda}</td>
                                    <td className="p-3 border">{meeting.meetingType}</td>
                                    <td className="p-3 border">
                                        {meeting.meetingType === "Online" ? (
                                            meeting.onlineLink ? (
                                                <a
                                                    href={meeting.onlineLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    View Link
                                                </a>
                                            ) : (
                                                "No Link Provided"
                                            )
                                        ) : (
                                            meeting.roomNumber || "No Room Assigned"
                                        )}
                                    </td>
                                    {!readOnly && (
                                        <td className="p-3 border">
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
