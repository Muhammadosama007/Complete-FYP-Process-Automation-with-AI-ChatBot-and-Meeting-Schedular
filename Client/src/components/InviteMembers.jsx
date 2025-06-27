import React, { useState } from "react";
import axios from "axios";

const InviteMembers = () => {
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const toggleModal = () => {
    setEmail("");
    setIsModalOpen(!isModalOpen);
  };

  const handleInvite = async () => {
    const currentUser = JSON.parse(localStorage.getItem("googleUser"));
    const inviterId = currentUser?._id;
    const projectId = currentUser?.projectId;

    if (!email || !inviterId || !projectId) {
      alert("Missing required data.");
      return;
    }

    try {
      await axios.post("http://localhost:3002/api/team/invite", {
        email,
        projectId,
        inviterId,
      });

      setInvitedMembers((prev) => [
        ...prev,
        {
          email,
          image: `https://ui-avatars.com/api/?name=${email.charAt(0)}&background=random`,
        },
      ]);
      alert("Invitation sent!");
      toggleModal();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to send invitation.");
    }
  };

  return (
    <div>
      {/* Avatars + "+" Button */}
      <div className="flex gap-2 mb-4">
        {invitedMembers.map((member, index) => (
          <div key={index} className="relative">
            <img
              src={member.image}
              alt={member.email}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-3">Invite by Email</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={toggleModal}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteMembers;
