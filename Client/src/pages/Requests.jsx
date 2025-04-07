import React, { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import RequestList from "../components/RequestList";

const Requests = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    setAllRequests(storedRequests.length ? storedRequests : dummyRequests);

    const storedMeetings = JSON.parse(localStorage.getItem("meetings")) || [];
    setMeetings(storedMeetings);
  }, []);

  const tabs = ["Pending Requests", "Approved Requests", "Rejected Requests", "Meetings"];

  const contentMap = {
    "Pending Requests": <RequestList requests={allRequests.filter(r => r.status === "Pending")} />,
    "Approved Requests": <RequestList requests={allRequests.filter(r => r.status === "Approved")} />,
    "Rejected Requests": <RequestList requests={allRequests.filter(r => r.status === "Rejected")} />,
    "Meetings": (
      <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#1F3F6A] text-white">
              {["Student", "Date", "Time", "Location", "Mode"].map((col, i) => (
                <th key={i} className="border px-4 py-2 text-left">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, i) => (
              <tr key={i} className="bg-gray-50">
                <td className="border px-4 py-2">{meeting.student?.name}</td>
                <td className="border px-4 py-2">{meeting.date}</td>
                <td className="border px-4 py-2">{meeting.time}</td>
                <td className="border px-4 py-2">{meeting.location}</td>
                <td className="border px-4 py-2">
                  {meeting.location.toLowerCase().includes("online") ? "Online" : "In Person"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  };

  return (
    <PageLayout
      initialActiveTab="Pending Requests"
      tabs={tabs}
      contentMap={contentMap}
      bgColor="#1F3F6A"
    />
  );
};

const dummyRequests = [
  {
    id: 1,
    name: "Ali Raza",
    title: "AI for Agriculture",
    attachment: "proposal.pdf",
    status: "Pending"
  },
  {
    id: 2,
    name: "Sara Khan",
    title: "Smart Traffic System",
    attachment: "design.docx",
    status: "Pending"
  },
  {
    id: 3,
    name: "Usman Tariq",
    title: "Chatbot for University",
    attachment: "abstract.pdf",
    status: "Pending"
  }
];

export default Requests;
