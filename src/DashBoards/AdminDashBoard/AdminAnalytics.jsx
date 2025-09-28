import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { People, Work, Assignment, HowToReg } from "@mui/icons-material";

export default function AdminAnalytics() {
  const [stats, setStats] = useState({
    candidates: 0,
    verifiedEmployers: 0,
    jobs: 0,
    applications: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Total Candidates
        const candSnap = await getDocs(collection(db, "candidates"));

        // Verified Employers
        const verEmpQuery = query(
          collection(db, "verificationRequests"),
          where("status", "==", "approved")
        );
        const verEmpSnap = await getDocs(verEmpQuery);

        // Jobs
        const jobsSnap = await getDocs(collection(db, "jobs"));

        // Applications
        const appsSnap = await getDocs(collection(db, "applications"));

        setStats({
          candidates: candSnap.size,
          verifiedEmployers: verEmpSnap.size,
          jobs: jobsSnap.size,
          applications: appsSnap.size,
        });
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };

    fetchStats();
  }, []);

  const cardData = [
    {
      title: "Total Candidates",
      value: stats.candidates,
      icon: <People fontSize="large" color="primary" />,
      bg: "#e3f2fd",
    },
    {
      title: "Verified Employers",
      value: stats.verifiedEmployers,
      icon: <HowToReg fontSize="large" color="success" />,
      bg: "#e8f5e9",
    },
    {
      title: "Jobs Posted",
      value: stats.jobs,
      icon: <Work fontSize="large" color="secondary" />,
      bg: "#f3e5f5",
    },
    {
      title: "Applications Submitted",
      value: stats.applications,
      icon: <Assignment fontSize="large" color="warning" />,
      bg: "#fff8e1",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center" sx={{mb:3}}>
        📊 Site Analytics
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {cardData.map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                bgcolor: item.bg,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                {item.icon}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="h4" color="text.primary" sx={{ mt: 1 }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
