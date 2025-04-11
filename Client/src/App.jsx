import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";


import Home from "./pages/student/Home";
import IdeaSelection from "./pages/student/IdeaSelection";
import GroupFormation from "./pages/student/GroupFormation";
import AdvisorSelection from "./pages/student/AdvisorSelection";


import AdvisorHome from "./pages/advisor/AdvisorHome";
import ProjectList from "./pages/advisor/ProjectList";
import ProjectDetail from "./pages/advisor/ProjectDetail";
import Registration from "./pages/advisor/Registration";
import Requests from "./pages/advisor/Requests";


import PoDashboard from "./pages/projectOffice/PoDashboard";
import BSSEProjects from "./pages/projectOffice/BSSEProjects";
import CurrentProjects from "./pages/projectOffice/CurrentProjects";


import StudentLayout from "./layout/studentLayout";
import AdvisorLayout from "./layout/advisorLayout";
import ProjectOfficeLayout from "./layout/poLayout";
import StudentProfilePage from "./pages/student/StudentProfilePage";

function App() {
  return (
    <Router>
      <Routes>


        <Route path="/" element={<Signup />} />


        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<Home />} />
          <Route path="idea-selection" element={<IdeaSelection />} />
          <Route path="group-formation" element={<GroupFormation />} />
          <Route path="advisor" element={<AdvisorSelection />} />
          <Route path="profile" element={<StudentProfilePage />} />

        </Route>


        <Route path="/advisor" element={<AdvisorLayout />}>
          <Route path="dashboard" element={<AdvisorHome />} />
          <Route path="dashboard/projects" element={<ProjectList />} />
          <Route path="dashboard/projects/:id" element={<ProjectDetail />} />
          <Route path="dashboard/registration" element={<Registration />} />
          <Route path="dashboard/requests" element={<Requests />} />
        </Route>


        <Route path="/po" element={<ProjectOfficeLayout />}>
          <Route path="dashboard" element={<PoDashboard />} />
          <Route path="dashboard/bsse" element={<BSSEProjects />} />
          <Route path="dashboard/bsse/current-projects" element={<CurrentProjects />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
