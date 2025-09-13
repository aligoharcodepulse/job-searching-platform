import React from "react";
import { Avatar, Button, TextField, Typography, Box, Paper, Link } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export default function CandidateLogin() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f3e5f5, #e1bee7)",
        p: 2,
        width:"97vw"
      }}
    >
      <Paper elevation={6} sx={{ p: 4, maxWidth: 400, width: "100%", borderRadius: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Candidate Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <TextField margin="normal" required fullWidth label="Candidate Email" type="email" />
            <TextField margin="normal" required fullWidth label="Password" type="password" />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 1, bgcolor: "secondary.main" }}
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
