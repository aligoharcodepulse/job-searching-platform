import { Box, Typography } from "@mui/material";

export default function Support() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Support / FAQs</Typography>
      <Typography sx={{ mt: 2 }}>
        ❓ How to post a job? → First complete verification, then click on Post
        Job.  
        ❓ How to view applicants? → Click on the posted job.  
        ❓ How to contact support? → Email us at support@jobsphere.com
      </Typography>
    </Box>
  );
}
