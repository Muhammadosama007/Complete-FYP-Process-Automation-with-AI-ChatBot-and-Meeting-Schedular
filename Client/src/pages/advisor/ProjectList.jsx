import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import DataTable from "../../components/DataTable";

const ProjectList = () => {
    const navigate = useNavigate();

    const projects = [
        { id: 1, title: "AI Chatbot", status: "Ongoing", students: "Ali, Ayesha" },
        { id: 2, title: "E-Commerce Website", status: "Completed", students: "Ahmed, Sara" },
        { id: 3, title: "Smart Attendance System", status: "Ongoing", students: "Bilal, Zara" },
    ];

    console.log(projects);

    const contentMap = {
        "Projects List": (
            <DataTable
                columns={["Title", "Status", "Students", "Action"]}
                data={projects.map((project) => [
                    project.title,
                    project.status,
                    project.students,
                    <button
                        key={project.id}
                        className="text-blue-600 hover:underline"
                        onClick={() => navigate(`/advisor/dashboard/projects/${project.id}`)}
                    >
                        View
                    </button>,
                ])}
                noDataMessage="No Projects Yet"
            />
        )
    };

    return <PageLayout initialActiveTab="Projects List" tabs={["Projects List"]} contentMap={contentMap} />;
};

export default ProjectList;
