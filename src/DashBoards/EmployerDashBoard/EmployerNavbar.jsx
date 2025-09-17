import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function EmployerNavbar() {
  const navigate = useNavigate();
  const { uid } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("employerAuth");
    navigate("/employer");
  };

  const menuItems = [
    { label: "Home", path: `/employer-dashboard/${uid}` },
    { label: "About", path: `/employer-dashboard/${uid}/about` },
    { label: "Contact", path: `/employer-dashboard/${uid}/contact` },
    { label: "Support", path: `/employer-dashboard/${uid}/support` },
  ];

  return (
    <AppBar position="static" sx={{ bgcolor: "success.main" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate(`/employer-dashboard/${uid}`)}
        >
          JobSphere Employer
        </Typography>

        {/* Large screen buttons */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {menuItems.map((item) => (
            <Button key={item.label} color="inherit" component={Link} to={item.path}>
              {item.label}
            </Button>
          ))}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        {/* Small screen menu icon */}
        <IconButton
          sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 200 }} role="presentation" onClick={() => setDrawerOpen(false)}>
            <List>
              {menuItems.map((item) => (
                <ListItem button key={item.label} component={Link} to={item.path}>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
