import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Button,
  Paper,
  Fade,
  Slide,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faUsers,
  faShieldAlt,
  faLightbulb,
  faHandshake,
  faTrophy,
  faHeart,
  faArrowRight,
  faStar,
  faCheck,
  faBullseye,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const values = [
    {
      icon: faShieldAlt,
      title: "Trust & Security",
      description:
        "Only verified job posters are allowed to publish jobs. Every listing goes through verification to ensure authenticity and protect candidates from scams.",
      color: "#6366f1",
    },
    {
      icon: faLightbulb,
      title: "Innovation",
      description:
        "Revolutionizing hiring with one-click applications, live status tracking, and AI-powered matching for seamless job search experience.",
      color: "#10b981",
    },
    {
      icon: faUsers,
      title: "Community",
      description:
        "Built by passionate developers to create meaningful connections between talented professionals and forward-thinking employers.",
      color: "#f59e0b",
    },
  ];

  const achievements = [
    { number: "50K+", label: "Jobs Posted", icon: faRocket },
    { number: "25K+", label: "Happy Candidates", icon: faUsers },
    { number: "5K+", label: "Verified Employers", icon: faShieldAlt },
    { number: "100%", label: "Secure Platform", icon: faTrophy },
  ];

  const features = [
    "Candidate Profiles with Resume & Skills",
    "Verified Job Posters for Authentic Listings",
    "One-Click Apply & Status Tracking",
    "Admin Dashboard for Moderation",
    "Real-time notifications",
    "Advanced search filters",
  ];

  const teamMembers = [
    "Muhammad Ali",
    "Shumaila Riaz",
    "Faizan Javed Ghumman",
    "Waariha Asim",
    "Mehak Iqbal",
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)
          `,
          animation: "pulse 6s ease-in-out infinite",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 8 }}>
        {/* Hero Section */}
        <Fade in timeout={1000}>
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 800,
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
              className="animate-fadeInUp"
            >
              About JobSphere
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "var(--text-secondary)",
                fontFamily: "Inter, sans-serif",
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
                mb: 4,
              }}
              className="animate-fadeInUp"
            >
              Connecting job seekers with verified employers through a secure,
              seamless platform making hiring effective, faster, safer, and
              smarter.
            </Typography>
          </Box>
        </Fade>

        {/* Mission & Vision */}
        <Grid container spacing={4} mb={8}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(15px)",
                border: "1px solid var(--glass-border)",
                borderRadius: "20px",
                p: 4,
                height: "100%",
                textAlign: "center",
              }}
              className="animate-fadeInLeft glass-card"
            >
              <Typography
                variant="h4"
                sx={{
                  color: "var(--text-primary)",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                <FontAwesomeIcon
                  icon={faBullseye}
                  style={{ marginRight: "12px", color: "#6366f1" }}
                />
                Our Mission
              </Typography>
              <Typography
                sx={{
                  color: "var(--text-secondary)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                }}
              >
                To revolutionize the hiring process by connecting job seekers
                with verified opportunities, enabling one-click applications,
                and providing live status tracking while empowering employers
                with a simple, transparent, and trustworthy recruitment
                platform.
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(15px)",
                border: "1px solid var(--glass-border)",
                borderRadius: "20px",
                p: 4,
                height: "100%",
                textAlign: "center",
              }}
              className="animate-fadeInRight glass-card"
            >
              <Typography
                variant="h4"
                sx={{
                  color: "var(--text-primary)",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                <FontAwesomeIcon
                  icon={faEye}
                  style={{ marginRight: "12px", color: "#10b981" }}
                />
                Our Vision
              </Typography>
              <Typography
                sx={{
                  color: "var(--text-secondary)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                }}
              >
                To create a world where everyone finds meaningful work and
                organizations discover exceptional talent through innovative,
                secure, and inclusive technology that makes job hunting and
                recruitment seamless and stress-free.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Achievements Section */}
        <Slide direction="up" in timeout={1200}>
          <Box mb={8}>
            <Typography
              variant="h3"
              textAlign="center"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                color: "var(--text-primary)",
                mb: 6,
              }}
            >
              Our Impact
            </Typography>
            <Grid container spacing={4}>
              {achievements.map((achievement, index) => (
                <Grid size={{ xs: 6, md: 3 }} key={index}>
                  <Card
                    className="card animate-fadeInUp"
                    sx={{
                      background: "var(--card-bg)",
                      backdropFilter: "blur(15px)",
                      border: "1px solid var(--glass-border)",
                      borderRadius: "20px",
                      textAlign: "center",
                      p: 3,
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${
                          achievement.icon === faRocket
                            ? "#6366f1"
                            : achievement.icon === faUsers
                            ? "#10b981"
                            : achievement.icon === faShieldAlt
                            ? "#f59e0b"
                            : "#ef4444"
                        }, ${
                          achievement.icon === faRocket
                            ? "#4f46e5"
                            : achievement.icon === faUsers
                            ? "#059669"
                            : achievement.icon === faShieldAlt
                            ? "#d97706"
                            : "#dc2626"
                        })`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={achievement.icon}
                        style={{ fontSize: "2rem", color: "#ffffff" }}
                      />
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 800,
                        color: "var(--primary-color)",
                        mb: 1,
                      }}
                    >
                      {achievement.number}
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--text-secondary)",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {achievement.label}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Slide>

        {/* Values Section */}
        <Fade in timeout={1400}>
          <Box mb={8}>
            <Typography
              variant="h3"
              textAlign="center"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                color: "var(--text-primary)",
                mb: 6,
              }}
            >
              Our Core Values
            </Typography>
            <Grid container spacing={4}>
              {values.map((value, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Card
                    className="card animate-fadeInUp"
                    sx={{
                      background: "var(--card-bg)",
                      backdropFilter: "blur(15px)",
                      border: "1px solid var(--glass-border)",
                      borderRadius: "20px",
                      p: 4,
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px) scale(1.02)",
                        boxShadow: `0 15px 30px rgba(0, 0, 0, 0.2), 0 0 20px ${value.color}30`,
                      },
                    }}
                  >
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "20px",
                          background: `linear-gradient(135deg, ${value.color}, ${value.color}dd)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 2,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={value.icon}
                          style={{ fontSize: "2rem", color: "#ffffff" }}
                        />
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                        }}
                      >
                        {value.title}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: "var(--text-secondary)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "1rem",
                        lineHeight: 1.6,
                        textAlign: "center",
                      }}
                    >
                      {value.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Team & Features Section */}
        <Grid container spacing={4} mb={8}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              className="card animate-fadeInLeft"
              sx={{
                background: "var(--card-bg)",
                backdropFilter: "blur(15px)",
                border: "1px solid var(--glass-border)",
                borderRadius: "20px",
                p: 4,
                height: "100%",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faUsers}
                  style={{ marginRight: "12px", color: "#6366f1" }}
                />
                Our Team
              </Typography>
              <Typography
                sx={{
                  color: "var(--text-secondary)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  textAlign: "center",
                  mb: 3,
                }}
              >
                A group of passionate developers who came together to build
                JobSphere with a shared vision of creating smarter and safer job
                search experiences.
              </Typography>
              <Box>
                {teamMembers.map((member, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      p: 2,
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.1)",
                        transform: "translateX(10px)",
                      },
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{
                        color: "#ef4444",
                        marginRight: "12px",
                        fontSize: "1.2rem",
                      }}
                    />
                    <Typography
                      sx={{
                        color: "var(--text-primary)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                      }}
                    >
                      {member}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              className="card animate-fadeInRight"
              sx={{
                background: "var(--card-bg)",
                backdropFilter: "blur(15px)",
                border: "1px solid var(--glass-border)",
                borderRadius: "20px",
                p: 4,
                height: "100%",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ marginRight: "12px", color: "#f59e0b" }}
                />
                Key Features
              </Typography>
              <Box>
                {features.map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      p: 2,
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.1)",
                        transform: "translateX(10px)",
                      },
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{
                        color: "#10b981",
                        marginRight: "12px",
                        fontSize: "1.2rem",
                      }}
                    />
                    <Typography
                      sx={{
                        color: "var(--text-primary)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 500,
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* CTA Section */}
        <Slide direction="up" in timeout={1600}>
          <Card
            className="card animate-fadeInUp"
            sx={{
              background: "var(--gradient-primary)",
              borderRadius: "20px",
              p: 6,
              textAlign: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faHandshake}
              style={{
                fontSize: "4rem",
                color: "#ffffff",
                marginBottom: "24px",
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                color: "#ffffff",
                mb: 3,
              }}
            >
              Ready to Join Our Community?
            </Typography>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                fontFamily: "Inter, sans-serif",
                fontSize: "1.2rem",
                mb: 4,
                lineHeight: 1.6,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Whether you're looking for your next career opportunity or seeking
              top talent, JobSphere is here to help you succeed. Join our
              community today!
            </Typography>
            <Button
              className="btn btn-glass"
              size="large"
              onClick={() => navigate("/")}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 700,
                background: "rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.3)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ marginRight: "8px" }}
              />
              Get Started
            </Button>
          </Card>
        </Slide>
      </Container>
    </Box>
  );
}
