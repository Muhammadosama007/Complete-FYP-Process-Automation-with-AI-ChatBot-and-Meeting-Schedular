import React, { useState } from "react";

const sampleStudents = [
    { id: 1, name: "John Doe", email: "john@example.com", image: "/path/to/image1.jpg" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", image: "/path/to/image2.jpg" },
    { id: 3, name: "Sam Brown", email: "sam@example.com", image: "/path/to/image3.jpg" },
    { id: 4, name: "Chris Johnson", email: "chris@example.com", image: "/path/to/image4.jpg" },
];

const InviteMembers = () => {
    const [invitedMembers, setInvitedMembers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const handleInvite = (student) => {
        setInvitedMembers((prevList) => [...prevList, student]);
    };

    const filteredStudents = sampleStudents.filter(
        (student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex gap-2 mb-4">
                {invitedMembers.map((member, index) => (
                    <div key={index} className="relative">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-12 h-12 rounded-full border-2 border-white"
                        />
                    </div>
                ))}
                <div
                    onClick={toggleModal}
                    className="w-12 h-12 rounded-full flex justify-center items-center bg-blue-950 text-white cursor-pointer"
                >
                    <span className="text-2xl pb-1">+</span>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <div className="mb-4">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search by Name or Email"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                            {filteredStudents.length === 0 ? (
                                <p>No results found</p>
                            ) : (
                                filteredStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between p-2 border-b hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleInvite(student)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={student.image}
                                                alt={student.name}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <span>{student.name}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">{student.email}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={toggleModal}
                                className="bg-gray-300 text-black px-4 py-2 rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InviteMembers;
