import { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "../../components/PageLayout";
import DataTable from "../../components/DataTable";
import InviteMembers from "../../components/InviteMembers";

const GroupFormation = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    required: "",
    domain: "",
    expertise: "",
  });

  const [studentList, setStudentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all entries from the backend on mount
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/group-formation");
        const formatted = response.data.map((entry) => [
          entry.name,
          entry.domain,
          entry.contact,
          entry.required,
          entry.expertise,
        ]);
        setStudentList(formatted);
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name, contact, required, domain, expertise } = formData;
    if (!name || !contact || !required || !domain || !expertise) return;

    try {
      const response = await axios.post("http://localhost:3002/api/group-formation", {
        name,
        contact,
        required,
        domain,
        expertise,
      });

      const newEntry = [
        response.data.data.name,
        response.data.data.domain,
        response.data.data.contact,
        response.data.data.required,
        response.data.data.expertise,
      ];

      setStudentList((prevList) => [newEntry, ...prevList]);
      setFormData({ name: "", contact: "", required: "", domain: "", expertise: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredList = studentList.filter(([name, domain, contact, required, expertise]) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      name.toLowerCase().includes(lowerSearch) ||
      domain.toLowerCase().includes(lowerSearch) ||
      expertise.toLowerCase().includes(lowerSearch) ||
      contact.toLowerCase().includes(lowerSearch)
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
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataTable
            columns={["Student Name", "Domain", "Contact", "Members Required", "Expertise"]}
            data={filteredList}
            noDataMessage="No matching entries found"
          />
        )}
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

  return (
    <PageLayout
      initialActiveTab="Available List"
      tabs={["Available List", "New Form"]}
      contentMap={contentMap}
    />
  );
};

export default GroupFormation;
