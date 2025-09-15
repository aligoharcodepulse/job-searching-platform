import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin"); 
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate(`/admin-dashboard`)} 
        >
          JobSphere Admin
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to={`/admin-dashboard`}>
            Home
          </Button>
          <Button color="inherit" component={Link} to={`/admin-dashboard/requests`}>
            Employer Verification
          </Button>
          <Button color="inherit" component={Link} to={`/admin-dashboard/messages`}>
            Messgaes Recieved
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
