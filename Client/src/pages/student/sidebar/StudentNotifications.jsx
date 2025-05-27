import React, { useEffect, useState } from "react";
import { FaBell, FaUserTie, FaBuilding, FaRobot } from "react-icons/fa";
import PageLayout from "../../../components/PageLayout";

const bgColor = "#1F3F6A";

const iconMap = {
  advisor: <FaUserTie style={{ color: bgColor }} />,
  po: <FaBuilding className="text-green-700" />,
  system: <FaRobot className="text-gray-600" />,
};

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const advisorMeetings = JSON.parse(localStorage.getItem("meetings")) || [];
      const announcements = JSON.parse(localStorage.getItem("announcements")) || [];

      const advisorMeetingNotifications = advisorMeetings.map((meeting) => ({
        id: meeting.id,
        type: "advisor",
        message: `Advisor scheduled a meeting on ${meeting.date} at ${meeting.time} in ${
          meeting.meetingType === "Online"
            ? "an online meeting room"
            : `Room ${meeting.roomNumber}`
        }.`,
        timestamp: new Date(`${meeting.date}T${meeting.time}`).toISOString(),
      }));

      const announcementNotifications = announcements.map((announcement) => ({
        id: announcement.id,
        type: announcement.type,
        message: `${announcement.type === "advisor" ? "Advisor" : "Project Office"} made an announcement: "${announcement.subject}"`,
        timestamp: announcement.timestamp,
      }));

      const staticNotifications = [
        {
          id: 101,
          type: "po",
          message: "Project Office requested your final proposal submission.",
          timestamp: "2025-05-24T09:30:00",
        },
        {
          id: 102,
          type: "system",
          message: "System update: Your supervisor has been approved.",
          timestamp: "2025-05-20T18:45:00",
        },
      ];

      const allNotifications = [
        ...advisorMeetingNotifications,
        ...announcementNotifications,
        ...staticNotifications,
      ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setNotifications(allNotifications);
    };

    fetchNotifications();
  }, []);

  return (
    <PageLayout title="Notifications">
      <div className="p-6 pt-4 min-h-screen bg-gray-50">
        <div className="bg-white rounded-md shadow-md p-6">
          <h1 className="text-2xl font-semibold flex items-center text-blue-950 mb-6">
            <FaBell className="mr-3 text-blue-950" />
            Notifications
          </h1>

          {notifications.length === 0 ? (
            <p className="text-gray-500">No notifications to display.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((note) => (
                <li
                  key={note.id}
                  className="bg-gray-100 hover:bg-gray-200 transition rounded-md p-4 flex items-start gap-4"
                >
                  <div className="text-2xl">{iconMap[note.type]}</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{note.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(note.timestamp).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default StudentNotifications;
