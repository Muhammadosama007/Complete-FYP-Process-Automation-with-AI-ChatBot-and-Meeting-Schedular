const ContentArea = ({ activeTab }) => {
    const renderContent = () => {
        switch (activeTab) {
            case "Announcement":
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-[#1F3F6A] text-white">
                                    <th className="border border-gray-300 px-4 py-3 text-left">Sr No.</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Subject</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Date</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Attachment</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={5} className="border border-gray-300 px-4 py-3 text-gray-700">
                                        No Announcement
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            case "Material":
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-[#1F3F6A] text-white">
                                    <th className="border border-gray-300 px-4 py-3 text-left">Sr No.</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Course Material</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={4} className="border border-gray-300 px-4 py-3 text-gray-700">
                                        No Course Material
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            case "Submission":
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-[#1F3F6A] text-white">
                                    <th className="border border-gray-300 px-4 py-3 text-left">Sr No.</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Name</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Start Date</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">End Date</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Upload</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={6} className="border border-gray-300 px-4 py-3 text-gray-700">
                                        No Course Material
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            case "Feedback":
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-[#1F3F6A] text-white">
                                    <th className="border border-gray-300 px-4 py-3 text-left">Sr No.</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Status</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={3} className="border border-gray-300 px-4 py-3 text-gray-700">
                                        No FeedBack
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            case "Grade Book":
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-[#1F3F6A] text-white">
                                    <th className="border border-gray-300 px-4 py-3 text-left">Sr No.</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Assessment Type</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Select Best Of</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Obtained Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={4} className="border border-gray-300 px-4 py-3 text-gray-700">
                                        No Course Material
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return <p className="text-gray-700">Select a Tab to View Content.</p>;
        }
    };

    return (
        <div className="bg-white rounded-md shadow-2xl border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-[#1F3F6A] mb-6">Final Year Project I (FYP ID)</h2>
            {renderContent()}
        </div>
    );
};

export default ContentArea;