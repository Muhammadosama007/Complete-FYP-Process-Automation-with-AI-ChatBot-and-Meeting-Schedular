import React, { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import DataTable from "../../components/DataTable";

const FeedbackPage = () => {
    const [allFeedbacks, setAllFeedbacks] = useState([]);

    useEffect(() => {
        const ideaFeedbacks = JSON.parse(localStorage.getItem("ideaFeedbacks")) || [];
        const advisorFeedbacks = JSON.parse(localStorage.getItem("advisorFeedbacks")) || [];

        // Tag each feedback with a purpose
        const taggedIdea = ideaFeedbacks.map(fb => ({ ...fb, purpose: "Idea Selection" }));
        const taggedAdvisor = advisorFeedbacks.map(fb => ({ ...fb, purpose: "Advisor Selection" }));

        setAllFeedbacks([...taggedAdvisor, ...taggedIdea]);
    }, []);

    return (
        <PageLayout title="Feedbacks">
            <div className="mt-4">
                <DataTable
                    columns={["Date", "Sender", "Purpose", "Message", "Reply"]}
                    data={allFeedbacks.map(fb => [
                        fb.date,
                        fb.sender,
                        fb.purpose,
                        fb.message,
                        fb.reply || "-"
                    ])}
                    noDataMessage="No feedback available"
                />
            </div>
        </PageLayout>
    );
};

export default FeedbackPage;
