import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import Feedback from "../../components/Feedback";

const SubmissionDetail = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded);
    alert("Plagiarism check submitted.");
  };

  const contentMap = {
    Feedback: <Feedback sender="PO" feedbackKey="poFeedbacks" />,
    Submission: (
      <div>
        <h2 className="text-lg font-semibold mb-2">Submitted Document</h2>
        <a
          href="/sample-docs/sample.pdf"
          download="submission.pdf"
          className="text-blue-700 underline"
        >
          Download Submission
        </a>
      </div>
    ),
    "Pledge Detection": (
      <div>
        <h2 className="text-lg font-semibold mb-2">Upload File to Check for Reuse</h2>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleUpload}
          className="mb-4"
        />
        {file && <p className="text-green-700">Uploaded: {file.name}</p>}
      </div>
    ),
  };

  return (
    <PageLayout
      initialActiveTab="Feedback"
      tabs={["Feedback", "Submission", "Pledge Detection"]}
      contentMap={contentMap}
    />
  );
};

export default SubmissionDetail;
