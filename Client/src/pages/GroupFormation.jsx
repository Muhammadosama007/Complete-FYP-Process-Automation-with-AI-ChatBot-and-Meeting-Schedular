import { useState } from "react";
import PageLayout from "../components/PageLayout";
import TabButton from "../components/TabButton";
import DataTable from "../components/DataTable";

const GroupFormation = () => {
    const contentMap = {
        "Available List": (
            <DataTable
                columns={["Sr No.", "Domain", "Download"]}
                noDataMessage="No List Yet"
            />
        ),
        "New Form": (
            <div className="w-full mx-auto mt-10 border p-6 shadow-md rounded-lg">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input type="text" className="w-96 border-b border-gray-300 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-gray-700">WhatsApp Number</label>
                        <input type="text" className="w-96 border-b border-gray-300 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Students Req in Group</label>
                        <input type="number" min="0" max="3" className="w-96 border-b border-gray-300 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Domain</label>
                        <input type="text" className="w-96 border-b border-gray-300 outline-none focus:border-blue-500" />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button className="bg-[#1F3F6A] text-white px-6 py-2 rounded-md">Submit</button>
                </div>
            </div>
        )
    };

    return (
        <PageLayout
            initialActiveTab="Available List"
            tabs={["Available List", "New Form"]}
            contentMap={contentMap}
        />
    );
};

export default GroupFormation;