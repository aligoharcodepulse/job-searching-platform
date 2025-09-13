import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import EmployeeLogin from "./components/EmployeeLogin";
import CandidateLogin from "./components/CandidateLogin";
import AdminHome from "./DashBoards/AdminDashBoard/AdminHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/employee" element={<EmployeeLogin />} />
        <Route path="/candidate" element={<CandidateLogin />} />

        <Route path="/admin-dashboard" element={<AdminHome />} />
      </Routes>
    </Router>
  );
}

export default App;
