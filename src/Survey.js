import React from "react";
import { Button, Container, TextField, Typography, Box, Grid, IconButton, TextareaAutosize } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

// Custom theme with green as primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", // Green primary color
    },
  },
});

// Define a mapping for the icons based on their value
const iconMap = {
  1: <SentimentVeryDissatisfiedIcon fontSize="large" />,
  2: <SentimentDissatisfiedIcon fontSize="large" />,
  3: <SentimentSatisfiedIcon fontSize="large" />,
  4: <SentimentSatisfiedAltIcon fontSize="large" />,
  5: <SentimentVerySatisfiedIcon fontSize="large" />,
};

const SurveyForm = ({ surveyData }) => {
  const renderElement = (element) => {
    switch (element.type) {
      case "text":
        return (
          <Box mb={3} key={element.name}>
            <TextField fullWidth id={element.name} name={element.name} label={element.title} required={element.isRequired} variant="outlined" InputLabelProps={{ shrink: true }} />
          </Box>
        );
      case "rating":
        return (
          <Box mb={3} key={element.name}>
            <Typography variant="subtitle1" gutterBottom>
              {element.title}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {element.rateValues.map((rate, index) => (
                <Grid item key={index}>
                  <IconButton color="primary" size="large" aria-label={`Rate ${rate.value}`} style={{ transition: "0.3s", borderRadius: "50%", boxShadow: "0 3px 6px rgba(0,0,0,0.1)" }}>
                    {iconMap[rate.value]}
                  </IconButton>
                </Grid>
              ))}
            </Grid>
            {element.minRateDescription && (
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="caption" color="textSecondary">
                  {element.minRateDescription}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {element.maxRateDescription}
                </Typography>
              </Box>
            )}
          </Box>
        );
      case "comment":
        return (
          <Box mb={3} key={element.name}>
            <TextareaAutosize
              minRows={4}
              placeholder={element.title}
              id={element.name}
              name={element.name}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              required={element.isRequired}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} p={4} bgcolor="white" borderRadius={2} boxShadow={3}>
        <Typography variant="h4" component="h2" gutterBottom>
          {surveyData.title}
        </Typography>
        {surveyData.pages.map((page, pageIndex) => (
          <Box key={pageIndex}>{page.elements.map((element) => renderElement(element))}</Box>
        ))}
        <Box mt={4}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Submit Survey
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const surveyData = {
  title: "Gold Customer Survey",
  pages: [
    {
      name: "Customer Feedback",
      elements: [
        {
          type: "text",
          name: "firstName",
          title: "First Name",
          isRequired: true,
        },
        {
          type: "text",
          name: "lastName",
          title: "Last Name",
          isRequired: true,
        },
        {
          type: "rating",
          name: "Staff Welcome",
          title: "The staff welcomed me warmly upon entering the store",
          rateType: "smileys",
          scaleColorMode: "colored",
          autoGenerate: false,
          rateValues: [
            { value: "1", text: "Strongly Disagree" },
            { value: "2", text: "Disagree" },
            { value: "3", text: "Neutral" },
            { value: "4", text: "Agree" },
            { value: "5", text: "Strongly Agree" },
          ],
          displayMode: "buttons",
        },
        {
          type: "comment",
          name: "review",
          title: "Please provide your review or feedback",
          isRequired: true,
        },
      ],
    },
  ],
};

const CustomSurveyForm = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box minHeight="100vh" display="flex" alignIt ems="center" justifyContent="center" bgcolor="#f5f5f5">
        <SurveyForm surveyData={surveyData} />
      </Box>
    </ThemeProvider>
  );
};

export default CustomSurveyForm;
