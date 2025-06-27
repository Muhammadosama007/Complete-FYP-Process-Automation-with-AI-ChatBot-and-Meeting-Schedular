import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";

const Submission = ({ projectId, user }) => {
  const [submissions, setSubmissions] = useState([]);
  const [newSubmission, setNewSubmission] = useState({ endDate: "", endTime: "" });
  const [studentFiles, setStudentFiles] = useState({});
  const isAdvisor = user?.role === "advisor";

  // Fetch all submissions for a project
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/submissions?projectId=${projectId}`);
        setSubmissions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setSubmissions([]);
      }
    };

    if (projectId) fetchSubmissions();
  }, [projectId]);

  // Advisor creates submission
  const handleCreateSubmission = async () => {
    try {
      const { endDate, endTime } = newSubmission;
      if (!endDate || !endTime) return;

      const res = await axios.post("http://localhost:3002/api/submissions", {
        projectId,
        endDate,
        endTime,
      });

      setSubmissions((prev) => [...prev, res.data]);
      setNewSubmission({ endDate: "", endTime: "" });
    } catch (err) {
      console.error("Error creating submission:", err);
    }
  };

  // Student uploads a file to a specific submission
  const handleFileUpload = async (submissionId) => {
    const file = studentFiles[submissionId];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploadedBy", user?.name || "Unknown");

    try {
      const res = await axios.post(`http://localhost:3002/api/submissions/${submissionId}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSubmissions((prev) =>
        prev.map((s) =>
          s._id === submissionId ? { ...s, studentFile: res.data.file } : s
        )
      );
      setStudentFiles((prev) => ({ ...prev, [submissionId]: null }));
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  return (
    <div className="space-y-4">
      {isAdvisor && (
        <div className="border p-4 rounded bg-blue-50">
          <h3 className="font-semibold mb-2">Create New Submission</h3>
          <div className="flex items-center gap-4">
            <input
              type="date"
              value={newSubmission.endDate}
              onChange={(e) =>
                setNewSubmission({ ...newSubmission, endDate: e.target.value })
              }
              className="border px-2 py-1"
            />
            <input
              type="time"
              value={newSubmission.endTime}
              onChange={(e) =>
                setNewSubmission({ ...newSubmission, endTime: e.target.value })
              }
              className="border px-2 py-1"
            />
            <button
              onClick={handleCreateSubmission}
              className="bg-[#1F3F6A] text-white px-4 py-1 rounded hover:bg-[#224675]"
            >
              Create
            </button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <table className="w-full table-auto border border-collapse">
          <thead>
            <tr className="bg-[#1F3F6A] text-white ">
              <th className="border px-3 py-2">Sr No.</th>
              <th className="border px-3 py-2">End Date</th>
              <th className="border px-3 py-2">End Time</th>
              <th className="border px-3 py-2">Student File</th>
              {isAdvisor ? (
                <th className="border px-3 py-2">Uploaded By</th>
              ) : (
                <th className="border px-3 py-2">Upload</th>
              )}
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No submissions yet
                </td>
              </tr>
            ) : (
              submissions.map((s, i) => (
                <tr key={s._id}>
                  <td className="border px-3 py-2">{i + 1}</td>
                  <td className="border px-3 py-2">{s.endDate}</td>
                  <td className="border px-3 py-2">{s.endTime}</td>
                  <td className="border px-3 py-2">
                    {s.studentFile ? (
                      <a href={s.studentFile.content} download={s.studentFile.name}>
                        <FaDownload size={18} />
                      </a>
                    ) : (
                      "Not submitted"
                    )}
                  </td>
                  {isAdvisor ? (
                    <td className="border px-3 py-2">
                      {s.studentFile?.uploadedBy || "—"}
                    </td>
                  ) : (
                    <td className="border px-3 py-2">
                      <input
                        type="file"
                        onChange={(e) =>
                          setStudentFiles((prev) => ({
                            ...prev,
                            [s._id]: e.target.files[0],
                          }))
                        }
                      />
                      <button
                        disabled={!studentFiles[s._id]}
                        onClick={() => handleFileUpload(s._id)}
                        className={`ml-2 px-2 py-1 rounded ${
                          studentFiles[s._id]
                            ? "bg-green-600 text-white"
                            : "bg-gray-400 text-white cursor-not-allowed"
                        }`}
                      >
                        Upload
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Submission;
