import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IdeaSelection from "./pages/IdeaSelection";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/idea-selection" element={<IdeaSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
