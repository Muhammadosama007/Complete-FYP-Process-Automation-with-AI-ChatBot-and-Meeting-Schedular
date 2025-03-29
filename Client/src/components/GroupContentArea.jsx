const ContentArea = ({ activeTab }) => {
    const renderContent = () => {
        switch (activeTab) {
            case "Available List":
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-[#1F3F6A] text-white">
                                    <th className="border border-gray-300 px-4 py-3 text-left">Sr No.</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Domain</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left">Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={3} className="border border-gray-300 px-4 py-3 text-gray-700">
                                        No List Yet
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            case "New Form":
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-[#1F3F6A] text-white">
                                    <th className="border border-gray-300 px-4 py-3 text-left">Form For New Group</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <div className="w-full mx-auto mt-10 border p-6 shadow-md rounded-lg">
                                        <div className="grid grid-cols-2 gap-6">
                                            {/* Name Field */}
                                            <div>
                                                <label className="block text-gray-700">Name</label>
                                                <input
                                                    type="text"
                                                    className="w-96 border-b border-gray-300 outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            {/* WhatsApp Number Field */}
                                            <div>
                                                <label className="block text-gray-700">WhatsApp Number</label>
                                                <input
                                                    type="text"
                                                    className="w-96 border-b border-gray-300 outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            {/* Students Required Field */}
                                            <div>
                                                <label className="block text-gray-700">Students Req in Group</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="3"
                                                    className="w-96  border-b border-gray-300 outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            {/* Domain Field */}
                                            <div>
                                                <label className="block text-gray-700">Domain</label>
                                                <input
                                                    type="text"
                                                    className="w-96  border-b border-gray-300 outline-none focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex justify-end mt-6">
                                            <button className="bg-[#1F3F6A] text-white px-6 py-2 rounded-md">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
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