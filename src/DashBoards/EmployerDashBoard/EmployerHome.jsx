import { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function EmployerHome() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, "employer", uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) setProfile(snap.data());
    };
    fetchProfile();
  }, [uid]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("employerAuth");
    navigate("/employer");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
      {profile ? (
        <>
          <Typography variant="h4" sx={{ mt: 2 }}>Welcome, {profile.email} 🎉</Typography>
          <Typography variant="body1">This is your personal employer dashboard.</Typography>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
}
