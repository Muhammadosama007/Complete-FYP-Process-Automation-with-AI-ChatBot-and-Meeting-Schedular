import { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import DataTable from "../../components/DataTable";
import InviteMembers from "../../components/InviteMembers";

const LOCAL_STORAGE_KEY = "studentListData";

const GroupFormation = () => {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        required: "",
        domain: "",
        expertise: "",
    });

    const [studentList, setStudentList] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedData) {
            setStudentList(JSON.parse(storedData));
        }
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(studentList));
        }
    }, [studentList, isMounted]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        const { name, contact, required, domain, expertise } = formData;
        if (!name || !contact || !required || !domain || !expertise) return;

        const newEntry = [name, domain, contact, required, expertise];
        setStudentList((prevList) => [...prevList, newEntry]);
        setFormData({ name: "", contact: "", required: "", domain: "", expertise: "" });

    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredList = studentList.filter(([name, domain, WhatsApp, required, expertise]) => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
            name.toLowerCase().includes(lowerSearch) ||
            domain.toLowerCase().includes(lowerSearch) ||
            expertise.toLowerCase().includes(lowerSearch) ||
            WhatsApp.toLowerCase().includes(lowerSearch)
        );
    });

    const contentMap = {
        "Available List": (
            <div>
                <div className="flex justify-between">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by Name, Domain or Expertise"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="border px-3 py-2 rounded w-96 max-w-xl"
                        />
                    </div>
                    <div>
                        <InviteMembers />
                    </div>
                </div>
                <DataTable
                    columns={["Student Name", "Domain", "Contact", "Members Required", "Expertise"]}
                    data={filteredList}
                    noDataMessage="No matching entries found"
                />
            </div>
        ),
        "New Form": (
            <>
                <div className="bg-[#1F3F6A] text-white text-xl font-medium px-2 py-1 h-10">
                    New Form
                </div>
                <div className="w-full mx-auto mt-10 border p-6 shadow-md rounded-lg">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-96 border-b border-gray-300 outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">WhatsApp Number</label>
                            <input
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                className="w-96 border-b border-gray-300 outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Students Req in Group</label>
                            <input
                                type="number"
                                name="required"
                                min="0"
                                max="3"
                                value={formData.required}
                                onChange={handleChange}
                                className="w-96 border-b border-gray-300 outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Domain</label>
                            <input
                                type="text"
                                name="domain"
                                value={formData.domain}
                                onChange={handleChange}
                                className="w-96 border-b border-gray-300 outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Expertise</label>
                            <input
                                type="text"
                                name="expertise"
                                value={formData.expertise}
                                onChange={handleChange}
                                placeholder="e.g., Frontend, Backend"
                                className="w-96 border-b border-gray-300 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleSubmit}
                            className="bg-[#1F3F6A] text-white px-6 py-2 rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </>
        ),
    };

    return isMounted ? (
        <PageLayout
            initialActiveTab="Available List"
            tabs={["Available List", "New Form"]}
            contentMap={contentMap}
        />
    ) : null;
};

export default GroupFormation;
