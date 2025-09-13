import { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Link,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Hardcoded validation
    if (email === "admin@gmail.com" && password === "admin123") {
      navigate("/admin-dashboard"); // redirect to AdminHome
    } else {
      setError("Invalid credentials! Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        width: "97vw",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{ p: 4, maxWidth: 400, width: "100%", borderRadius:2}}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <SecurityIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Admin Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Admin Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 1, bgcolor: "primary.main" }}
            >
              Sign In
            </Button>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link href="#" variant="body2">
                Forgot Password?
              </Link>
              <Link href="#" variant="body2">
                Create Account
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
