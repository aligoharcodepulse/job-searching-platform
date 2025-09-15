import { Box, Typography, TextField, Button } from "@mui/material";

export default function Contact() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Contact Us</Typography>
      <Box sx={{ mt: 2, maxWidth: 400 }}>
        <TextField fullWidth label="Your Name" margin="normal" />
        <TextField fullWidth label="Your Email" margin="normal" />
        <TextField
          fullWidth
          label="Message"
          margin="normal"
          multiline
          rows={3}
        />
        <Button variant="contained" sx={{ mt: 2 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
}
