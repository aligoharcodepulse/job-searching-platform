import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import {
  doc,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  CircularProgress,
} from "@mui/material";
import EmployerVerification from "./EmployerVerification";
import PostJob from "./PostJob";

export default function EmployerHome() {
  const employerId = localStorage.getItem("employerAuth");
  const [status, setStatus] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [showPostJob, setShowPostJob] = useState(false);
  const [showEditJob, setShowEditJob] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [applicantCounts, setApplicantCounts] = useState({});
  const [openApplicants, setOpenApplicants] = useState(false);
  const [selectedJobApplicants, setSelectedJobApplicants] = useState(null);

  const [loadingStatus, setLoadingStatus] = useState(null); // ✅ Track which applicant is loading

  useEffect(() => {
    if (!employerId) return;

    // Employer verification
    const unsub = onSnapshot(doc(db, "verificationRequests", employerId), (snap) => {
      if (snap.exists()) {
        setStatus(snap.data().status);
      } else {
        setStatus(null);
      }
    });

    // Employer's jobs (real-time)
    const q = query(collection(db, "jobs"), where("employerId", "==", employerId));
    const unsubJobs = onSnapshot(q, (snap) => {
      const jobsData = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setJobs(jobsData);

      // ✅ Track real-time applicant counts for each job
      jobsData.forEach((job) => {
        const appsQuery = query(collection(db, "applications"), where("jobId", "==", job.id));
        onSnapshot(appsQuery, (appSnap) => {
          setApplicantCounts((prev) => ({
            ...prev,
            [job.id]: appSnap.size,
          }));
        });
      });
    });

    return () => {
      unsub();
      unsubJobs();
    };
  }, [employerId]);

  // ✅ Post job
  const handleJobPost = async (jobData) => {
    await addDoc(collection(db, "jobs"), {
      ...jobData,
      employerId,
      createdAt: new Date(),
    });
    setShowPostJob(false);
  };

  // ✅ Delete job
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "jobs", id));
  };

  // ✅ Start edit mode
  const handleEdit = (job) => {
    setCurrentJob(job);
    setShowEditJob(true);
  };

  // ✅ Update job
  const handleUpdateJob = async (updatedJob) => {
    if (!currentJob) return;
    await updateDoc(doc(db, "jobs", currentJob.id), updatedJob);
    setShowEditJob(false);
    setCurrentJob(null);
  };

  // ✅ Open applicants modal (fetch from applications collection)
  const handleViewApplicants = async (job) => {
    const q = query(collection(db, "applications"), where("jobId", "==", job.id));
    const snapshot = await getDocs(q);

    const applicants = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    setSelectedJobApplicants({ ...job, applicants });
    setOpenApplicants(true);
  };

  // ✅ Change applicant status (with loader)
  const handleStatusChange = async (applicationId, newStatus) => {
    setLoadingStatus(applicationId); // ✅ show loader for this applicant
    const appRef = doc(db, "applications", applicationId);
    await updateDoc(appRef, { status: newStatus });

    // update local state
    setSelectedJobApplicants((prev) => ({
      ...prev,
      applicants: prev.applicants.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      ),
    }));

    setLoadingStatus(null); // ✅ stop loader
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Employer Dashboard</Typography>

      {/* 🔹 Verification / Job Posting Flow */}
      {status === "approved" ? (
        <Button
          variant="contained"
          color="success"
          sx={{ my: 2 }}
          onClick={() => setShowPostJob(true)}
        >
          Post a Job
        </Button>
      ) : status === "rejected" ? (
        <Typography color="error" sx={{ my: 2 }}>
          ❌ Your verification was rejected. You cannot post jobs.
        </Typography>
      ) : status === "pending" ? (
        <Button variant="contained" color="warning" sx={{ my: 2 }} disabled>
          Submitted ✅ (Pending Review)
        </Button>
      ) : (
        <Button
          variant="contained"
          color="warning"
          sx={{ my: 2 }}
          onClick={() => setShowVerification(true)}
        >
          Submit Verification
        </Button>
      )}

      {/* ✅ Verification Dialog */}
      <Dialog open={showVerification} onClose={() => setShowVerification(false)}>
        <DialogTitle>Verification Required</DialogTitle>
        <DialogContent>
          <EmployerVerification
            employerId={employerId}
            onClose={() => setShowVerification(false)}
          />
        </DialogContent>
      </Dialog>

      {/* ✅ Post Job Dialog */}
      <Dialog open={showPostJob} onClose={() => setShowPostJob(false)}>
        <DialogTitle>Post Job</DialogTitle>
        <DialogContent>
          <PostJob onSubmit={handleJobPost} />
        </DialogContent>
      </Dialog>

      {/* ✅ Edit Job Dialog */}
      <Dialog open={showEditJob} onClose={() => setShowEditJob(false)}>
        <DialogTitle>Edit Job</DialogTitle>
        <DialogContent>
          {currentJob && (
            <PostJob onSubmit={handleUpdateJob} initialData={currentJob} />
          )}
        </DialogContent>
      </Dialog>

      {/* ✅ Employer's Jobs */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          My Posted Jobs
        </Typography>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Box
              key={job.id}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                mb: 2,
              }}
            >
              <Typography variant="h6">{job.title}</Typography>
              <Typography>📍 Location: {job.location}</Typography>
              <Typography>💰 Salary: {job.salary}</Typography>
              <Typography>🛠️ Type: {job.type}</Typography>
              <Typography sx={{ mt: 1 }}>{job.description}</Typography>

              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(job)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleViewApplicants(job)}
                >
                  Applicants Applied ({applicantCounts[job.id] || 0})
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No jobs posted yet.</Typography>
        )}
      </Box>

      {/* ✅ Applicants Modal */}
      <Dialog
        open={openApplicants}
        onClose={() => setOpenApplicants(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Applicants</DialogTitle>
        <DialogContent>
          {selectedJobApplicants?.applicants?.length > 0 ? (
            selectedJobApplicants.applicants.map((app) => (
              <Paper
                key={app.id}
                sx={{ p: 2, mb: 2, border: "1px solid #ddd", borderRadius: 2 }}
              >
                <Typography variant="h6">{app.profile?.name}</Typography>
                <Typography>Skills: {app.profile?.skills}</Typography>
                <Typography>Experience: {app.profile?.experience}</Typography>
                <Typography>Cover Letter: {app.coverLetter}</Typography>
                <Typography>Status: {app.status}</Typography>

                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => handleStatusChange(app.id, "Reviewed")}
                    disabled={loadingStatus === app.id}
                  >
                    {loadingStatus === app.id ? (
                      <CircularProgress size={20} />
                    ) : (
                      "Reviewed"
                    )}
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleStatusChange(app.id, "Shortlisted")}
                    disabled={loadingStatus === app.id}
                  >
                    {loadingStatus === app.id ? (
                      <CircularProgress size={20} />
                    ) : (
                      "Shortlist"
                    )}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleStatusChange(app.id, "Rejected")}
                    disabled={loadingStatus === app.id}
                  >
                    {loadingStatus === app.id ? (
                      <CircularProgress size={20} />
                    ) : (
                      "Reject"
                    )}
                  </Button>
                </Box>
              </Paper>
            ))
          ) : (
            <Typography>No applicants yet.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApplicants(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
