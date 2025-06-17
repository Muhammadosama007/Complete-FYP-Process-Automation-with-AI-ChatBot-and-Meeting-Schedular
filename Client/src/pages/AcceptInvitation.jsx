import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const alreadyCalled = useRef(false);
  const [status, setStatus] = useState('Processing your invitation...');

  useEffect(() => {
    const acceptInvite = async () => {
      if (alreadyCalled.current) return;
      alreadyCalled.current = true;

      const projectId = searchParams.get('projectId');
      const userId = searchParams.get('userId');

      if (!projectId || !userId) {
        setStatus('Invalid invitation link. Missing parameters.');
        setTimeout(() => navigate('/student/dashboard'), 5000);
        return;
      }

      try {
        const res = await axios.post('http://localhost:3002/api/team/accept-invite', {
          projectId,
          userId,
        });

        setStatus(res.data.message || 'Invitation accepted!');
        setTimeout(() => navigate('/student/dashboard'), 2000);
      } catch (error) {
        console.error(error);
        setStatus(error.response?.data?.message || 'Failed to accept invitation.');
        setTimeout(() => navigate('/student/dashboard'), 3000);
      }
    };

    acceptInvite();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm w-full">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{status}</h2>
        <p className="text-sm text-gray-500 mt-2">You will be redirected shortly...</p>
      </div>
    </div>
  );
};

export default AcceptInvitation;
