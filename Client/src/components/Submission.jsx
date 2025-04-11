import React from "react";
import { useNavigate } from "react-router-dom";

const Submission = ({ phase }) => {
  const navigate = useNavigate();
  const submissions = [
    {
      id: 1,
      title: "AI Chatbot",
      group: "BSSE-Group1",
      status: "Submitted"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{phase} Submissions</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Group</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td className="border px-4 py-2">{submission.group}</td>
              <td className="border px-4 py-2">{submission.title}</td>
              <td className="border px-4 py-2">{submission.status}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => navigate(`/submission-view/${submission.id}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Submission;