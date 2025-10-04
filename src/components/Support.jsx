import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Grid,
  Card,
  Button,
  Fade,
  Slide,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faHeadset,
  faBook,
  faEnvelope,
  faPhone,
  faComments,
  faUser,
  faBriefcase,
  faShieldAlt,
  faSearch,
  faBell,
  faChevronDown,
  faRocket,
  faLifeRing,
  faArrowRight,
  faDownload,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faLinkedin,
  faYoutube,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Support() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      id: "panel1",
      icon: faUser,
      question: "How do I create a profile? (Candidate/JobSeeker)",
      answer:
        "Register using your email and password. Once logged in and directed to your dashboard, click 'Create Profile' to add your name, skills, and work experience. Complete your profile with education, certifications, and portfolio links to attract employers.",
    },
    {
      id: "panel2",
      icon: faBriefcase,
      question: "How can I post a job? (Employer)",
      answer:
        "First, apply for verification as a job poster through your employer dashboard. After admin approval, you can create and publish job listings directly from your dashboard. Every posting is visible to verified candidates and includes detailed job requirements, benefits, and company information.",
    },
    {
      id: "panel3",
      icon: faShieldAlt,
      question: "How does verification work?",
      answer:
        "JobSphere uses a strict verification process to ensure authenticity. Employers must provide company documentation and undergo manual review. Candidates are verified through email and optional LinkedIn integration. This ensures a trusted environment for all users.",
    },
    {
      id: "panel4",
      icon: faSearch,
      question: "How do I search for jobs effectively?",
      answer:
        "Use our advanced search filters to find jobs by location, industry, experience level, and salary range. Set up job alerts to get notified about new opportunities. Use keywords relevant to your skills and desired position for better results.",
    },
    {
      id: "panel5",
      icon: faBell,
      question: "How do application notifications work?",
      answer:
        "You'll receive real-time notifications when employers view your application, shortlist you, or update your application status. Enable push notifications and email alerts in your settings to stay updated throughout the hiring process.",
    },
    {
      id: "panel6",
      icon: faRocket,
      question: "What makes JobSphere different?",
      answer:
        "JobSphere focuses on verified opportunities with one-click applications, live status tracking, and transparent communication between candidates and employers. Our platform eliminates fake postings and provides a secure, efficient hiring experience.",
    },
  ];

  const supportOptions = [
    {
      icon: faHeadset,
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      action: "Start Chat",
      color: "#6366f1",
      available: "24/7 Available",
    },
    {
      icon: faEnvelope,
      title: "Email Support",
      description: "Send us detailed questions or feedback",
      action: "Send Email",
      color: "#10b981",
      available: "Response within 24h",
    },
    {
      icon: faPhone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      action: "Call Now",
      color: "#f59e0b",
      available: "Mon-Fri 9AM-6PM",
    },
    {
      icon: faBook,
      title: "Documentation",
      description: "Comprehensive guides and tutorials",
      action: "Browse Docs",
      color: "#ef4444",
      available: "Always Updated",
    },
  ];

  const resources = [
    {
      icon: faVideo,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
    },
    {
      icon: faDownload,
      title: "User Manual",
      description: "Complete platform documentation",
    },
    {
      icon: faComments,
      title: "Community Forum",
      description: "Connect with other users",
    },
    {
      icon: faLifeRing,
      title: "Troubleshooting",
      description: "Common issues and solutions",
    },
  ];

  const socialSupport = [
    { icon: faTwitter, url: "#", label: "Twitter Support", color: "#1DA1F2" },
    { icon: faLinkedin, url: "#", label: "LinkedIn Help", color: "#0077B5" },
    { icon: faYoutube, url: "#", label: "Video Tutorials", color: "#FF0000" },
    { icon: faDiscord, url: "#", label: "Community Chat", color: "#5865F2" },
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
              <FontAwesomeIcon
                icon={faLifeRing}
                style={{ marginRight: "16px" }}
              />
              Support Center
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "var(--text-secondary)",
                fontFamily: "Inter, sans-serif",
                maxWidth: "700px",
                mx: "auto",
                lineHeight: 1.6,
                mb: 4,
              }}
              className="animate-fadeInUp"
            >
              We're here to help you get the most out of JobSphere. Find
              answers, get support, and explore resources to succeed.
            </Typography>
          </Box>
        </Fade>

        {/* Support Options */}
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
              Get Help Now
            </Typography>
            <Grid container spacing={4}>
              {supportOptions.map((option, index) => (
                <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
                  <Card
                    className="card animate-fadeInUp"
                    sx={{
                      background: "var(--card-bg)",
                      backdropFilter: "blur(15px)",
                      border: "1px solid var(--glass-border)",
                      borderRadius: "20px",
                      p: 4,
                      textAlign: "center",
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${option.color}30`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "20px",
                        background: `linear-gradient(135deg, ${option.color}, ${option.color}dd)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={option.icon}
                        style={{ fontSize: "2rem", color: "#ffffff" }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        mb: 2,
                      }}
                    >
                      {option.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--text-secondary)",
                        fontFamily: "Inter, sans-serif",
                        mb: 2,
                      }}
                    >
                      {option.description}
                    </Typography>
                    <Typography
                      sx={{
                        color: option.color,
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        mb: 3,
                      }}
                    >
                      {option.available}
                    </Typography>
                    <Button
                      className="btn btn-primary"
                      sx={{
                        background: `linear-gradient(135deg, ${option.color}, ${option.color}dd)`,
                        color: "#ffffff",
                        px: 3,
                        py: 1,
                        "&:hover": {
                          background: `linear-gradient(135deg, ${option.color}dd, ${option.color}bb)`,
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      {option.action}
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Slide>

        {/* FAQ Section */}
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
              <FontAwesomeIcon
                icon={faQuestionCircle}
                style={{ marginRight: "16px", color: "#6366f1" }}
              />
              Frequently Asked Questions
            </Typography>
            <Card
              className="card animate-fadeInUp"
              sx={{
                background: "var(--card-bg)",
                backdropFilter: "blur(15px)",
                border: "1px solid var(--glass-border)",
                borderRadius: "20px",
                p: 2,
              }}
            >
              {faqs.map((faq) => (
                <Accordion
                  key={faq.id}
                  expanded={expanded === faq.id}
                  onChange={handleAccordionChange(faq.id)}
                  sx={{
                    background: "transparent",
                    boxShadow: "none",
                    border: "none",
                    "&:before": {
                      display: "none",
                    },
                    mb: 1,
                    borderRadius: "12px !important",
                    "&.Mui-expanded": {
                      background: "rgba(255, 255, 255, 0.05)",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "1rem",
                          transition: "transform 0.3s ease",
                          transform:
                            expanded === faq.id
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
                      />
                    }
                    sx={{
                      "& .MuiAccordionSummary-content": {
                        alignItems: "center",
                        py: 1,
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "10px",
                          background: "var(--gradient-primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 2,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faq.icon}
                          style={{ fontSize: "1rem", color: "#ffffff" }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          fontSize: "1.1rem",
                        }}
                      >
                        {faq.question}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0, pb: 2, pl: 7 }}>
                    <Typography
                      sx={{
                        color: "var(--text-secondary)",
                        fontFamily: "Inter, sans-serif",
                        lineHeight: 1.6,
                        fontSize: "1rem",
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Card>
          </Box>
        </Fade>

        {/* Resources and Social Support */}
        <Grid container spacing={6}>
          {/* Resources */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Slide direction="up" in timeout={1600}>
              <Card
                className="card animate-fadeInLeft"
                sx={{
                  background: "var(--card-bg)",
                  backdropFilter: "blur(15px)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "20px",
                  p: 4,
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
                    icon={faBook}
                    style={{ marginRight: "12px", color: "#10b981" }}
                  />
                  Helpful Resources
                </Typography>
                <Grid container spacing={3}>
                  {resources.map((resource, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 3,
                          borderRadius: "15px",
                          background: "rgba(255, 255, 255, 0.05)",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          "&:hover": {
                            background: "rgba(255, 255, 255, 0.1)",
                            transform: "translateX(10px)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: "12px",
                            background: "var(--gradient-accent)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mr: 3,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={resource.icon}
                            style={{ fontSize: "1.2rem", color: "#ffffff" }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: 600,
                              color: "var(--text-primary)",
                              mb: 0.5,
                            }}
                          >
                            {resource.title}
                          </Typography>
                          <Typography
                            sx={{
                              color: "var(--text-secondary)",
                              fontFamily: "Inter, sans-serif",
                              fontSize: "0.9rem",
                            }}
                          >
                            {resource.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Slide>
          </Grid>

          {/* Social Support */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Slide direction="up" in timeout={1800}>
              <Box>
                <Card
                  className="card animate-fadeInRight"
                  sx={{
                    background: "var(--card-bg)",
                    backdropFilter: "blur(15px)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "20px",
                    p: 4,
                    mb: 4,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      mb: 3,
                      textAlign: "center",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faComments}
                      style={{ marginRight: "12px", color: "#f59e0b" }}
                    />
                    Social Support
                  </Typography>
                  <Box sx={{ textAlign: "center" }}>
                    {socialSupport.map((social, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 2,
                          mb: 2,
                          borderRadius: "12px",
                          background: "rgba(255, 255, 255, 0.05)",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          "&:hover": {
                            background: `${social.color}20`,
                            transform: "translateX(5px)",
                          },
                        }}
                      >
                        <IconButton
                          sx={{
                            width: 40,
                            height: 40,
                            background: `linear-gradient(135deg, ${social.color}, ${social.color}dd)`,
                            color: "#ffffff",
                            mr: 2,
                            "&:hover": {
                              background: `linear-gradient(135deg, ${social.color}dd, ${social.color}bb)`,
                            },
                          }}
                        >
                          <FontAwesomeIcon
                            icon={social.icon}
                            style={{ fontSize: "1rem" }}
                          />
                        </IconButton>
                        <Typography
                          sx={{
                            color: "var(--text-primary)",
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {social.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Card>

                {/* Contact CTA */}
                <Card
                  className="card animate-fadeInRight"
                  sx={{
                    background: "var(--gradient-primary)",
                    borderRadius: "20px",
                    p: 4,
                    textAlign: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faHeadset}
                    style={{
                      fontSize: "3rem",
                      color: "#ffffff",
                      marginBottom: "16px",
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      color: "#ffffff",
                      mb: 2,
                    }}
                  >
                    Still Need Help?
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "1rem",
                      mb: 3,
                    }}
                  >
                    Can't find what you're looking for? Contact our support team
                    directly.
                  </Typography>
                  <Button
                    className="btn btn-glass"
                    onClick={() => navigate("/contact")}
                    sx={{
                      px: 3,
                      py: 1,
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "#ffffff",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.3)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      style={{ marginRight: "8px" }}
                    />
                    Contact Us
                  </Button>
                </Card>
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
