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
} from "firebase/firestore";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import EmployerVerification from "./EmployerVerification";
import PostJob from "./PostJob";

export default function EmployerHome() {
  const employerId = localStorage.getItem("employerAuth");
  const [status, setStatus] = useState(null); // null until fetched
  const [showVerification, setShowVerification] = useState(false);
  const [showPostJob, setShowPostJob] = useState(false);

  // 🔹 New state for editing jobs
  const [showEditJob, setShowEditJob] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!employerId) return;

    // Watch verification status
    const unsub = onSnapshot(doc(db, "verificationRequests", employerId), (snap) => {
      if (snap.exists()) {
        setStatus(snap.data().status);
      } else {
        setStatus(null); // no request submitted
      }
    });

    // Watch posted jobs
    const q = query(collection(db, "jobs"), where("employerId", "==", employerId));
    const unsubJobs = onSnapshot(q, (snap) => {
      setJobs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
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
      applicants: [],
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
        <Button
          variant="contained"
          color="warning"
          sx={{ my: 2 }}
          disabled
        >
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
            <PostJob
              onSubmit={handleUpdateJob}
              initialData={currentJob} // pass current job for pre-filled form
            />
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
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No jobs posted yet.</Typography>
        )}
      </Box>
    </Box>
  );
}
