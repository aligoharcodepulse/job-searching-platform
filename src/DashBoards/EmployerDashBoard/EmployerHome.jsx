import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { doc,  addDoc, collection, onSnapshot } from "firebase/firestore";
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
  const [status, setStatus] = useState("pending");
  const [showVerification, setShowVerification] = useState(false);
  const [showPostJob, setShowPostJob] = useState(false);

  useEffect(() => {
    if (!employerId) return;
    const unsub = onSnapshot(doc(db, "verificationRequests", employerId), (snap) => {
      if (snap.exists()) {
        setStatus(snap.data().status);
      }
    });
    return () => unsub();
  }, [employerId]);

  const handleJobPost = async (jobData) => {
    await addDoc(collection(db, "jobs"), {
      ...jobData,
      employerId,
      applicants: [],
      createdAt: new Date(),
    });
    setShowPostJob(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Employer Dashboard</Typography>

      {status === "approved" ? (
        <Button
          variant="contained"
          color="primary"
          sx={{ my: 2 }}
          onClick={() => setShowPostJob(true)}
        >
          Post a Job
        </Button>
      ) : status === "rejected" ? (
        <Typography color="error" sx={{ my: 2 }}>
          ❌ Your verification was rejected. You cannot post jobs.
        </Typography>
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

      {/* Verification Dialog */}
      <Dialog open={showVerification} onClose={() => setShowVerification(false)}>
        <DialogTitle>Verification Required</DialogTitle>
        <DialogContent>
          <EmployerVerification
            employerId={employerId}
            onClose={() => setShowVerification(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Post Job Dialog */}
      <Dialog open={showPostJob} onClose={() => setShowPostJob(false)}>
        <DialogTitle>Post Job</DialogTitle>
        <DialogContent>
          <PostJob onSubmit={handleJobPost} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
