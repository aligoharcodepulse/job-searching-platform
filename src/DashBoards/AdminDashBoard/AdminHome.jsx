import { Typography, Box } from "@mui/material";

export default function AdminHome() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome, Admin 🎉
      </Typography>
      <Typography variant="body1">
        This is your Admin Dashboard. From here, you can manage jobs, employees, and candidates.
      </Typography>
    </Box>
  );
}
