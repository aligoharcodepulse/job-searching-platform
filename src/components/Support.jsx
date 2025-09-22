import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Support() {
  return (
    <Box sx={{ p: 4, maxWidth: "900px", mx: "auto" }}>
      <Typography 
       variant="h3" 
       fontWeight="bold" 
       gutterBottom 
       textAlign="center"
        sx={{ mb: 2 }}
       >
        Support & FAQs
      </Typography>
      <Typography 
       variant="h6" 
       color="text.secondary" 
       textAlign="center"
       mb={5}
       >
        We're here to help you get the most out of JobSphere.  
        Explore our frequently asked questions or reach out if you need more assistance.
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">
            How do I create a profile? (Candidate/JobSeeker)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="text.secondary">
            Register using your email and password. Once logged in and directed to your dashboard 
            then click “Create Profile” to add your name,
            skills, and work experience.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">
            How can I post a job? (Employer)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="text.secondary">
            First, apply for verification as a job poster. After approval, you can create 
            and publish job listings directly from your dashboard. Every posting is visible 
            instantly to candidates.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">
            How do I track my applications? (Candidate/JobSeeker)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="text.secondary">
            Go to “Home” in your dashboard to see job status. You can see live updates for 
            each application, including whether it's been Reviewed, Shortlisted, or Rejected.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">
              How can I contact support?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
              If you need help beyond these FAQs, you can reach us at{" "}
              <strong>support@jobsphere.com</strong> or fill the contact form inside the contact section.
               Our team is ready to assist you.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>

      {/* <Typography
        variant="body1"
        textAlign="center"
        color="text.secondary"
        mt={5}
      >
        💡 Tip: Keep your profile updated to increase your chances of getting
        shortlisted by verified employers!
      </Typography> */}
    </Box>
  );
}