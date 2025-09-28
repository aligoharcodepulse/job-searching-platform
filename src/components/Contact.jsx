import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields filled
    if (!form.name || !form.email || !form.message) return;

    try {
      await addDoc(collection(db, "messages"), {
        name: form.name,
        email: form.email,
        message: form.message,
        createdAt: serverTimestamp(),
      });

      setOpen(true); // show snackbar
      setForm({ name: "", email: "", message: "" }); // reset form
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        bgcolor: "#f9f9f9",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          We'd love to hear from you! Fill out the form below and our team will
          get back to you as soon as possible.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Your Name"
            name="name"
            margin="normal"
            variant="outlined"
            required
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Your Email"
            name="email"
            margin="normal"
            type="email"
            variant="outlined"
            required
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            margin="normal"
            multiline
            rows={4}
            variant="outlined"
            required
            value={form.message}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              mt: 3,
              py: 1.2,
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Send Message
          </Button>
        </form>
      </Paper>

      {/* Snackbar for success */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setOpen(false)}>
          Message Sent Successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
