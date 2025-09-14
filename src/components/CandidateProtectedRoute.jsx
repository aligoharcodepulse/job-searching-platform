import { Navigate, useParams } from "react-router-dom";

export default function CandidateProtectedRoute({ children }) {
  const { uid } = useParams();
  const loggedInUser = localStorage.getItem("candidateAuth");

  return loggedInUser === uid ? children : <Navigate to="/candidate" />;
}
