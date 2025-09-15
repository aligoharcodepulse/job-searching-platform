import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Box, Typography, Paper } from "@mui/material";

export default function CandidateHome() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const snapshot = await getDocs(collection(db, "jobs"));
      setJobs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchJobs();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Available Jobs</Typography>
      {jobs.map((job) => (
        <Paper key={job.id} sx={{ p: 2, my: 1 }}>
          <Typography variant="h6">{job.title}</Typography>
          <Typography>{job.description}</Typography>
          <Typography>Salary: {job.salary}</Typography>
          <Typography>Location: {job.location}</Typography>
        </Paper>
      ))}
    </Box>
  );
}
