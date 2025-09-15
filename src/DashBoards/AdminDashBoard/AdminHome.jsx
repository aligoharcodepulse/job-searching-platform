import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

export default function AdminHome() {
  const [requests, setRequests] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      const snap = await getDocs(collection(db, "verificationRequests"));
      setRequests(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    setLoadingId(id);
    try {
      await updateDoc(doc(db, "verificationRequests", id), {
        status: action,
      });
      setRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: action } : r
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Admin Dashboard</Typography>

      {requests.map((req) => (
        <Paper key={req.id} sx={{ p: 2, my: 2 }}>
          <Typography fontWeight="bold">{req.name}</Typography>
          <Typography>{req.email}</Typography>
          <Typography>Status: {req.status}</Typography>

          {req.status === "pending" && (
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleAction(req.id, "approved")}
                disabled={loadingId === req.id}
              >
                {loadingId === req.id ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Approve"}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleAction(req.id, "rejected")}
                disabled={loadingId === req.id}
              >
                {loadingId === req.id ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Reject"}
              </Button>
            </Box>
          )}
        </Paper>
      ))}
    </Box>
  );
}
