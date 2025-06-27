import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import DataTable from "../../components/DataTable";
import axios from "axios";

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("googleUser")); // updated key
        const userId = user?._id;

        if (!userId) {
          console.error("User not found in localStorage.");
          return;
        }

        const res = await axios.get("http://localhost:3002/api/projects/advisor", {
          headers: {
            "x-user-id": userId,
          },
          withCredentials: true,
        });
console.log("Response data:", res.data);

        setProjects(res.data);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const contentMap = {
    "Projects List": loading ? (
      <div className="p-4 text-center">Loading...</div>
    ) : (
     <DataTable
  columns={["Title", "Status", "Action"]}
  data={projects.map((project) => [
    project.title || "Untitled",
    project.status || "Unknown",
   
    <button
      key={project._id}
      className="text-blue-600 hover:underline"
      onClick={() => navigate(`/advisor/dashboard/projects/${project.id}`)}
    >
      View
    </button>,
  ])}


        noDataMessage="No Projects Yet"
      />
    ),
  };

  return (
    <PageLayout
      initialActiveTab="Projects List"
      tabs={["Projects List"]}
      contentMap={contentMap}
    />
  );
};

export default ProjectList;
