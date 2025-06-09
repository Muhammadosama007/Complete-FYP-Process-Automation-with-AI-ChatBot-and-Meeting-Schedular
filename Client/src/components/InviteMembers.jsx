import React, { useState } from 'react';
import axios from 'axios';

const InviteMembers = ({ projectId, inviterId }) => {
  const [email, setEmail] = useState('');

 const handleInvite = async () => {
  const currentUser = JSON.parse(localStorage.getItem("googleUser")); 

  const inviterId = currentUser?._id;
  const projectId = currentUser?.projectId; 

  console.log({ email, projectId, inviterId }); 

  try {
    await axios.post("http://localhost:3002/api/team/invite", {
      email,
      projectId,
      inviterId,
    });
    alert("Invitation sent!");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Failed to send invitation.");
  }
};

  return (
    <div>
      <input
        type="email"
        placeholder="Enter member's email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleInvite}>Invite</button>
    </div>
  );
};

export default InviteMembers;
