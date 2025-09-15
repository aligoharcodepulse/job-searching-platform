import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { db } from "../../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function EmployerVerification({ employerId, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", details: "" });
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!employerId) {
      alert("Employer ID is missing. Please log in again.");
      return;
    }

    if (!form.name || !form.email || !form.details) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await setDoc(doc(db, "verificationRequests", employerId), {
        ...form,
        status: "pending",
        createdAt: new Date(),
      });

      setSuccessOpen(true);
    } catch (err) {
      console.error("Error submitting verification request:", err);
      alert("Failed to submit verification request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Details"
          name="details"
          value={form.details}
          onChange={handleChange}
          required
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Verification"}
        </Button>
      </Box>

      {/* ✅ Success Dialog */}
      <Dialog open={successOpen} onClose={() => setSuccessOpen(false)}>
        <DialogTitle>🎉 Verification Request Sent</DialogTitle>
        <DialogContent>
          <Typography>
            Your verification request has been submitted to the admin. Please wait for approval.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setSuccessOpen(false);
              if (onClose) onClose(); // Close parent dialog
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
