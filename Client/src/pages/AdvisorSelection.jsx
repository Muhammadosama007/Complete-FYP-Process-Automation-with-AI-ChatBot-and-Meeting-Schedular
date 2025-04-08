import PageLayout from "../components/PageLayout";
import DataTable from "../components/DataTable";
import Feedback from "../components/Feedback";
import Meeting from "../components/Meeting";

const AdvisorSelection = () => {
    const advisors = [
        {
            id: 1,
            name: "Dr. Ahmed",
            description: "Expert in AI Chatbots and NLP",
            status: "available"
        },
        {
            id: 2,
            name: "Prof. Ayesha",
            description: "Specialist in E-Commerce systems",
            status: "available"
        },
        {
            id: 3,
            name: "Dr. Bilal",
            description: "Experienced in Smart Attendance Systems",
            status: "not available"
        }
    ];
    const contentMap = {
        "Advisor Selection": (
            <DataTable
                columns={["Sr No.", "Advisor Name", "Description", "Advisor Status", "Request"]}
                data={advisors.map((advisor) => [
                    advisor.id,
                    advisor.name,
                    advisor.description,
                    advisor.status,
                    <button
                        key={advisor.id}
                        className={`px-3 py-1 rounded text-white ${advisor.status == "available" ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
                            }`}
                        onClick={() => sendRequest(advisor.id)}
                        disabled={!advisor.available}
                    >
                        Send Request
                    </button>
                ])}
                noDataMessage="No Projects Yet"
            />
        ),
        "Material": (
            <DataTable
                columns={["Sr No.", "Course Material", "Description", "Download"]}
                noDataMessage="No Course Material"
            />
        ),
        "Feedback": (
            <>
                <Feedback sender="Student" />
            </>
        ),
        "Meeting": (
            <Meeting readOnly={true} />
        ),
        "Grade Book": (
            <DataTable
                columns={["Sr No.", "Assessment Type", "Select Best Of", "Obtained Percentage"]}
                noDataMessage="No Course Material"
            />
        )
    };

    return (
        <PageLayout
            initialActiveTab="Advisor Selection"
            tabs={["Advisor Selection", "Material", "Feedback", "Meeting", "Grade Book"]}
            contentMap={contentMap}
        />
    );
};

export default AdvisorSelection;