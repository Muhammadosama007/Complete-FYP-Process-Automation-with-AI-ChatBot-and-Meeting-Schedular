import React, { useEffect, useState } from "react";
import axios from "axios";

const GradeBook = ({ projectId, user }) => {
  const [grades, setGrades] = useState([]);
  const [newAssessment, setNewAssessment] = useState({ type: "", total: "" });

  const isAdvisor = user?.role === "advisor";

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/grades?projectId=${projectId}`);
        setGrades(res.data);
      } catch (err) {
        console.error("Error fetching grades:", err);
      }
    };
    if (projectId) fetchGrades();
  }, [projectId]);

  const handleCreateAssessment = async () => {
    try {
      const res = await axios.post("http://localhost:3002/api/grades", {
        projectId,
        assessmentType: newAssessment.type,
        totalMarks: newAssessment.total,
      });
      setGrades((prev) => [...prev, res.data]);
      setNewAssessment({ type: "", total: "" });
    } catch (err) {
      console.error("Error creating assessment:", err);
    }
  };

  const handleMark = async (gradeId, studentId, obtained) => {
    try {
      await axios.post(`http://localhost:3002/api/grades/${gradeId}/mark`, {
        studentId,
        obtained,
      });

      setGrades((prev) =>
        prev.map((g) =>
          g._id === gradeId
            ? {
                ...g,
                marks: g.marks.map((m) =>
                  m.student._id === studentId ? { ...m, obtained } : m
                ),
              }
            : g
        )
      );
    } catch (err) {
      console.error("Error updating mark:", err);
    }
  };

  return (
    <div className="space-y-6">
      {isAdvisor && (
        <div className="border p-4 rounded bg-blue-50">
          <h3 className="font-semibold mb-2">Create Assessment</h3>
          <input
            type="text"
            placeholder="Assessment Type"
            value={newAssessment.type}
            onChange={(e) => setNewAssessment({ ...newAssessment, type: e.target.value })}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="number"
            placeholder="Total Marks"
            value={newAssessment.total}
            onChange={(e) => setNewAssessment({ ...newAssessment, total: e.target.value })}
            className="border px-2 py-1 mr-2"
          />
          <button
            onClick={handleCreateAssessment}
            className="bg-[#1F3F6A] text-white px-4 py-1 rounded hover:bg-[#234879]"
          >
            Create
          </button>
        </div>
      )}

      {grades.map((g, i) => (
        <div key={g._id} className="border p-4 rounded ">
          <h4 className="font-semibold mb-2">
            {i + 1}. {g.assessmentType} (Total: {g.totalMarks})
          </h4>
          {g.marks.length === 0 ? (
            <p>No marks yet</p>
          ) : (
            <table className="w-full table-auto border border-collapse ">
              <thead>
                <tr className="  bg-gray-100 ">
                  <th className="border px-3 py-2 bg-[#1F3F6A] text-white ">Student</th>
                  <th className="border px-3 py-2 bg-[#1F3F6A] text-white ">Marks</th>
                </tr>
              </thead>
              <tbody>
                {g.marks.map((m) => (
                  <tr key={m.student._id}>
                    <td className="border px-3 py-2">{m.student.name}</td>
                    <td className="border px-3 py-2">
                      {isAdvisor ? (
                        <input
                          type="number"
                          className="border px-2 py-1"
                          defaultValue={m.obtained}
                          onBlur={(e) =>
                            handleMark(g._id, m.student._id, parseInt(e.target.value))
                          }
                        />
                      ) : (
                        m.obtained
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default GradeBook;
