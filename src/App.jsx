import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import EmployeeLogin from "./components/EmployeeLogin";
import CandidateLogin from "./components/CandidateLogin";
import AdminHome from "./DashBoards/AdminDashBoard/AdminHome";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployeeProtectedRoute from "./components/EmployeeProtectedRoute";
import EmployeeHome from "./DashBoards/EmployeeDashBoard/EmployeeHome";
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
        <Route path="/employee" element={<EmployeeLogin />} />
        <Route
          path="/employee-dashboard/:uid"
          element={
            <EmployeeProtectedRoute>
              <EmployeeHome />
            </EmployeeProtectedRoute>
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
