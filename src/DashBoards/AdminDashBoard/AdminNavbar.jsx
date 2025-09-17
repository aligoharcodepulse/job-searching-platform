import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    navigate("/admin");
  };

  const menuItems = [
    { label: "Home", path: "/admin-dashboard" },
    { label: "Employer Verification", path: "/admin-dashboard/requests" },
    { label: "Messages Received", path: "/admin-dashboard/messages" },
  ];

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/admin-dashboard")}
        >
          JobSphere Admin
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
