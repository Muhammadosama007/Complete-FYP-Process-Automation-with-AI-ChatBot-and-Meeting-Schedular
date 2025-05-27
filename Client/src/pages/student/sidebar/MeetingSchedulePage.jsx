import React from "react";
import PageLayout from "../../../components/PageLayout";
import Meeting from "../../../components/Meeting"; // adjust path if different

const MeetingPage = () => {
    return (
        <PageLayout title="Meetings">
            <div className="mt-4">
                <Meeting readOnly={true} />
            </div>
        </PageLayout>
    );
};

export default MeetingPage;
