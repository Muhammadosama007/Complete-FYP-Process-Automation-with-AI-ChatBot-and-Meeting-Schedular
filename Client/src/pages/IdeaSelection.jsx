import PageLayout from "../components/PageLayout";
import TabButton from "../components/TabButton";
import DataTable from "../components/DataTable";

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
        "Submission": (
            <DataTable
                columns={["Sr No.", "Name", "Description", "Start Date", "End Date", "Upload"]}
                noDataMessage="No Course Material"
            />
        ),
        "Feedback": (
            <DataTable
                columns={["Sr No.", "Status", "Description"]}
                noDataMessage="No FeedBack"
            />
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
            tabs={["Anouncement", "Material", "Submission", "Feedback", "Grade Book"]}
            contentMap={contentMap}
        />
    );
};

export default IdeaSelection;