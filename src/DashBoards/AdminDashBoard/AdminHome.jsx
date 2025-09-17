import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";

export default function AdminHome() {
  const [employers, setEmployers] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [openJobsDialog, setOpenJobsDialog] = useState(false);

  useEffect(() => {
    const fetchEmployers = async () => {
      const snap = await getDocs(
        query(
          collection(db, "verificationRequests"),
          where("status", "==", "approved")
        )
      );
      setEmployers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchEmployers();
  }, []);

  const handleBlock = async (id) => {
    setLoadingId(id);
    try {
      // Block employer
      await updateDoc(doc(db, "verificationRequests", id), { status: "blocked" });

      // Delete all jobs posted by this employer
      const snap = await getDocs(
        query(collection(db, "jobs"), where("employerId", "==", id))
      );
      const deletePromises = snap.docs.map((d) => deleteDoc(doc(db, "jobs", d.id)));
      await Promise.all(deletePromises);

      // Remove from state
      setEmployers((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleViewJobs = async (employerId) => {
    try {
      const snap = await getDocs(
        query(collection(db, "jobs"), where("employerId", "==", employerId))
      );
      setJobs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setOpenJobsDialog(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteDoc(doc(db, "jobs", jobId));
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Verified Employers
      </Typography>

      {/* Grid layout for employer cards */}
      <Grid container spacing={4}>
        {employers.map((emp) => (
          <Grid item xs={12} sm={6} md={4} key={emp.id}>
            <Card sx={{ p: 2, height: "100%" }}>
              <CardContent>
                <Typography variant="h6">{emp.name}</Typography>
                <Typography>{emp.email}</Typography>

                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleBlock(emp.id)}
                    disabled={loadingId === emp.id}
                  >
                    {loadingId === emp.id ? (
                      <CircularProgress size={20} sx={{ color: "white" }} />
                    ) : (
                      "Block"
                    )}
                  </Button>

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleViewJobs(emp.id)}
                  >
                    Posted Jobs
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ✅ Jobs Dialog */}
      <Dialog
        open={openJobsDialog}
        onClose={() => setOpenJobsDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Jobs Posted</DialogTitle>
        <DialogContent>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Box
                key={job.id}
                sx={{
                  border: "1px solid #ccc",
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

                <Button
                  variant="outlined"
                  color="error"
                  sx={{ mt: 1 }}
                  onClick={() => handleDeleteJob(job.id)}
                >
                  Delete Job
                </Button>
              </Box>
            ))
          ) : (
            <Typography>No jobs posted yet.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
