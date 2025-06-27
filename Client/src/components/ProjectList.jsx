// components/ProjectList.jsx
import React from "react";

const ProjectList = ({ projects }) => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Past Projects</h2>
            <div className="grid gap-4">
                {projects.map((project, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <p className="text-gray-600 mb-2">{project.description}</p>
                        <a
                            href={project.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Download Document
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
