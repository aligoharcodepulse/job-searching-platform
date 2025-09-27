import { Box, Typography, TextField, Button, Paper } from "@mui/material";

export default function Contact() {
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
        {/* Heading */}
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

        {/* Form */}
        <TextField
          fullWidth
          label="Your Name"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Your Email"
          margin="normal"
          type="email"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Message"
          margin="normal"
          multiline
          rows={4}
          variant="outlined"
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.2,
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          Send Message
        </Button>
      </Paper>
    </Box>
  );
}
