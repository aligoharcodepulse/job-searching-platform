import { Typography, Box, Button } from "@mui/material";  // <-- Button imported
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin"); 
  };

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome,  Admin 🎉
      </Typography>
      <Typography variant="body1">
        This is your Admin Dashboard. From here, you can manage jobs, employees, and candidates.
      </Typography>
    </Box>
  );
}
