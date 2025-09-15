import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EmployerNavbar() {
  const navigate = useNavigate();
  const { uid } = useParams();

  const handleLogout = () => {
    localStorage.removeItem("candidateAuth");
    navigate("/candidate"); 
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "secondary.main" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate(`/candidate-dashboard/${uid}`)}
        >
          JobSphere Candidate
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to={`/candidate-dashboard/${uid}`}>
            Home
          </Button>
          <Button color="inherit" component={Link} to={`/candidate-dashboard/${uid}/about`}>
            About
          </Button>
          <Button color="inherit" component={Link} to={`/candidate-dashboard/${uid}/contact`}>
            Contact
          </Button>
          <Button color="inherit" component={Link} to={`/candidate-dashboard/${uid}/support`}>
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
