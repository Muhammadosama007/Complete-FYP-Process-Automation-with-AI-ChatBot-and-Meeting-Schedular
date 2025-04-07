import PageLayout from "../components/PageLayout";
import DataTable from "../components/DataTable";
import Feedback from "../components/Feedback";
import Meeting from "../components/Meeting";
import ProgressBoard from "../components/ProgressBoard";

const AdvisorSelection = () => {
    const contentMap = {
        "Advisor Selection": (
            <DataTable
                columns={["Sr No.", "Advisor List", "Description", "Advisor Status", "Download"]}
                noDataMessage="No Announcement"
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