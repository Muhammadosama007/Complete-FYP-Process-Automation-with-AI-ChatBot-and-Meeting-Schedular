import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumb";
import Cards from "../../components/Cards";
import ChatButton from "../../components/ChatButton";
import background from "../../assets/images/bg.jpg";

const bgColor = "#1F3F6A";

const semester6Cards = [
  { title: "Idea Selection", text: "Brainstorm and finalize your project idea.", path: "/student/idea-selection" },
  { title: "Group Formation", text: "Form your project group and collaborate.", path: "/student/group-formation" },
  { title: "Advisor Selection", text: "Manage project documentation with your advisor.", path: "/student/advisor" },
];

const semester7Cards = [
  { title: "Proposal Submission", text: "Submit your project proposal for approval.", path: "/proposal-submission" },
  { title: "Research Work", text: "Conduct research and collect data for your project.", path: "/research-work" },
];

const semester8Cards = [
  { title: "Final Report", text: "Prepare and submit your final project report.", path: "/final-report" },
  { title: "Presentation", text: "Get ready for the final project defense.", path: "/presentation" },
];

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const localUser = localStorage.getItem("googleUser");

    if (!localUser) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const userId = JSON.parse(localUser)._id;

    // Fetch accepted members
    axios
      .get(`http://localhost:3002/api/users/accepted-members?userId=${userId}`)
      .then((res) => {
        setMembers(res.data.members);
      })
      .catch((err) => {
        console.error("Error fetching accepted members:", err.message);
      });

    // Fetch user data
    axios
      .get("http://localhost:3002/api/users/get")
      .then((response) => {
        const data = response.data;

        setStudent({
          name: data.name || "John Doe",
          rollNo: data.rollNo || "21F-1234",
          faculty: data.faculty || "Computer Science",
          semester: data.semester || 6,
          creditHours: data.creditHours || 92,
          gpa: data.gpa || 3.5,
          cgpa: data.cgpa || 3.6,
          profilePic: data.image || background,
          projectStanding: data.projectStanding || 0,
        });

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch user data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  // Determine cards to display based on semester and creditHours
  let displayedCards = [];
  if (student.semester === 6 && student.creditHours >= 90) {
    displayedCards = semester6Cards;
  } else if (student.semester === 7) {
    displayedCards = semester7Cards;
  } else if (student.semester === 8) {
    displayedCards = semester8Cards;
  }

  return (
    <div className={`flex-1 transition-all duration-300 ease-in-out pt-4 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
      <div className="mt-10">
        <Breadcrumb exclude={["student"]} bgColor={bgColor} />
      </div>

      <div className="flex flex-col md:flex-row items-start mt-4">
        <div className="flex items-center">
          <img
            src={student.profilePic}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover mr-4 ml-4"
          />
          <div>
            <p className="text-gray-800 font-semibold">{student.name}</p>
            <p className="text-gray-600">Roll No: {student.rollNo}</p>
            <p className="text-gray-600">Faculty: {student.faculty}</p>
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:ml-16 flex flex-grow justify-evenly">
          <div className="text-gray-700">
            <h2 className="font-semibold">Project Standings</h2>
            <p className="text-sm text-gray-500">Project Completion: {student.projectStanding}%</p>
          </div>
          <div className="text-gray-700">
            <h2 className="font-semibold">Earned Credit Hours</h2>
            <p className="text-sm text-gray-500">Total: {student.creditHours}</p>
          </div>
          <div className="text-gray-700">
            <h2 className="font-semibold">Academic Standings</h2>
            <p className="text-sm text-gray-500">GPA: {student.gpa}</p>
            <p className="text-sm text-gray-500">CGPA: {student.cgpa}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 px-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Accepted Project Members</h3>
        {members.length === 0 ? (
          <p className="text-gray-600">No members have joined your project yet.</p>
        ) : (
          <ul className="list-disc pl-5 text-gray-700">
            {members.map((member) => (
              <li key={member._id}>
                {member.name} (ID: {member._id}) (Email: {member.email})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="px-4">
        <Cards bgColor={bgColor} cardData={displayedCards} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      <ChatButton bgColor={bgColor} />
    </div>
  );
};

export default Home;
