import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  Avatar,
  Chip,
  Fade,
  Slide,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBriefcase,
  faMapMarkerAlt,
  faClock,
  faDollarSign,
  faBuilding,
  faUser,
  faEdit,
  faSave,
  faTimes,
  faPlus,
  faRocket,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function CandidateHome() {
  const [candidateId, setCandidateId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    experience: "",
  });

  // Application states
  const [applications, setApplications] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applying, setApplying] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  // Get candidateId from Firebase Auth
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCandidateId(user.uid);
      } else {
        setCandidateId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Load jobs, profile, and applications
  useEffect(() => {
    if (!candidateId) return;

    const fetchJobs = async () => {
      const snapshot = await getDocs(collection(db, "jobs"));
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsData);
      setFilteredJobs(jobsData);
    };

    const fetchProfile = async () => {
      const profileRef = doc(db, "candidates", candidateId);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        const data = profileSnap.data();
        if (data.name || data.skills || data.experience) {
          setProfile(data);
          setFormData(data);
        } else {
          setProfile(null);
          setFormData({ name: "", skills: "", experience: "" });
        }
      } else {
        setProfile(null);
        setFormData({ name: "", skills: "", experience: "" });
      }
    };

    const fetchApplications = async () => {
      const appsRef = collection(db, "applications");
      const snapshot = await getDocs(appsRef);
      const apps = {};
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.candidateId === candidateId) {
          apps[data.jobId] = data.status;
        }
      });
      setApplications(apps);
    };

    fetchJobs();
    fetchProfile();
    fetchApplications();
  }, [candidateId]);

  // Search functionality
  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchQuery, jobs]);

  // Save or update profile
  const handleSaveProfile = async () => {
    if (
      !candidateId ||
      !formData.name ||
      !formData.skills ||
      !formData.experience
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const profileRef = doc(db, "candidates", candidateId);
      await setDoc(profileRef, formData, { merge: true });
      setProfile(formData);
      setEditProfile(false);
    } catch (err) {
      console.error("Error saving profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = (job) => {
    if (!profile) {
      alert("Please create your profile first!");
      return;
    }
    setSelectedJob(job);
    setCoverLetter("");
    setOpenModal(true);
  };

  const handleSubmitApplication = async () => {
    if (!selectedJob || !profile) return;
    setApplying(true);

    try {
      const appRef = doc(
        db,
        "applications",
        `${selectedJob.id}_${candidateId}`
      );
      await setDoc(appRef, {
        jobId: selectedJob.id,
        candidateId,
        profile,
        coverLetter,
        status: "Applied",
        createdAt: serverTimestamp(),
      });

      setApplications((prev) => ({ ...prev, [selectedJob.id]: "Applied" }));
      setOpenModal(false);
    } catch (err) {
      console.error("Error submitting application:", err);
    } finally {
      setApplying(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      Applied: {
        color: "#6366f1",
        text: "Applied",
        bgColor: "rgba(99, 102, 241, 0.1)",
      },
      Reviewed: {
        color: "#f59e0b",
        text: "Reviewed",
        bgColor: "rgba(245, 158, 11, 0.1)",
      },
      Shortlisted: {
        color: "#10b981",
        text: "Shortlisted ✅",
        bgColor: "rgba(16, 185, 129, 0.1)",
      },
      Rejected: {
        color: "#ef4444",
        text: "Rejected ❌",
        bgColor: "rgba(239, 68, 68, 0.1)",
      },
    };
    return (
      configs[status] || {
        color: "#6366f1",
        text: "Apply Now",
        bgColor: "transparent",
      }
    );
  };

  if (!candidateId) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "var(--gradient-bg)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "var(--text-primary)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Please log in to access your dashboard.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "var(--gradient-bg)",
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

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, py: 4 }}>
        {/* Hero Section */}
        <Fade in timeout={1000}>
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 800,
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              <FontAwesomeIcon
                icon={faRocket}
                style={{ marginRight: "16px" }}
              />
              Welcome to Your Dashboard
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "var(--text-secondary)",
                fontFamily: "Inter, sans-serif",
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Find your dream job and take your career to the next level
            </Typography>
          </Box>
        </Fade>

        {/* Profile Section */}
        <Slide direction="up" in timeout={1200}>
          <Card
            className="card animate-fadeInUp"
            sx={{
              background: "var(--card-bg)",
              backdropFilter: "blur(15px)",
              border: "1px solid var(--glass-border)",
              borderRadius: "20px",
              mb: 6,
              p: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ marginRight: "12px", color: "#10b981" }}
                />
                Your Profile
              </Typography>
              <Button
                onClick={() => setEditProfile(!editProfile)}
                sx={{
                  background: editProfile
                    ? "var(--danger-color)"
                    : "var(--gradient-secondary)",
                  color: "#ffffff",
                  px: 3,
                  py: 1,
                  borderRadius: "12px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <FontAwesomeIcon
                  icon={editProfile ? faTimes : faEdit}
                  style={{ marginRight: "8px" }}
                />
                {editProfile ? "Cancel" : "Edit Profile"}
              </Button>
            </Box>

            {!profile && !editProfile ? (
              <Box textAlign="center" py={4}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 3,
                    background: "var(--gradient-primary)",
                  }}
                >
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: "2rem" }} />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    color: "var(--text-primary)",
                    fontFamily: "Poppins, sans-serif",
                    mb: 2,
                  }}
                >
                  Create Your Profile
                </Typography>
                <Typography
                  sx={{
                    color: "var(--text-secondary)",
                    fontFamily: "Inter, sans-serif",
                    mb: 3,
                  }}
                >
                  Set up your profile to start applying for jobs
                </Typography>
                <Button
                  onClick={() => setEditProfile(true)}
                  sx={{
                    background: "var(--gradient-primary)",
                    color: "#ffffff",
                    px: 4,
                    py: 2,
                    borderRadius: "12px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    "&:hover": {
                      background: "var(--gradient-accent)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ marginRight: "8px" }}
                  />
                  Create Profile
                </Button>
              </Box>
            ) : editProfile ? (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: "var(--glass-border)",
                        },
                        "&:hover fieldset": {
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
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Skills"
                    value={formData.skills}
                    onChange={(e) =>
                      setFormData({ ...formData, skills: e.target.value })
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: "var(--glass-border)",
                        },
                        "&:hover fieldset": {
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
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Experience"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: "var(--glass-border)",
                        },
                        "&:hover fieldset": {
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
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    sx={{
                      background: "var(--gradient-secondary)",
                      color: "#ffffff",
                      px: 4,
                      py: 2,
                      borderRadius: "12px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      "&:hover": {
                        background: "var(--gradient-primary)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        size={20}
                        sx={{ mr: 1, color: "#ffffff" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSave}
                        style={{ marginRight: "8px" }}
                      />
                    )}
                    Save Profile
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={3} alignItems="center">
                <Grid size={{ xs: 12, md: 3 }}>
                  <Box textAlign="center">
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        mx: "auto",
                        mb: 2,
                        background: "var(--gradient-secondary)",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ fontSize: "2.5rem" }}
                      />
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "var(--text-primary)",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {profile?.name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 9 }}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Card
                        sx={{
                          background: "rgba(16, 185, 129, 0.1)",
                          border: "1px solid rgba(16, 185, 129, 0.2)",
                          borderRadius: "12px",
                          p: 3,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "#10b981",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600,
                            mb: 1,
                          }}
                        >
                          Skills
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--text-primary)",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {profile?.skills}
                        </Typography>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Card
                        sx={{
                          background: "rgba(99, 102, 241, 0.1)",
                          border: "1px solid rgba(99, 102, 241, 0.2)",
                          borderRadius: "12px",
                          p: 3,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "#6366f1",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600,
                            mb: 1,
                          }}
                        >
                          Experience
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--text-primary)",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {profile?.experience}
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Card>
        </Slide>

        {/* Search Section */}
        <Fade in timeout={1400}>
          <Card
            className="card animate-fadeInUp"
            sx={{
              background: "var(--card-bg)",
              backdropFilter: "blur(15px)",
              border: "1px solid var(--glass-border)",
              borderRadius: "20px",
              mb: 6,
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
                icon={faSearch}
                style={{ marginRight: "12px", color: "#f59e0b" }}
              />
              Find Your Perfect Job
            </Typography>
            <Box sx={{ position: "relative", maxWidth: "600px", mx: "auto" }}>
              <TextField
                fullWidth
                placeholder="Search jobs by title, company, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "15px",
                    height: "60px",
                    fontSize: "1.1rem",
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
                  "& .MuiOutlinedInput-input": {
                    color: "var(--text-primary)",
                    "&::placeholder": {
                      color: "var(--text-secondary)",
                      opacity: 1,
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{
                        color: "var(--primary-color)",
                        marginRight: "12px",
                        fontSize: "1.2rem",
                      }}
                    />
                  ),
                }}
              />
            </Box>
          </Card>
        </Fade>

        {/* Jobs Section */}
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            color: "var(--text-primary)",
            mb: 4,
            textAlign: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faBriefcase}
            style={{ marginRight: "16px", color: "#6366f1" }}
          />
          Available Opportunities
        </Typography>

        <Grid container spacing={4}>
          {filteredJobs.map((job) => {
            const status = applications[job.id];
            const statusConfig = getStatusConfig(status);

            return (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={job.id}>
                <Fade in timeout={1600}>
                  <Card
                    className="card animate-fadeInUp"
                    sx={{
                      background: "var(--card-bg)",
                      backdropFilter: "blur(15px)",
                      border: "1px solid var(--glass-border)",
                      borderRadius: "20px",
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow:
                          "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(99, 102, 241, 0.2)",
                      },
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 3,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            background: "var(--gradient-accent)",
                            fontSize: "1.5rem",
                          }}
                        >
                          <FontAwesomeIcon icon={faBuilding} />
                        </Avatar>
                        {status && (
                          <Chip
                            label={statusConfig.text}
                            sx={{
                              background: statusConfig.bgColor,
                              color: statusConfig.color,
                              border: `1px solid ${statusConfig.color}`,
                              fontWeight: 600,
                            }}
                          />
                        )}
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          mb: 1,
                        }}
                      >
                        {job.title}
                      </Typography>

                      <Typography
                        variant="h6"
                        sx={{
                          color: "var(--primary-color)",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        {job.company}
                      </Typography>

                      <Box sx={{ mb: 3 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            style={{
                              color: "var(--secondary-color)",
                              marginRight: "8px",
                            }}
                          />
                          <Typography
                            sx={{
                              color: "var(--text-secondary)",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {job.location}
                          </Typography>
                        </Box>

                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <FontAwesomeIcon
                            icon={faDollarSign}
                            style={{
                              color: "var(--accent-color)",
                              marginRight: "8px",
                            }}
                          />
                          <Typography
                            sx={{
                              color: "var(--text-secondary)",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {job.salary || "Competitive"}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <FontAwesomeIcon
                            icon={faClock}
                            style={{
                              color: "var(--text-muted)",
                              marginRight: "8px",
                            }}
                          />
                          <Typography
                            sx={{
                              color: "var(--text-secondary)",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {job.type || "Full-time"}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        sx={{
                          color: "var(--text-secondary)",
                          fontFamily: "Inter, sans-serif",
                          lineHeight: 1.6,
                          mb: 3,
                        }}
                      >
                        {job.description?.substring(0, 150)}...
                      </Typography>
                    </Box>

                    <Button
                      onClick={() => handleApplyClick(job)}
                      disabled={!!status}
                      sx={{
                        background: status
                          ? `linear-gradient(135deg, ${statusConfig.color}, ${statusConfig.color}dd)`
                          : "var(--gradient-primary)",
                        color: "#ffffff",
                        py: 2,
                        borderRadius: "12px",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                        fontSize: "1rem",
                        "&:hover": {
                          background: status
                            ? `linear-gradient(135deg, ${statusConfig.color}dd, ${statusConfig.color}bb)`
                            : "var(--gradient-accent)",
                          transform: status ? "none" : "translateY(-2px)",
                        },
                        "&:disabled": {
                          color: "#ffffff",
                        },
                      }}
                    >
                      {status ? (
                        <>
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            style={{ marginRight: "8px" }}
                          />
                          {statusConfig.text}
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon
                            icon={faRocket}
                            style={{ marginRight: "8px" }}
                          />
                          Apply Now
                        </>
                      )}
                    </Button>
                  </Card>
                </Fade>
              </Grid>
            );
          })}
        </Grid>

        {filteredJobs.length === 0 && (
          <Box textAlign="center" py={8}>
            <Typography
              variant="h5"
              sx={{
                color: "var(--text-secondary)",
                fontFamily: "Inter, sans-serif",
                mb: 2,
              }}
            >
              No jobs found matching your search
            </Typography>
            <Typography
              sx={{
                color: "var(--text-muted)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Try adjusting your search criteria
            </Typography>
          </Box>
        )}
      </Container>

      {/* Application Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: "var(--card-bg)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--glass-border)",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "var(--text-primary)",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "1.5rem",
          }}
        >
          <FontAwesomeIcon
            icon={faBriefcase}
            style={{ marginRight: "12px", color: "#6366f1" }}
          />
          Apply for {selectedJob?.title}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Cover Letter (Optional)"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "12px",
                "& fieldset": {
                  borderColor: "var(--glass-border)",
                },
                "&:hover fieldset": {
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
            placeholder="Tell the employer why you're the perfect fit for this role..."
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenModal(false)}
            sx={{
              color: "var(--text-secondary)",
              fontFamily: "Inter, sans-serif",
              "&:hover": {
                background: "var(--glass-bg)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitApplication}
            disabled={applying}
            sx={{
              background: "var(--gradient-primary)",
              color: "#ffffff",
              px: 4,
              py: 1,
              borderRadius: "12px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              "&:hover": {
                background: "var(--gradient-accent)",
              },
            }}
          >
            {applying ? (
              <CircularProgress size={20} sx={{ mr: 1, color: "#ffffff" }} />
            ) : (
              <FontAwesomeIcon icon={faRocket} style={{ marginRight: "8px" }} />
            )}
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
