import PageLayout from "../components/PageLayout";
import TabButton from "../components/TabButton";
import DataTable from "../components/DataTable";
import Feedback from "../components/Feedback";
import ProgressBoard from "../components/ProgressBoard";

const IdeaSelection = () => {
    const contentMap = {
        "Anouncement": (
            <DataTable
                columns={["Sr No.", "Subject", "Date", "Description", "Attachment"]}
                noDataMessage="No Announcement"
            />
        ),
        "Material": (
            <DataTable
                columns={["Sr No.", "Course Material", "Description", "Download"]}
                noDataMessage="No Course Material"
            />
        ),

        "Progress": (
            <ProgressBoard />
        ),
        "Submission": (
            <DataTable
                columns={["Sr No.", "Name", "Description", "Start Date", "End Date", "Upload"]}
                noDataMessage="No Course Material"
            />
        ),
        "Feedback": (
            <>
                <Feedback />
            </>
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
            initialActiveTab="Anouncement"
            tabs={["Anouncement", "Material", "Progress", "Submission", "Feedback", "Grade Book"]}
            contentMap={contentMap}
        />
    );
};

export default IdeaSelection;