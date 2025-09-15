import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">About Us</Typography>
      <Typography sx={{ mt: 2 }}>
        JobSphere connects employers with top candidates through a seamless
        hiring process.
      </Typography>
    </Box>
  );
}
