import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import EmployerLogin from "./components/EmployerLogin";
import CandidateLogin from "./components/CandidateLogin";
import AdminHome from "./DashBoards/AdminDashBoard/AdminHome";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployerProtectedRoute from "./components/EmployerProtectedRoute";
import EmployerHome from "./DashBoards/EmployerDashBoard/EmployerHome";
import CandidateHome from "./DashBoards/CandidateDashBoard/CandidateHome";
import CandidateProtectedRoute from "./components/CandidateProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route path="/employer" element={<EmployerLogin />} />
        <Route
          path="/employer-dashboard/:uid"
          element={
            <EmployerProtectedRoute>
              <EmployerHome />
            </EmployerProtectedRoute>
          }
        />
        <Route path="/candidate" element={<CandidateLogin />} />
        <Route
          path="/candidate-dashboard/:uid"
          element={
            <CandidateProtectedRoute>
              <CandidateHome />
            </CandidateProtectedRoute>
          }
        />

        <Route path="/admin-dashboard" element={<AdminHome />} />
      </Routes>
    </Router>
  );
}

export default App;
