import { useState } from "react";
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

export default function PostJob({ onSubmit }) {
  const [job, setJob] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    type: "onsite", // default job type
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, type: "success", msg: "" });

  const handleChange = (e) =>
    setJob({ ...job, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(job); // calling parent function
      setSnackbar({ open: true, type: "success", msg: "Job posted successfully!" });
      setJob({ title: "", description: "", salary: "", location: "", type: "onsite" }); // reset form
    } catch (err) {
      setSnackbar({ open: true, type: "error", msg: err });
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
        color="primary"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Post Job"}
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
