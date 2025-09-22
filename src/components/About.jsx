import { Box, Typography, Grid, Paper } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ p: 4, maxWidth: "900px", mx: "auto" }}>
      <Typography 
      variant="h3" 
      fontWeight="bold" 
      gutterBottom 
      textAlign="center"
      >
      About JobSphere
      </Typography>

      <Typography 
      variant="h6" 
      color="text.secondary" 
      textAlign="center" 
      mb={4}
      >
        Connecting job seekers with verified employers through a secure, seamless platform making hiring  experience effective, faster, safer, and smarter.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper 
          sx={{ 
            p: 3, 
            borderRadius: 3, 
            textAlign: "center", 
            boxShadow: 3,
            minHeight: "220px",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              🎯 Our Mission
            </Typography>
            <Typography color="text.secondary" mt={2}>
              Our mission is to revolutionize the hiring process by connecting job seekers
              with verified opportunities, enabling one-click applications, and providing 
              live status tracking while empowering employers with a simple, transparent, 
              and trustworthy way to manage candidates. We aim to make job hunting and 
              recruitment seamless, authentic, and stress-free for everyone.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
          sx={{ 
            p: 3, 
            borderRadius: 3, 
            textAlign: "center", 
            boxShadow: 3,
            minHeight: "220px",
            }}
            >
            <Typography variant="h5" fontWeight="bold">
              👥 Our Team
            </Typography>
            <Typography color="text.secondary" mt={2}>
              A group of passionate developers — Muhammad Ali, Shumaila Riaz, Faizan Javed Ghumman,
              Waariha Asim, and Mehak Iqbhal came together to build JobSphere. It is the result of 
              our shared vision to create a smarter and safer job search experience. By combining 
              creativity with technology, we designed a platform that connects job seekers with 
              verified employers while promoting trust, transparency, and efficiency in the hiring 
              process.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
          sx={{
            p: 3, 
            borderRadius: 3, 
            textAlign: "center", 
            boxShadow: 3,
            minHeight: "220px",
          }}
          >
            <Typography variant="h5" fontWeight="bold">
              🔒 Trust & Safety
            </Typography>
            <Typography color="text.secondary" mt={2}>
              At JobSphere, trust and safety are at the heart of our platform. Only verified job 
              posters are allowed to publish jobs, and every listing goes through a verification 
              process to ensure authenticity. This approach minimizes fake postings, prevents scams,
              and protects candidates from misleading opportunities. By maintaining a network of 
              trustworthy employers, we create a reliable and transparent environment where job 
              seekers can confidently apply, knowing the opportunities they see are genuine and 
              secure.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box mt={5} textAlign="center">
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🚀 Key Features
        </Typography>
        <Typography color="text.secondary">
          ✅ Candidate Profiles with Resume, Skills, and Experience <br />
          ✅ Verified Job Posters for Authentic Job Listings <br />
          ✅ One-Click Apply & Application Status Tracking <br />
          ✅ Admin Dashboard for Approvals, Analytics, and Moderation
        </Typography>
      </Box>
</Box>
  );
}
