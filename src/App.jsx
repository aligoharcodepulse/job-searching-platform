import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
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
import EmployerNavbar from "./DashBoards/EmployerDashBoard/EmployerNavbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Support from "./components/Support"
import AdminNavbar from "./DashBoards/AdminDashBoard/AdminNavbar";
import Messages from "./DashBoards/AdminDashBoard/Messages";
import CandidateNavbar from "./DashBoards/CandidateDashBoard/CandidateNavbar"

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
              <>
                <AdminNavbar />
                <Outlet />
              </>
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="messages" element={<Messages />} />
        </Route>



        <Route path="/employer" element={<EmployerLogin />} />
        <Route
          path="/employer-dashboard/:uid"
          element={
            <EmployerProtectedRoute>
              <>
                <EmployerNavbar />
                <Outlet />
              </>
            </EmployerProtectedRoute>
          }
        >
          <Route index element={<EmployerHome />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="support" element={<Support />} />
        </Route>


        <Route path="/candidate" element={<CandidateLogin />} />
        <Route
          path="/candidate-dashboard/:uid"
          element={
            <CandidateProtectedRoute>
              <>
                <CandidateNavbar />
                <Outlet />
              </>
            </CandidateProtectedRoute>
          }
        >
          <Route index element={<CandidateHome />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
