import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import IdeaSelection from "./pages/IdeaSelection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/idea-selection" element={<IdeaSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
