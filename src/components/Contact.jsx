import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  Container,
  Grid,
  Card,
  IconButton,
  Fade,
  Slide,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faPaperPlane,
  faUser,
  faMessage,
  faHeadset,
  faClock,
  faGlobe,
  faHeart,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faLinkedin,
  faGithub,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setAlertType("error");
      setAlertMessage("Please fill in all fields");
      setOpen(true);
      return;
    }

    setLoading(true);

    try {
      if (db) {
        await addDoc(collection(db, "contacts"), {
          ...form,
          timestamp: serverTimestamp(),
        });
        setAlertType("success");
        setAlertMessage("Thank you! Your message has been sent successfully.");
        setForm({ name: "", email: "", message: "" });
      } else {
        // Demo mode - simulate success
        setAlertType("info");
        setAlertMessage("Demo mode: Message would be sent in production.");
        setForm({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setAlertType("error");
      setAlertMessage("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      title: "Email Us",
      value: "hello@jobsphere.com",
      description: "Send us an email anytime",
      color: "#6366f1",
    },
    {
      icon: faPhone,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 5pm",
      color: "#10b981",
    },
    {
      icon: faMapMarkerAlt,
      title: "Visit Us",
      value: "123 Business St, Tech City",
      description: "Our headquarters location",
      color: "#f59e0b",
    },
    {
      icon: faHeadset,
      title: "Support",
      value: "24/7 Live Chat",
      description: "Get instant help anytime",
      color: "#ef4444",
    },
  ];

  const socialMedia = [
    { icon: faTwitter, url: "#", color: "#1DA1F2" },
    { icon: faLinkedin, url: "#", color: "#0077B5" },
    { icon: faGithub, url: "#", color: "#333" },
    { icon: faFacebook, url: "#", color: "#1877F2" },
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
              Get In Touch
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "var(--text-secondary)",
                fontFamily: "Inter, sans-serif",
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
                mb: 4,
              }}
              className="animate-fadeInUp"
            >
              Have questions or need support? We'd love to hear from you. Send
              us a message and we'll respond as soon as possible.
            </Typography>
          </Box>
        </Fade>

        {/* Contact Info Cards */}
        <Slide direction="up" in timeout={1200}>
          <Box mb={8}>
            <Grid container spacing={4}>
              {contactInfo.map((info, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Card
                    className="card animate-fadeInUp"
                    sx={{
                      background: "var(--card-bg)",
                      backdropFilter: "blur(15px)",
                      border: "1px solid var(--glass-border)",
                      borderRadius: "20px",
                      p: 3,
                      textAlign: "center",
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${info.color}30`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "20px",
                        background: `linear-gradient(135deg, ${info.color}, ${info.color}dd)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={info.icon}
                        style={{ fontSize: "2rem", color: "#ffffff" }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        mb: 1,
                      }}
                    >
                      {info.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--primary-color)",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      {info.value}
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--text-secondary)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.9rem",
                      }}
                    >
                      {info.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Slide>

        {/* Main Contact Form and Info */}
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Fade in timeout={1400}>
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
                    mb: 3,
                    textAlign: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    style={{ marginRight: "12px", color: "#6366f1" }}
                  />
                  Send us a Message
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: "var(--glass-border)",
                        },
                        "&:hover fieldset": {
                          borderColor: "var(--primary-color)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--primary-color)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "var(--text-secondary)",
                        "&.Mui-focused": {
                          color: "var(--primary-color)",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        color: "var(--text-primary)",
                        fontFamily: "Inter, sans-serif",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{
                            marginRight: "8px",
                            color: "var(--text-secondary)",
                            fontSize: "1rem",
                          }}
                        />
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: "var(--glass-border)",
                        },
                        "&:hover fieldset": {
                          borderColor: "var(--primary-color)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--primary-color)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "var(--text-secondary)",
                        "&.Mui-focused": {
                          color: "var(--primary-color)",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        color: "var(--text-primary)",
                        fontFamily: "Inter, sans-serif",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          style={{
                            marginRight: "8px",
                            color: "var(--text-secondary)",
                            fontSize: "1rem",
                          }}
                        />
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    multiline
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    sx={{
                      mb: 4,
                      "& .MuiOutlinedInput-root": {
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: "var(--glass-border)",
                        },
                        "&:hover fieldset": {
                          borderColor: "var(--primary-color)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--primary-color)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "var(--text-secondary)",
                        "&.Mui-focused": {
                          color: "var(--primary-color)",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        color: "var(--text-primary)",
                        fontFamily: "Inter, sans-serif",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <FontAwesomeIcon
                          icon={faMessage}
                          style={{
                            marginRight: "8px",
                            color: "var(--text-secondary)",
                            fontSize: "1rem",
                            alignSelf: "flex-start",
                            marginTop: "12px",
                          }}
                        />
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    className="btn btn-primary"
                    size="large"
                    disabled={loading}
                    sx={{
                      width: "100%",
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      background: "var(--gradient-primary)",
                      color: "#ffffff",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow:
                          "0 12px 30px rgba(0, 0, 0, 0.3), 0 0 25px rgba(99, 102, 241, 0.4)",
                      },
                      "&:disabled": {
                        background: "var(--gradient-primary)",
                        opacity: 0.7,
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        size={24}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        style={{ marginRight: "8px" }}
                      />
                    )}
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </Box>
              </Card>
            </Fade>
          </Grid>

          {/* Additional Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Fade in timeout={1600}>
              <Box>
                {/* Business Hours */}
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
                      icon={faClock}
                      style={{ marginRight: "12px", color: "#10b981" }}
                    />
                    Business Hours
                  </Typography>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      sx={{
                        color: "var(--text-primary)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "1.1rem",
                        mb: 1,
                      }}
                    >
                      Monday - Friday: 8:00 AM - 6:00 PM
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--text-primary)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "1.1rem",
                        mb: 1,
                      }}
                    >
                      Saturday: 9:00 AM - 4:00 PM
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--text-secondary)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "1rem",
                      }}
                    >
                      Sunday: Closed
                    </Typography>
                  </Box>
                </Card>

                {/* Social Media */}
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
                      icon={faGlobe}
                      style={{ marginRight: "12px", color: "#f59e0b" }}
                    />
                    Follow Us
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    {socialMedia.map((social, index) => (
                      <IconButton
                        key={index}
                        sx={{
                          width: 60,
                          height: 60,
                          background: `linear-gradient(135deg, ${social.color}, ${social.color}dd)`,
                          color: "#ffffff",
                          borderRadius: "15px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px) scale(1.1)",
                            boxShadow: `0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px ${social.color}50`,
                          },
                        }}
                      >
                        <FontAwesomeIcon
                          icon={social.icon}
                          style={{ fontSize: "1.5rem" }}
                        />
                      </IconButton>
                    ))}
                  </Box>
                </Card>

                {/* Support CTA */}
                <Card
                  className="card animate-fadeInRight"
                  sx={{
                    background: "var(--gradient-secondary)",
                    borderRadius: "20px",
                    p: 4,
                    textAlign: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
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
                    Need Immediate Help?
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "1rem",
                      mb: 3,
                    }}
                  >
                    Our support team is available 24/7 to assist you with any
                    questions or issues.
                  </Typography>
                  <Button
                    className="btn btn-glass"
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
                    Live Chat
                  </Button>
                </Card>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={alertType}
          sx={{
            width: "100%",
            background:
              alertType === "success"
                ? "var(--gradient-secondary)"
                : alertType === "error"
                ? "linear-gradient(135deg, #ef4444, #dc2626)"
                : "var(--gradient-primary)",
            color: "#ffffff",
            "& .MuiAlert-icon": {
              color: "#ffffff",
            },
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
