import { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Link,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
  Fade,
  Slide,
  Container,
  Chip,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faUserPlus,
  faCheckCircle,
  faRocket,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function CandidateLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Check if Firebase is properly configured
    if (!auth || !db) {
      setError("Firebase is not configured. Please contact the administrator.");
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await setDoc(doc(db, "candidates", userCred.user.uid), {
          email,
          createdAt: new Date(),
        });

        setSuccessModal(true);
        setIsSignUp(false);
      } else {
        const userCred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const profileRef = doc(db, "candidates", userCred.user.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          localStorage.setItem("candidateAuth", userCred.user.uid);
          navigate(`/candidate-dashboard/${userCred.user.uid}`);
        } else {
          setError("No profile found. Please contact support.");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)
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
                    icon={faUser}
                    style={{ color: "white", fontSize: "2rem" }}
                  />
                </Box>

                {/* Mode Indicator */}
                <Chip
                  icon={
                    <FontAwesomeIcon icon={isSignUp ? faUserPlus : faRocket} />
                  }
                  label={isSignUp ? "Join Platform" : "Find Jobs"}
                  sx={{
                    mb: 2,
                    background: "var(--gradient-primary)",
                    color: "white",
                    fontWeight: 600,
                  }}
                />

                <Typography
                  component="h1"
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    fontFamily: "Poppins, sans-serif",
                    mb: 1,
                    color: "var(--text-primary)",
                    textAlign: "center",
                  }}
                >
                  {isSignUp ? "Start Your Career" : "Welcome Back"}
                </Typography>

                <Typography
                  sx={{
                    color: "var(--text-secondary)",
                    mb: 4,
                    textAlign: "center",
                    fontSize: "1rem",
                  }}
                >
                  {isSignUp
                    ? "Join thousands of professionals finding their dream jobs"
                    : "Continue your job search journey"}
                </Typography>

                {/* Form */}
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ width: "100%" }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
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
                    disabled={loading}
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
                        <CircularProgress size={20} sx={{ color: "white" }} />
                        {isSignUp ? "Creating Account..." : "Signing In..."}
                      </Box>
                    ) : (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <FontAwesomeIcon
                          icon={isSignUp ? faUserPlus : faRocket}
                        />
                        {isSignUp ? "Start My Journey" : "Find Dream Jobs"}
                      </Box>
                    )}
                  </Button>

                  <Box sx={{ textAlign: "center", mt: 3 }}>
                    <Link
                      href="#"
                      onClick={() => setIsSignUp(!isSignUp)}
                      sx={{
                        color: "var(--primary-color)",
                        textDecoration: "none",
                        fontSize: "1rem",
                        fontWeight: 500,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {isSignUp
                        ? "Already have an account? Sign In"
                        : "New to JobSphere? Join Now"}
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Slide>
          </Paper>
        </Fade>
      </Container>

      {/* Success Modal */}
      <Dialog
        open={successModal}
        onClose={() => setSuccessModal(false)}
        PaperProps={{
          sx: {
            background: "var(--card-bg)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--glass-border)",
            borderRadius: "var(--radius-xl)",
            color: "var(--text-primary)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                background: "var(--gradient-primary)",
                borderRadius: "50%",
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ color: "white", fontSize: "2rem" }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "1.5rem",
              }}
            >
              Welcome to JobSphere!
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", pb: 2 }}>
          <Typography sx={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Your account has been created successfully. You can now sign in and
            start exploring amazing job opportunities.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            onClick={() => setSuccessModal(false)}
            className="btn btn-primary"
            sx={{
              px: 4,
              py: 1.5,
              background: "var(--gradient-primary)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "var(--shadow-xl), var(--shadow-glow)",
              },
            }}
          >
            <FontAwesomeIcon
              icon={faGraduationCap}
              style={{ marginRight: "8px" }}
            />
            Start Job Hunting
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
