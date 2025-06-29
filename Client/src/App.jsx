import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";


import Home from "./pages/student/Home";
import IdeaSelection from "./pages/student/IdeaSelection";
import GroupFormation from "./pages/student/GroupFormation";
import AdvisorSelection from "./pages/student/AdvisorSelection";
import StudentProfilePage from "./pages/student/sidebar/StudentProfilePage";
import FeedbackPage from "./pages/student/sidebar/FeedbackPage";
import MeetingSchedulePage from "./pages/student/sidebar/MeetingSchedulePage";
import StudentNotifications from "./pages/student/sidebar/StudentNotifications";

import AdvisorHome from "./pages/advisor/AdvisorHome";
import ProjectList from "./pages/advisor/ProjectList";
import ProjectDetail from "./pages/advisor/ProjectDetail";
import Registration from "./pages/advisor/Registration";
import Requests from "./pages/advisor/Requests";


import PoDashboard from "./pages/projectOffice/PoDashboard";
import BSSEProjects from "./pages/projectOffice/BSSEProjects";
import CurrentProjects from "./pages/projectOffice/CurrentProjects";
//import PastProjects from "./pages/projectOffice/PastProjects";
import IdeaSelectionPhase from "./pages/projectOffice/phases/IdeaSelectionPhase";
import PresentationsPhase from "./pages/projectOffice/phases/PresentationsPhase";
import ProposalPhase from "./pages/projectOffice/phases/ProposalPhase";
import RSPhase1 from "./pages/projectOffice/phases/RSPhase1";
import SDSPhase2 from "./pages/projectOffice/phases/SDSPhase2";
import DTSPhase3 from "./pages/projectOffice/phases/DTSPhase3";
import FinalPhase4 from "./pages/projectOffice/phases/FinalPhase4";
import SubmissionDetail from "./pages/projectOffice/SubmissionDetail";


import StudentLayout from "./layout/studentLayout";
import AdvisorLayout from "./layout/advisorLayout";
import ProjectOfficeLayout from "./layout/poLayout";

import AcceptInvitation from "./pages/AcceptInvitation";
import BSCSProjects from "./pages/projectOffice/BSCSProjects";
import BSITProjects from "./pages/projectOffice/BSITProjects";
import PastProjects from "./pages/projectOffice/PastProjects";



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
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="scheduled-meetings" element={<MeetingSchedulePage />} />
          <Route path="notifications" element={<StudentNotifications />} />

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
          <Route path="dashboard/bscs" element={<BSCSProjects/>}/>
          <Route path="dashboard/bsit" element={<BSITProjects/>}/>
          <Route path="/po/dashboard/:dept/current-projects" element={<CurrentProjects />} />
          {/* <Route path="dashboard/bsse/past-projects" element={<PastProjects />} /> */}
          <Route path="dashboard/:dept/current-projects/idea-selection" element={<IdeaSelectionPhase />} />
          <Route path="dashboard/:dept/current-projects/presentations" element={<PresentationsPhase />} />
          <Route path="dashboard/:dept/current-projects/proposal" element={<ProposalPhase />} />
          <Route path="dashboard/:dept/current-projects/rs-phase1" element={<RSPhase1 />} />
          <Route path="dashboard/:dept/current-projects/sds-phase2" element={<SDSPhase2 />} />
          <Route path="/po/dashboard/:dept/current-projects/dts-phase3" element={<DTSPhase3 />} />
          <Route path="dashboard/:dept/current-projects/final-phase4" element={<FinalPhase4 />} />
          <Route path="dashboard/:dept/current-projects/:phase/:id" element={<SubmissionDetail />} />
          <Route path="/po/dashboard/:dept/past-projects" element={<PastProjects />} />

        </Route>

        <Route path="/accept-invite" element={<AcceptInvitation />} />
      </Routes>
    </Router>
  );
}

export default App;
