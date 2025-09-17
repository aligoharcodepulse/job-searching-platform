import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Container,
  Grid,
} from "@mui/material";

export default function CandidateHome() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    experience: "",
  });

  // Load jobs and candidate profile
  useEffect(() => {
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
      const profileRef = doc(db, "candidates", "candidate1"); // replace candidate1 with auth UID later
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        setProfile(profileSnap.data());
      }
    };

    fetchJobs();
    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Save or update profile
  const handleSaveProfile = async () => {
    const profileRef = doc(db, "candidates", "candidate1"); // replace candidate1 with auth UID later
    if (profile) {
      await updateDoc(profileRef, formData);
      setProfile({ ...profile, ...formData });
    } else {
      await setDoc(profileRef, formData);
      setProfile(formData);
    }
  };

  // Job search filter
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.type?.toLowerCase().includes(query) // remote/on-site
    );
    setFilteredJobs(filtered);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9f9f9" }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: "350px",
          backgroundImage:
            "url(/images/hero-banner-1.jpg)",
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
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            bgcolor: "rgba(0,0,0,0.3)",
            p: 2,
            borderRadius: 1,
            mb: 2,
          }}
        >
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
          }}
        >
          <TextField
            fullWidth
            placeholder="Search by job title, location, or type (Remote/On-site)"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ bgcolor: "white", borderRadius: "5px" }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSearch}
            sx={{
              ml: 1,
              borderRadius: "5px",
              px: 4,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Search
          </Button>
        </Box>
      </Box>

      <Container>
        {/* Profile Section */}
        {!profile ? (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Create Your Profile
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveProfile}
              sx={{ mt: 2 }}
            >
              Save Profile
            </Button>
          </Paper>
        ) : (
          <Paper sx={{ p: 3, mb: 4, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Welcome, {profile.name}! 🎉
            </Typography>
            <Typography>Skills: {profile.skills}</Typography>
            <Typography>Experience: {profile.experience}</Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setProfile(null)} // reset to edit
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
            filteredJobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 4,
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.05)", boxShadow: 8 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                  >
                    {job.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {job.description}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    💰 Salary: <b>{job.salary}</b>
                  </Typography>
                  <Typography>
                    📍 Location: <b>{job.location}</b>
                  </Typography>
                  <Typography>
                    🏢 Type: <b>{job.type || "N/A"}</b>
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, borderRadius: "20px", textTransform: "none" }}
                  >
                    Apply Now
                  </Button>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography sx={{ mt: 3, ml: 2 }}>
              ❌ No jobs found for your search.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
