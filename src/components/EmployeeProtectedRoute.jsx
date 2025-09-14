import { Navigate, useParams } from "react-router-dom";

export default function EmployeeProtectedRoute({ children }) {
  const { uid } = useParams();
  const loggedInUser = localStorage.getItem("employeeAuth");

  return loggedInUser === uid ? children : <Navigate to="/employee" />;
}
