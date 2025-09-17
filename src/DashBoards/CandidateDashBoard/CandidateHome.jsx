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
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
  const [candidateId, setCandidateId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", skills: "", experience: "" });

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
      const jobsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setJobs(jobsData);
      setFilteredJobs(jobsData);
    };

    const fetchProfile = async () => {
      const profileRef = doc(db, "candidates", candidateId);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        const data = profileSnap.data();

        // ✅ Check if data has actual values
        if (data.name || data.skills || data.experience) {
          setProfile(data);
          setFormData(data);
        } else {
          setProfile(null);
          setFormData({ name: "", skills: "", experience: "" });
        }
      } else {
        setProfile(null); // no profile → first-time login
        setFormData({ name: "", skills: "", experience: "" }); // clear form
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

  // Handle form changes
  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Save or update profile
  const handleSaveProfile = async () => {
    setLoading(true);
    const profileRef = doc(db, "candidates", candidateId);
    try {
      if (profile) {
        await updateDoc(profileRef, formData);
        setProfile({ ...profile, ...formData });
      } else {
        await setDoc(profileRef, formData);
        setProfile(formData); // ✅ set profile after first save
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
      const appRef = doc(db, "applications", `${selectedJob.id}_${candidateId}`);
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

  // Status button config
  const getStatusButton = (status) => {
    const config = {
      Applied: { color: "secondary", text: "Applied" },
      Reviewed: { color: "warning", text: "Reviewed" },
      Shortlisted: { color: "success", text: "Shortlisted ✅" },
      Rejected: { color: "error", text: "Rejected ❌" },
    };
    return config[status] || { color: "secondary", text: "Apply Now" };
  };

  // If user not logged in
  if (!candidateId) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6">Please log in to access your dashboard.</Typography>
      </Box>
    );
  }

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
        {!profile ? (
          // Create profile (first time)
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5">Create Your Profile</Typography>
            <TextField fullWidth margin="normal" label="Full Name" name="name" value={formData.name} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Skills" name="skills" value={formData.skills} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Experience" name="experience" value={formData.experience} onChange={handleChange} />
            <Button variant="contained" color="secondary" onClick={handleSaveProfile} disabled={loading} sx={{ mt: 2 }}>
              {loading ? <CircularProgress size={24} /> : "Save Profile"}
            </Button>
          </Paper>
        ) : editProfile ? (
          // Update profile (only after clicking update)
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5">Update Your Profile</Typography>
            <TextField fullWidth margin="normal" label="Full Name" name="name" value={formData.name} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Skills" name="skills" value={formData.skills} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Experience" name="experience" value={formData.experience} onChange={handleChange} />
            <Button variant="contained" color="secondary" onClick={handleSaveProfile} disabled={loading} sx={{ mt: 2 }}>
              {loading ? <CircularProgress size={24} /> : "Update Profile"}
            </Button>
          </Paper>
        ) : (
          // Profile summary (default after profile created)
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
            {applying ? <CircularProgress size={24} color="secondary" /> : "Submit Application"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
