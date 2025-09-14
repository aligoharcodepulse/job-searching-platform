import { Navigate, useParams } from "react-router-dom";

export default function EmployerProtectedRoute({ children }) {
  const { uid } = useParams();
  const loggedInUser = localStorage.getItem("employerAuth");

  return loggedInUser === uid ? children : <Navigate to="/employer" />;
}
