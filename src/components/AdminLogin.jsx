import { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Link,
  IconButton,
  InputAdornment,
  Fade,
  Slide,
  Container,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate loading delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid credentials! Please try again.");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--gradient-bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Effects */}
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

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={800}>
          <Paper
            className="glass-card"
            sx={{
              p: 4,
              maxWidth: 450,
              width: "100%",
              mx: "auto",
              background: "var(--card-bg)",
              backdropFilter: "blur(20px)",
              border: "1px solid var(--glass-border)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-xl)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "var(--shadow-xl), var(--shadow-glow)",
                borderColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            {/* Back Button */}
            <Box sx={{ mb: 2 }}>
              <IconButton
                onClick={() => navigate("/")}
                className="btn-glass"
                sx={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  style={{ color: "var(--text-primary)" }}
                />
              </IconButton>
            </Box>

            <Slide direction="up" in timeout={1000}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Enhanced Avatar */}
                <Box
                  sx={{
                    background: "var(--gradient-primary)",
                    borderRadius: "50%",
                    p: 3,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "var(--shadow-lg)",
                    animation: "glow 3s ease-in-out infinite",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    style={{ color: "white", fontSize: "2rem" }}
                  />
                </Box>

                <Typography
                  component="h1"
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    fontFamily: "Poppins, sans-serif",
                    mb: 1,
                    color: "var(--text-primary)",
                  }}
                >
                  Admin Portal
                </Typography>

                <Typography
                  sx={{
                    color: "var(--text-secondary)",
                    mb: 4,
                    textAlign: "center",
                    fontSize: "1rem",
                  }}
                >
                  Secure access to administrative controls
                </Typography>

                {/* Form */}
                <Box
                  component="form"
                  noValidate
                  sx={{ width: "100%" }}
                  onSubmit={handleSubmit}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Admin Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        background: "var(--glass-bg)",
                        borderRadius: "var(--radius-lg)",
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
                      },
                      "& .MuiOutlinedInput-input": {
                        color: "var(--text-primary)",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            style={{ color: "var(--text-secondary)" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        background: "var(--glass-bg)",
                        borderRadius: "var(--radius-lg)",
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
                      },
                      "& .MuiOutlinedInput-input": {
                        color: "var(--text-primary)",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon
                            icon={faLock}
                            style={{ color: "var(--text-secondary)" }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: "var(--text-secondary)" }}
                          >
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {error && (
                    <Fade in timeout={300}>
                      <Box
                        sx={{
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          borderRadius: "var(--radius-md)",
                          p: 2,
                          mb: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            color: "var(--danger-color)",
                            fontSize: "0.9rem",
                            textAlign: "center",
                          }}
                        >
                          {error}
                        </Typography>
                      </Box>
                    </Fade>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    className="btn btn-primary"
                    sx={{
                      mt: 3,
                      mb: 2,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      background: loading
                        ? "var(--text-muted)"
                        : "var(--gradient-primary)",
                      borderRadius: "var(--radius-lg)",
                      "&:hover": {
                        transform: loading ? "none" : "translateY(-2px)",
                        boxShadow: loading
                          ? "none"
                          : "var(--shadow-xl), var(--shadow-glow)",
                      },
                      "&:disabled": {
                        color: "var(--text-secondary)",
                      },
                    }}
                  >
                    {loading ? (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box className="loading" sx={{ fontSize: "1rem" }}>
                          <FontAwesomeIcon icon={faSignInAlt} />
                        </Box>
                        Signing In...
                      </Box>
                    ) : (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <FontAwesomeIcon icon={faSignInAlt} />
                        Sign In as Admin
                      </Box>
                    )}
                  </Button>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Link
                      href="#"
                      sx={{
                        color: "var(--primary-color)",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Forgot Password?
                    </Link>
                    <Link
                      href="#"
                      sx={{
                        color: "var(--primary-color)",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Need Help?
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Slide>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}
