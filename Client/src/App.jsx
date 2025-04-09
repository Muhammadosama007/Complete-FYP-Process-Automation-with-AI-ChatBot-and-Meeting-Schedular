import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import IdeaSelection from "./pages/IdeaSelection";
import GroupFormation from "./pages/GroupFormation";
import AdvisorHome from "./pages/AdvisorHome";
import ProjectList from "./pages/ProjectList";
import ProjectDetail from "./pages/ProjectDetail";
import Registration from "./pages/Registration";
import Requests from "./pages/Requests";
import AdvisorSelection from "./pages/AdvisorSelection";
import PoDashboard from "./pages/projectOffice/PoDashboard";
import BSSEProjects from "./pages/projectOffice/BSSEProjects";
import CurrentProjects from "./pages/projectOffice/CurrentProjects";
function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/idea-selection" element={<IdeaSelection />} />
        <Route path="/group-formation" element={<GroupFormation />} />
        <Route path="/advisor" element={< AdvisorSelection />} />


        <Route path="/advisor/dashboard" element={<AdvisorHome />} />
        <Route path="/advisor/projects" element={<ProjectList />} />
        <Route path="/advisor/projects/:id" element={<ProjectDetail />} />
        <Route path="/advisor/registration" element={<Registration />} />
        <Route path="/advisor/requests" element={<Requests />} />


        <Route path="/po/dashboard" element={<PoDashboard />} />
        <Route path="/po/bsse" element={<BSSEProjects />} />
        <Route path="/po/bsse/current-projects" element={<CurrentProjects />} />
      </Routes>
    </Router>
  );
}

export default App;
