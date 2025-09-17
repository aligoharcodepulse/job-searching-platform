import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Container,
  Grid,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function CandidateHome() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", skills: "", experience: "" });

  // Application states
  const [applications, setApplications] = useState({}); // jobId -> status
  const [openModal, setOpenModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applying, setApplying] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  // Load jobs, profile, and applications
  useEffect(() => {
    const fetchJobs = async () => {
      const snapshot = await getDocs(collection(db, "jobs"));
      const jobsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setJobs(jobsData);
      setFilteredJobs(jobsData);
    };

    const fetchProfile = async () => {
      const profileRef = doc(db, "candidates", "candidate1"); // replace with UID
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        setProfile(profileSnap.data());
      }
    };

    const fetchApplications = async () => {
      const appsRef = collection(db, "applications");
      const snapshot = await getDocs(appsRef);
      const apps = {};
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.candidateId === "candidate1") {
          apps[data.jobId] = data.status;
        }
      });
      setApplications(apps);
    };

    fetchJobs();
    fetchProfile();
    fetchApplications();
  }, []);

  // Handle form changes
  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Save or update profile
  const handleSaveProfile = async () => {
    setLoading(true);
    const profileRef = doc(db, "candidates", "candidate1");
    try {
      if (profile) {
        await updateDoc(profileRef, formData);
        setProfile({ ...profile, ...formData });
      } else {
        await setDoc(profileRef, formData);
        setProfile(formData);
      }
      setEditProfile(false);
    } catch (err) {
      console.error("Error saving profile:", err);
    } finally {
      setLoading(false);
    }
  };

  // Search filter
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    setFilteredJobs(
      jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.type?.toLowerCase().includes(query)
      )
    );
  };

  // Open modal for application
  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setCoverLetter("");
    setOpenModal(true);
  };

  // Submit application
  const handleSubmitApplication = async () => {
    if (!selectedJob || !profile) return;
    setApplying(true);

    try {
      const appRef = doc(db, "applications", `${selectedJob.id}_candidate1`);
      await setDoc(appRef, {
        jobId: selectedJob.id,
        candidateId: "candidate1",
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

  // Status button config
  const getStatusButton = (status) => {
    const config = {
      Applied: { color: "secondary", text: "Applied" },
      Reviewed: { color: "warning", text: "Reviewed" },
      Shortlisted: { color: "success", text: "Shortlisted ✅" },
      Rejected: { color: "error", text: "Rejected ❌" },
    };
    return config[status] || { color: "primary", text: "Apply Now" };
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9f9f9", pb: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: "350px",
          backgroundImage: "url(/images/hero-banner-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          mb: 4,
          px: 2,
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.4)" }} />
        <Typography variant="h3" sx={{ fontWeight: "bold", position: "relative", zIndex: 1, mb: 2 }}>
          Find Your Dream Job Today!
        </Typography>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: "5px",
            display: "flex",
            width: { xs: "90%", sm: "60%" },
            boxShadow: 3,
            p: 1,
            position: "relative",
            zIndex: 1,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search by job title, location, or type (Remote/On-site)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={handleSearch} sx={{ ml: 1, px: 4 }}>
            Search
          </Button>
        </Box>
      </Box>

      <Container>
        {/* Profile Section */}
        {!profile || editProfile ? (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5">{profile ? "Update Your Profile" : "Create Your Profile"}</Typography>
            <TextField fullWidth margin="normal" label="Full Name" name="name" value={formData.name} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Skills" name="skills" value={formData.skills} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Experience" name="experience" value={formData.experience} onChange={handleChange} />
            <Button variant="contained" color="primary" onClick={handleSaveProfile} disabled={loading} sx={{ mt: 2 }}>
              {loading ? <CircularProgress size={24} /> : "Save Profile"}
            </Button>
          </Paper>
        ) : (
          <Paper sx={{ p: 3, mb: 4, textAlign: "center" }}>
            <Typography variant="h6">Welcome, {profile.name}! 🎉</Typography>
            <Typography>Skills: {profile.skills}</Typography>
            <Typography>Experience: {profile.experience}</Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setFormData(profile);
                setEditProfile(true);
              }}
              sx={{ mt: 2 }}
            >
              Update Profile
            </Button>
          </Paper>
        )}

        {/* Jobs Section */}
        <Typography variant="h4" gutterBottom>
          Available Jobs
        </Typography>
        <Grid container spacing={3}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const status = applications[job.id];
              const { color, text } = getStatusButton(status);

              return (
                <Grid item xs={12} sm={6} md={4} key={job.id}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      boxShadow: 4,
                      transition: "0.3s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {job.description}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      💰 Salary: <b>{job.salary}</b>
                    </Typography>
                    <Typography>📍 Location: <b>{job.location}</b></Typography>
                    <Typography>🏢 Type: <b>{job.type || "N/A"}</b></Typography>

                    <Button
                      variant="contained"
                      color={color}
                      disabled={!!status}
                      onClick={() => handleApplyClick(job)}
                      sx={{ mt: 2, borderRadius: "20px" }}
                    >
                      {text}
                    </Button>
                  </Paper>
                </Grid>
              );
            })
          ) : (
            <Typography sx={{ mt: 3 }}>No jobs found.</Typography>
          )}
        </Grid>
      </Container>

      {/* Apply Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Submit Application</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={5}
            label="Cover Letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitApplication} disabled={applying}>
            {applying ? <CircularProgress size={24} color="inherit" /> : "Submit Application"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
