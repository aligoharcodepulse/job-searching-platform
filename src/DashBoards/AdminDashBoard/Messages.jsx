import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); // Track message being deleted

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleRead = async (id) => {
    setDeletingId(id); // show loader for this message
    try {
      await deleteDoc(doc(db, "messages", id));
      setMessages((prev) => prev.filter((msg) => msg.id !== id)); // remove from UI
    } catch (error) {
      console.error("Error deleting message:", error);
    } finally {
      setDeletingId(null); // reset loader
    }
  };

  if (loading) return <CircularProgress sx={{ m: 5 }} />;

  return (
    <Grid container spacing={3} p={3}>
      {messages.map((msg) => (
        <Grid item xs={12} sm={6} md={4} key={msg.id}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {msg.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {msg.email}
              </Typography>
              <Typography variant="body1" mt={1}>
                {msg.message}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                mt={2}
              >
                {msg.createdAt?.toDate().toLocaleString() || "Just Now"}
              </Typography>
            </CardContent>
            <Button
              onClick={() => handleRead(msg.id)}
              color="primary"
              variant="contained"
              sx={{ borderRadius: 2, m: 2, textTransform: "none" }}
              disabled={deletingId === msg.id}
            >
              {deletingId === msg.id ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Mark as Read"
              )}
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Messages;
