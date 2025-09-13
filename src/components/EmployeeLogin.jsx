import React from "react";
import { Avatar, Button, TextField, Typography, Box, Paper, Link } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

export default function EmployeeLogin() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
        p: 2,
      }}
    >
      <Paper elevation={6} sx={{ p: 4, maxWidth: 400, width: "100%", borderRadius: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <WorkIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Employee Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <TextField margin="normal" required fullWidth label="Employee Email" type="email" />
            <TextField margin="normal" required fullWidth label="Password" type="password" />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 3, bgcolor: "success.main" }}
            >
              Sign In
            </Button>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link href="#" variant="body2">Forgot Password?</Link>
              <Link href="#" variant="body2">Create Account</Link>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
