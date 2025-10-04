import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, Avatar, Chip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShieldAlt, faEnvelope, faSignOutAlt, faBars, faTimes, faCrown } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    navigate("/admin");
  };

  const menuItems = [
    { label: "Home", path: "/admin-dashboard", icon: faHome },
    { label: "Employer Verification", path: "/admin-dashboard/requests", icon: faShieldAlt },
    { label: "Messages Received", path: "/admin-dashboard/messages", icon: faEnvelope },
  ];

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          background: scrolled ? "var(--card-bg)" : "rgba(20, 20, 20, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--shadow-lg)",
          transition: "all 0.3s ease"
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              flexGrow: 1, 
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": { transform: "scale(1.02)" }
            }}
            onClick={() => navigate("/admin-dashboard")}
          >
            <Avatar
              sx={{
                background: "var(--gradient-accent)",
                mr: 2,
                width: 40,
                height: 40
              }}
            >
              <FontAwesomeIcon icon={faCrown} style={{ fontSize: "1.2rem" }} />
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{ 
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  fontSize: "1.2rem"
                }}
              >
                JobSphere
              </Typography>
              <Chip
                label="Admin"
                size="small"
                sx={{
                  background: "var(--gradient-accent)",
                  color: "#ffffff",
                  fontSize: "0.75rem",
                  height: "20px"
                }}
              />
            </Box>
          </Box>

          {/* Large screen buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {menuItems.map((item) => (
              <Button 
                key={item.label} 
                component={Link} 
                to={item.path}
                sx={{
                  color: "var(--text-primary)",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "var(--glass-bg)",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                <FontAwesomeIcon 
                  icon={item.icon} 
                  style={{ marginRight: "8px" }} 
                />
                {item.label}
              </Button>
            ))}
            <Button 
              onClick={handleLogout}
              sx={{
                background: "var(--gradient-primary)",
                color: "#ffffff",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: "12px",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "var(--danger-color)",
                  transform: "translateY(-2px)"
                }
              }}
            >
              <FontAwesomeIcon 
                icon={faSignOutAlt} 
                style={{ marginRight: "8px" }} 
              />
              Logout
            </Button>
          </Box>

          {/* Small screen menu icon */}
          <IconButton
            sx={{ 
              display: { xs: "flex", md: "none" }, 
              color: "var(--text-primary)",
              background: "var(--glass-bg)",
              borderRadius: "12px",
              "&:hover": {
                background: "var(--glass-border)"
              }
            }}
            onClick={() => setDrawerOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            background: "var(--card-bg)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--glass-border)",
            width: 280
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: "var(--text-primary)",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700
              }}
            >
              Admin Panel
            </Typography>
            <IconButton 
              onClick={() => setDrawerOpen(false)}
              sx={{ color: "var(--text-primary)" }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                key={item.label}
                component={Link}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  borderRadius: "12px",
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "var(--glass-bg)"
                  }
                }}
              >
                <FontAwesomeIcon 
                  icon={item.icon} 
                  style={{ marginRight: "12px", color: "var(--accent-color)" }} 
                />
                <ListItemText 
                  primary={item.label}
                  sx={{
                    "& .MuiTypography-root": {
                      color: "var(--text-primary)",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500
                    }
                  }}
                />
              </ListItem>
            ))}
            <ListItem 
              onClick={() => {
                handleLogout();
                setDrawerOpen(false);
              }}
              sx={{
                borderRadius: "12px",
                mt: 2,
                background: "var(--gradient-primary)",
                cursor: "pointer",
                "&:hover": {
                  background: "var(--danger-color)"
                }
              }}
            >
              <FontAwesomeIcon 
                icon={faSignOutAlt} 
                style={{ marginRight: "12px", color: "#ffffff" }} 
              />
              <ListItemText 
                primary="Logout"
                sx={{
                  "& .MuiTypography-root": {
                    color: "#ffffff",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600
                  }
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}