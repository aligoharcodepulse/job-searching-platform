import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

export default function PostJob({ onSubmit, initialData }) {
  const [job, setJob] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    type: "onsite",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "success",
    msg: "",
  });

  // ✅ Load existing data if editing
  useEffect(() => {
    if (initialData) {
      setJob({
        title: initialData.title || "",
        description: initialData.description || "",
        salary: initialData.salary || "",
        location: initialData.location || "",
        type: initialData.type || "onsite",
      });
    }
  }, [initialData]);

  const handleChange = (e) =>
    setJob({ ...job, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(job);
      setSnackbar({
        open: true,
        type: "success",
        msg: initialData ? "Job updated successfully!" : "Job posted successfully!",
      });
      if (!initialData) {
        setJob({ title: "", description: "", salary: "", location: "", type: "onsite" });
      }
    } catch (err) {
      setSnackbar({ open: true, type: "error", msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Job Title"
        name="title"
        margin="normal"
        value={job.title}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        margin="normal"
        multiline
        rows={3}
        value={job.description}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        label="Salary"
        name="salary"
        margin="normal"
        value={job.salary}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Location"
        name="location"
        margin="normal"
        value={job.location}
        onChange={handleChange}
      />

      {/* ✅ Remote / Onsite Radio Buttons */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Job Type</Typography>
        <RadioGroup
          row
          name="type"
          value={job.type}
          onChange={handleChange}
        >
          <FormControlLabel value="onsite" control={<Radio />} label="Onsite" />
          <FormControlLabel value="remote" control={<Radio />} label="Remote" />
        </RadioGroup>
      </Box>

      {/* ✅ Loader on Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : initialData ? "Update Job" : "Post Job"}
      </Button>

      {/* ✅ Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
