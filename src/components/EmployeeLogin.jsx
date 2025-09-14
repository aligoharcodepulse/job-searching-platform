import { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Link,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false); // ✅ success modal state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        // ✅ Create Firebase User
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // ✅ Store employee profile in Firestore
        await setDoc(doc(db, "employees", userCred.user.uid), {
          email,
          createdAt: new Date(),
        });

        setSuccessModal(true); // ✅ show success modal
        setIsSignUp(false);
      } else {
        // ✅ Sign In
        const userCred = await signInWithEmailAndPassword(auth, email, password);

        const profileRef = doc(db, "employees", userCred.user.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          localStorage.setItem("employeeAuth", userCred.user.uid);
          navigate(`/employee-dashboard/${userCred.user.uid}`);
        } else {
          setError("No profile found ❌");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
      <Paper
        elevation={6}
        sx={{ p: 4, maxWidth: 400, width: "100%", borderRadius: 2 }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <WorkIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="bold">
            {isSignUp ? "Create Employee Account" : "Employee Login"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2, bgcolor: "success.main" }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : isSignUp ? (
                "Sign Up"
              ) : (
                "Sign In"
              )}
            </Button>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link
                href="#"
                variant="body2"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Already have an account? Login" : "Create Account"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* ✅ Success Modal */}
      <Dialog open={successModal} onClose={() => setSuccessModal(false)}>
        <DialogTitle>🎉 Account Created Successfully</DialogTitle>
        <DialogContent>
          <Typography>
            Your employee account has been created. Please log in to continue.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSuccessModal(false)}
            variant="contained"
            color="success"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
