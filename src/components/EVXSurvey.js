import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, TextField, Rating, Box, Button, Typography, LinearProgress, ToggleButtonGroup, ToggleButton } from "@mui/material";
import SentimentSatisfied from "@mui/icons-material/SentimentSatisfied";
import SentimentDissatisfied from "@mui/icons-material/SentimentDissatisfied";

const EVXSurvey = ({ surveyData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(surveyData.pages[0].elements.length).fill(""));
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (currentIndex === 0 && surveyData.pages[0].elements.length > 0) {
      const timer = setTimeout(() => setCurrentIndex(1), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, surveyData.pages[0].elements.length]);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < surveyData.pages[0].elements.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleSubmit = () => {
    alert("Survey Submitted!");
  };

  const renderQuestion = (element, index) => {
    switch (element.type) {
      case "text":
        return (
          <Box key={index} mb={4} sx={{ width: "100%", maxWidth: "600px" }}>
            <Typography variant="h6" component="h2" mb={2} sx={{ fontWeight: "bold" }}>
              {element.title.default || element.title}
            </Typography>
            <TextField
              placeholder={element.placeholder}
              required={element.isRequired || false}
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => handleChange(index, e.target.value)}
              sx={{
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
                "& .MuiInputLabel-root": {
                  color: "#333",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ddd",
                  },
                  "&:hover fieldset": {
                    borderColor: "#0056b3",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0056b3",
                  },
                },
              }}
            />
          </Box>
        );
      case "comment":
        return (
          <Box key={index} mb={4} sx={{ width: "70%", maxWidth: "600px" }}>
            <Typography variant="h6" component="h2" mb={2} sx={{ fontWeight: "bold" }}>
              {element.title}
            </Typography>
            <TextField
              placeholder={element.placeholder}
              required={element.isRequired || false}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => handleChange(index, e.target.value)}
              sx={{
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
                "& .MuiInputLabel-root": {
                  color: "#333",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ddd",
                  },
                  "&:hover fieldset": {
                    borderColor: "#0056b3",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0056b3",
                  },
                },
              }}
            />
          </Box>
        );
      case "rating":
        if (element.rateType === "stars") {
          return (
            <Box key={index} margin="normal" textAlign="left">
              <Typography variant="h5" sx={{ mb: 2, fontSize: "1.25rem", fontWeight: "bold" }}>
                {element.title}
              </Typography>
              <Rating
                name={element.name}
                max={element.rateMax || 5}
                onChange={(e, value) => handleChange(index, value)}
                sx={{ color: "#007bff", fontSize: "3.0rem" }} // Adjust the fontSize here
              />
            </Box>
          );
        } else if (element.rateType === "smileys") {
          return (
            <Box key={index} margin="normal" textAlign="left">
              <Typography variant="h5" sx={{ mb: 2, fontSize: "1.25rem", fontWeight: "bold" }}>
                {element.title}
              </Typography>
              <ToggleButtonGroup
                exclusive
                onChange={(e, value) => handleChange(index, value)}
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  color: "#007bff",
                }}
              >
                {[...Array(element.rateCount)].map((_, i) => (
                  <ToggleButton key={i} value={i + 1}>
                    {i + 1 === 1 ? <SentimentDissatisfied /> : <SentimentSatisfied />}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          );
        } else {
          return (
            <Box key={index} margin="normal" textAlign="left">
              <Typography variant="h5" sx={{ mb: 2, fontSize: "1.25rem", fontWeight: "bold" }}>
                {element.title}
              </Typography>
              <ToggleButtonGroup
                exclusive
                onChange={(e, value) => handleChange(index, value)}
                sx={{
                  display: "flex",
                  justifyContent: "left",
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <ToggleButton key={i} value={i + 1}>
                    {i + 1}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          );
        }
      default:
        return null;
    }
  };

  const progress = (currentIndex / surveyData.pages[0].elements.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          backgroundColor: "#f0f0f0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#0056b3",
          },
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div key={currentIndex} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.5 }}>
          <Card
            sx={{
              padding: "0px 100px 0px 100px",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "900px",
              backgroundColor: "white",
              boxShadow: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              justifyContent: "center",
              minHeight: "80vh",
            }}
          >
            {currentIndex === 0 && (
              <div className="text-center mb-6">
                <Typography variant="h4" component="h1" className="mb-4" sx={{ fontWeight: "bold" }}>
                  {surveyData.title}
                </Typography>
                <Typography variant="body1" className="mb-4">
                  {surveyData.description}
                </Typography>
              </div>
            )}
            {currentIndex > 0 && currentIndex <= surveyData.pages[0].elements.length && (
              <div className="text-center">
                {renderQuestion(surveyData.pages[0].elements[currentIndex - 1], currentIndex - 1)}
                <div className="flex justify-center mt-4">
                  {currentIndex < surveyData.pages[0].elements.length ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      sx={{
                        textTransform: "none",
                        transition: "background-color 0.3s, color 0.3s",
                        ":hover": {
                          backgroundColor: "#004ba0",
                          color: "white",
                        },
                        backgroundColor: "#0056b3",
                        color: "white",
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      sx={{
                        textTransform: "none",
                        transition: "background-color 0.3s, color 0.3s",
                        ":hover": {
                          backgroundColor: "#004ba0",
                          color: "white",
                        },
                        backgroundColor: "#0056b3",
                        color: "white",
                      }}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EVXSurvey;
