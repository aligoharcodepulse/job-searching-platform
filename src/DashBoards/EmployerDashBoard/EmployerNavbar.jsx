import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EmployerNavbar() {
  const navigate = useNavigate();
  const { uid } = useParams(); // ✅ get employer id from URL

  const handleLogout = () => {
    localStorage.removeItem("employerAuth");
    navigate("/employer"); // ✅ go back to employer login
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate(`/employer-dashboard/${uid}`)} // ✅ stay in employer dashboard
        >
          JobSphere Employer
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to={`/employer-dashboard/${uid}`}>
            Home
          </Button>
          <Button color="inherit" component={Link} to={`/employer-dashboard/${uid}/about`}>
            About
          </Button>
          <Button color="inherit" component={Link} to={`/employer-dashboard/${uid}/contact`}>
            Contact
          </Button>
          <Button color="inherit" component={Link} to={`/employer-dashboard/${uid}/employer-support`}>
            Support
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
