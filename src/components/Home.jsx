import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faShieldAlt,
  faUser,
  faSearch,
  faBuilding,
  faUsers,
  faChartLine,
  faRocket,
  faArrowRight,
  faPlay,
  faTrophy,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: faSearch,
      title: "Smart Job Matching",
      description:
        "AI-powered job recommendations based on your skills and preferences",
    },
    {
      icon: faBuilding,
      title: "Top Companies",
      description:
        "Connect with leading companies and startups in your industry",
    },
    {
      icon: faUsers,
      title: "Professional Network",
      description: "Build meaningful connections with industry professionals",
    },
    {
      icon: faChartLine,
      title: "Career Growth",
      description: "Track your progress and advance your career with our tools",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Jobs" },
    { number: "5K+", label: "Companies" },
    { number: "50K+", label: "Job Seekers" },
    { number: "95%", label: "Success Rate" },
  ];

  return (
    <div style={{ width: "100vw", background: "var(--gradient-bg)" }}>
      {/* Enhanced Navbar */}
      <AppBar
        position="fixed"
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        sx={{
          background: scrolled ? "var(--glass-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--glass-border)" : "none",
          boxShadow: scrolled ? "var(--shadow-lg)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
          >
            {/* Enhanced Logo */}
            <Box
              sx={{ display: "flex", alignItems: "center" }}
              className="animate-fadeInLeft"
            >
              <Box
                sx={{
                  background: "var(--gradient-primary)",
                  borderRadius: "12px",
                  p: 1,
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faBriefcase}
                  style={{ color: "white", fontSize: "1.5rem" }}
                />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 800,
                  background: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                JobSphere
              </Typography>
            </Box>

            {/* Enhanced Login Buttons */}
            <Box
              sx={{ display: "flex", gap: 2 }}
              className="animate-fadeInRight"
            >
              <Button
                className="btn btn-glass"
                onClick={() => navigate("/admin")}
                sx={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  style={{ marginRight: "8px", color: "#ffffff" }}
                />
                Admin Panel
              </Button>
              <Button
                className="btn btn-secondary"
                onClick={() => navigate("/employer")}
                sx={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #059669 0%, #047857 100%)",
                    color: "#ffffff",
                    transform: "translateY(-2px)",
                    boxShadow:
                      "0 8px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(16, 185, 129, 0.4)",
                  },
                }}
              >
                <FontAwesomeIcon
                  icon={faBuilding}
                  style={{ marginRight: "8px", color: "#ffffff" }}
                />
                For Employers
              </Button>
              <Button
                className="btn btn-primary"
                onClick={() => navigate("/candidate")}
                sx={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
                    color: "#ffffff",
                    transform: "translateY(-2px)",
                    boxShadow:
                      "0 8px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(99, 102, 241, 0.4)",
                  },
                }}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ marginRight: "8px", color: "#ffffff" }}
                />
                For Job Seekers
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box className="hero" sx={{ position: "relative", overflow: "hidden" }}>
        {/* Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
            radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
          `,
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            {/* Enhanced Text Content */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box className="animate-fadeInLeft">
                <Typography
                  className="heading-1"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    mb: 2,
                  }}
                >
                  Find Your <span className="text-gradient">Dream Job</span>
                </Typography>
                <Typography
                  className="heading-2"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: { xs: "1.8rem", md: "2.5rem" },
                    fontWeight: 700,
                    background: "var(--gradient-secondary)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    mb: 3,
                  }}
                >
                  Build Your Future
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "var(--text-secondary)",
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                    mb: 4,
                    maxWidth: "500px",
                  }}
                >
                  Transform your career journey with our cutting-edge job
                  platform. Whether you're seeking opportunities or talent, we
                  connect the right people at the right time.
                </Typography>

                {/* CTA Buttons */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
                  <Button
                    className="btn btn-primary"
                    size="large"
                    onClick={() => navigate("/candidate")}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                      color: "#ffffff",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
                        color: "#ffffff",
                        transform: "translateY(-3px)",
                        boxShadow:
                          "0 12px 30px rgba(0, 0, 0, 0.4), 0 0 25px rgba(99, 102, 241, 0.5)",
                      },
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faRocket}
                      style={{ marginRight: "8px", color: "#ffffff" }}
                    />
                    Find Your Dream Job
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      style={{ marginLeft: "8px", color: "#ffffff" }}
                    />
                  </Button>
                  <Button
                    className="btn btn-glass"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      background: "rgba(255, 255, 255, 0.15)",
                      color: "#ffffff",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(15px)",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.25)",
                        color: "#ffffff",
                        border: "1px solid rgba(255, 255, 255, 0.4)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPlay}
                      style={{ marginRight: "8px", color: "#ffffff" }}
                    />
                    View Features
                  </Button>
                </Box>

                {/* Stats */}
                <Grid container spacing={3}>
                  {stats.map((stat, index) => (
                    <Grid size={{ xs: 6, md: 3 }} key={index}>
                      <Box
                        className="animate-fadeInUp"
                        sx={{ textAlign: "center" }}
                      >
                        <Typography
                          sx={{
                            fontSize: "2rem",
                            fontWeight: 800,
                            color: "var(--primary-color)",
                            fontFamily: "Poppins, sans-serif",
                          }}
                        >
                          {stat.number}
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--text-secondary)",
                            fontSize: "0.9rem",
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Enhanced Image Section */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                className="animate-fadeInRight"
                sx={{ position: "relative" }}
              >
                <Box
                  component="img"
                  src="/images/hero-banner.jpg"
                  alt="Career growth"
                  sx={{
                    width: "100%",
                    borderRadius: "var(--radius-xl)",
                    boxShadow: "var(--shadow-xl)",
                    border: "1px solid var(--glass-border)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "var(--shadow-xl), var(--shadow-glow)",
                    },
                  }}
                />
                {/* Floating Elements */}
                <Box
                  className="glass-card animate-pulse"
                  sx={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTrophy}
                    style={{ color: "var(--accent-color)" }}
                  />
                  <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
                    #1 Job Platform
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, background: "var(--secondary-bg)" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              className="heading-2 animate-fadeInUp"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Why Choose <span className="text-gradient">JobSphere</span>?
            </Typography>
            <Typography
              sx={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Discover the features that make us the leading platform for career
              growth and talent acquisition
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  className="card animate-fadeInUp"
                  sx={{
                    height: "100%",
                    background: "var(--card-bg)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "var(--radius-lg)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "var(--shadow-xl)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: "center" }}>
                    <Box
                      sx={{
                        background: "var(--gradient-primary)",
                        borderRadius: "12px",
                        p: 2,
                        display: "inline-flex",
                        mb: 2,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={feature.icon}
                        style={{ color: "white", fontSize: "1.5rem" }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        fontFamily: "Poppins, sans-serif",
                        color: "var(--primary-color)",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--text-secondary)",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Trusted Companies Section */}
      <Box sx={{ py: 6, background: "var(--primary-bg)" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              sx={{
                fontSize: "1.2rem",
                color: "var(--text-secondary)",
                mb: 3,
                fontWeight: 500,
              }}
            >
              Trusted by leading companies worldwide
            </Typography>
          </Box>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            {["Microsoft", "Google", "Apple", "Amazon", "Meta", "Netflix"].map(
              (company, index) => (
                <Grid size={{ xs: 6, sm: 4, md: 2 }} key={index}>
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 2,
                      px: 1,
                      opacity: 0.7,
                      transition: "opacity 0.3s ease",
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "var(--text-secondary)",
                        fontWeight: 600,
                        fontSize: "1rem",
                      }}
                    >
                      {company}
                    </Typography>
                  </Box>
                </Grid>
              )
            )}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, background: "var(--secondary-bg)" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              className="heading-2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 2,
              }}
            >
              What Our Users Say
            </Typography>
            <Typography
              sx={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Don't just take our word for it - hear from professionals who
              found success with JobSphere
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer",
                company: "TechCorp",
                rating: 5,
                text: "JobSphere helped me land my dream job at a leading tech company. The platform's AI matching was incredibly accurate!",
              },
              {
                name: "Michael Chen",
                role: "HR Director",
                company: "InnovateLab",
                rating: 5,
                text: "As an employer, I've found exceptional talent through JobSphere. The quality of candidates is outstanding.",
              },
              {
                name: "Emily Rodriguez",
                role: "Marketing Manager",
                company: "CreativeStudio",
                rating: 5,
                text: "The user experience is seamless, and the job recommendations are spot-on. Highly recommend JobSphere!",
              },
            ].map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card
                  className="card"
                  sx={{
                    height: "100%",
                    background: "var(--card-bg)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "var(--radius-lg)",
                    p: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "var(--shadow-xl)",
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", mb: 2 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          style={{
                            color: "var(--accent-color)",
                            marginRight: "4px",
                          }}
                        />
                      ))}
                    </Box>
                    <Typography
                      sx={{
                        color: "var(--text-primary)",
                        fontSize: "1rem",
                        lineHeight: 1.6,
                        mb: 3,
                        fontStyle: "italic",
                      }}
                    >
                      "{testimonial.text}"
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          background: "var(--gradient-primary)",
                          mr: 2,
                          width: 48,
                          height: 48,
                        }}
                      >
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            fontSize: "1rem",
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--text-secondary)",
                            fontSize: "0.9rem",
                          }}
                        >
                          {testimonial.role} at {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, background: "var(--primary-bg)" }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
            <Typography
              className="heading-2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Ready to Find Your{" "}
              <span className="text-gradient">Dream Job</span>?
            </Typography>
            <Typography
              sx={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              Join thousands of professionals who have transformed their careers
              with JobSphere. Your next opportunity is just a click away.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                className="btn btn-primary"
                size="large"
                onClick={() => navigate("/candidate")}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  color: "#ffffff",
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
                    color: "#ffffff",
                    transform: "translateY(-3px)",
                    boxShadow:
                      "0 12px 30px rgba(0, 0, 0, 0.4), 0 0 25px rgba(99, 102, 241, 0.5)",
                  },
                }}
              >
                <FontAwesomeIcon
                  icon={faRocket}
                  style={{ marginRight: "8px", color: "#ffffff" }}
                />
                Browse Jobs
              </Button>
              <Button
                className="btn btn-secondary"
                size="large"
                onClick={() => navigate("/employer")}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "#ffffff",
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #059669 0%, #047857 100%)",
                    color: "#ffffff",
                    transform: "translateY(-3px)",
                    boxShadow:
                      "0 12px 30px rgba(0, 0, 0, 0.4), 0 0 25px rgba(16, 185, 129, 0.5)",
                  },
                }}
              >
                <FontAwesomeIcon
                  icon={faBuilding}
                  style={{ marginRight: "8px", color: "#ffffff" }}
                />
                Hire Talent
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          background: "var(--secondary-bg)",
          borderTop: "1px solid var(--glass-border)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ py: 6 }}>
            {/* Company Info */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    background: "var(--gradient-primary)",
                    borderRadius: "12px",
                    p: 1.5,
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    style={{ color: "white", fontSize: "1.2rem" }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 800,
                    background: "var(--gradient-primary)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  JobSphere
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "var(--text-secondary)",
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                Connecting talent with opportunity. Building careers, growing
                businesses, and creating success stories every day.
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {[faLinkedin, faTwitter, faFacebook, faInstagram].map(
                  (icon, index) => (
                    <IconButton
                      key={index}
                      sx={{
                        background: "var(--glass-bg)",
                        border: "1px solid var(--glass-border)",
                        color: "var(--text-secondary)",
                        "&:hover": {
                          background: "var(--primary-color)",
                          color: "white",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <FontAwesomeIcon icon={icon} />
                    </IconButton>
                  )
                )}
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "var(--text-primary)",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                For Job Seekers
              </Typography>
              {[
                "Browse Jobs",
                "Career Resources",
                "Resume Builder",
                "Salary Guide",
                "Interview Tips",
              ].map((item, index) => (
                <Typography
                  key={index}
                  sx={{
                    color: "var(--text-secondary)",
                    mb: 1,
                    cursor: "pointer",
                    "&:hover": { color: "var(--primary-color)" },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Grid>

            {/* Employer Links */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "var(--text-primary)",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                For Employers
              </Typography>
              {[
                "Post Jobs",
                "Find Talent",
                "Hiring Solutions",
                "Employer Branding",
                "Recruitment Tips",
              ].map((item, index) => (
                <Typography
                  key={index}
                  sx={{
                    color: "var(--text-secondary)",
                    mb: 1,
                    cursor: "pointer",
                    "&:hover": { color: "var(--primary-color)" },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Grid>

            {/* Company */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "var(--text-primary)",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Company
              </Typography>
              {["About Us", "Careers", "Press", "Blog", "Contact"].map(
                (item, index) => (
                  <Typography
                    key={index}
                    sx={{
                      color: "var(--text-secondary)",
                      mb: 1,
                      cursor: "pointer",
                      "&:hover": { color: "var(--primary-color)" },
                    }}
                  >
                    {item}
                  </Typography>
                )
              )}
            </Grid>

            {/* Contact Info */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "var(--text-primary)",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Contact
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ color: "var(--text-secondary)", marginRight: "8px" }}
                />
                <Typography
                  sx={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
                >
                  hello@jobsphere.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ color: "var(--text-secondary)", marginRight: "8px" }}
                />
                <Typography
                  sx={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
                >
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ color: "var(--text-secondary)", marginRight: "8px" }}
                />
                <Typography
                  sx={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
                >
                  San Francisco, CA
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: "var(--glass-border)" }} />

          <Box
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
            >
              © 2025 JobSphere. All rights reserved.
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item, index) => (
                  <Typography
                    key={index}
                    sx={{
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      "&:hover": { color: "var(--primary-color)" },
                    }}
                  >
                    {item}
                  </Typography>
                )
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
