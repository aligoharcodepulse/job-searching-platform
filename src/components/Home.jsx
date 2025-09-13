import { AppBar, Toolbar, Typography, Button, Box, Container, Grid } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useNavigate } from "react-router-dom";
import BadgeIcon from '@mui/icons-material/Badge';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{width:"100vw"}}>
      {/* Navbar */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Container maxWidth="lg"> 
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <WorkOutlineIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6" fontWeight="bold">
                JobSphere
              </Typography>
            </Box>

            {/* Buttons */}
            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ mx: 1, borderRadius: 1 }}
                onClick={() => navigate("/admin")}
              >
                <AdminPanelSettingsIcon sx={{ mr: 1 }} />
                Admin Login
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{ mx: 1, borderRadius: 1 }}
                onClick={() => navigate("/employee")}
              >
                <BadgeIcon sx={{ mr: 1 }} />
                Employee Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mx: 1, borderRadius: 1 }}
                onClick={() => navigate("/candidate")}
              >
                <PersonIcon sx={{ mr: 1 }} />
                Candidate Login
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center", 
          alignItems:"center" ,// ✅ centers hero block
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            {/* Text Content */}
            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Find the Right Job,
              </Typography>
              <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
                Hire the Best Talent
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                Transform your career journey and hiring process with our job platform. 
                Whether you're an employer, a candidate, or an admin – everything you need is here.
              </Typography>
            </Grid>

            {/* Image */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/hero-banner.jpg"
                alt="Career growth"
                sx={{ width: "100%", borderRadius: 3, boxShadow: 4 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

