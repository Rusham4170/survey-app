import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  TextField,
  Rating,
  Box,
  Button,
  Typography,
  LinearProgress,
  ToggleButtonGroup,
  ToggleButton,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardActionArea,
  CardMedia,
  Switch,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import SentimentSatisfied from "@mui/icons-material/SentimentSatisfied";
import SentimentDissatisfied from "@mui/icons-material/SentimentDissatisfied";
import CloseIcon from '@mui/icons-material/Close';


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
        case "tagbox":
  return (
    <Box key={index} margin="normal" textAlign="left" sx={{ pb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontSize: "1.25rem", fontWeight: "bold" }}>
        {element.title || "Select tags"}
      </Typography>
      <FormControl fullWidth variant="outlined">
        <Select
          multiple
          value={answers[index] || []}
          onChange={(event) => {
            const value = event.target.value;
            const newSelectedTags = typeof value === 'string' ? value.split(',') : value;
            handleChange(index, newSelectedTags);
          }}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select tags</em>;
            }
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => {
                      const updatedTags = selected.filter((chip) => chip !== tag);
                      handleChange(index, updatedTags);
                    }}
                    deleteIcon={<CloseIcon />}
                    sx={{
                      margin: "2px",
                      "& .MuiChip-deleteIcon": {
                        fontSize: "small",
                      },
                    }}
                  />
                ))}
              </Box>
            );
          }}
          sx={{
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            transition: "all 0.3s ease-in-out",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0056b3",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0056b3",
            },
            "& .MuiSelect-select": {
              padding: "12px 14px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ddd",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 200,
                borderRadius: "8px",
                mt: 1,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
                transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                transform: "translateY(-10px)", // Start from above
                opacity: 0,
                "&.MuiPopover-paper": {
                  transform: "translateY(0px)", // Slide down effect
                  opacity: 1,
                },
              },
            },
          }}
        >
          {element.choices.map((choice, i) => (
            <MenuItem key={i} value={choice}>
              {choice}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

      case "boolean":
        return (
          <Box key={index} margin="normal" textAlign="left" sx={{ pb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontSize: "1.25rem", fontWeight: "bold" }}>
              {element.title || "Yes/No Question"}
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={answers[index] === true}
                  onChange={(e) => handleChange(index, e.target.checked)} // Handle yes/no (true/false) value
                />
              }
              label={answers[index] ? "Yes" : "No"}
            />
          </Box>
        );

      case "imagepicker":
        return (
          <Box key={index} margin="normal" textAlign="left" sx={{ pb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontSize: "1.25rem", fontWeight: "bold" }}>
              {element.title || "Pick an image"}
            </Typography>
            <Grid container spacing={2}>
              {element.choices.map((choice, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <Card
                    onClick={() => handleChange(index, choice.value)}
                    sx={{
                      border: answers[index] === choice.value ? "2px solid #4caf50" : "none", // Highlight selected image
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={choice.imageLink}
                        alt={choice.value}
                        sx={{ objectFit: element.imageFit || "cover" }} // Handle image fit
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
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
      case "radiogroup":
        return (
          <Box key={index} margin="normal" textAlign="left">
            <Typography variant="h5" sx={{ mb: 2, fontSize: "1.25rem", fontWeight: "bold" }}>
              {element.title}
            </Typography>
            <RadioGroup
              value={answers[index]}
              onChange={(e) => handleChange(index, e.target.value)} // Update the value when selected
              sx={{
                display: "flex",
                justifyContent: "left",
              }}
            >
              {element.choices.map((choice, i) => (
                <FormControlLabel
                  key={i}
                  value={choice}
                  control={<Radio />}
                  label={choice} // Display the choice label
                />
              ))}
            </RadioGroup>
          </Box>
        );
      case "checkbox":
        return (
          <Box key={index} margin="normal" textAlign="left">
            <Typography variant="h5" sx={{ mb: 2, fontSize: "1.25rem", fontWeight: "bold" }}>
              {element.title}
            </Typography>
            {element.choices.map((choice, i) => (
              <Box key={i} display="flex" alignItems="center" mb={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={answers[index]?.includes(choice) || false}
                      onChange={() => {
                        const newAnswers = [...answers];
                        const currentAnswer = newAnswers[index] || [];
                        if (currentAnswer.includes(choice)) {
                          newAnswers[index] = currentAnswer.filter((item) => item !== choice);
                        } else {
                          newAnswers[index] = [...currentAnswer, choice];
                        }
                        setAnswers(newAnswers);
                      }}
                      sx={{
                        color: "#0056b3",
                        "&.Mui-checked": {
                          color: "#0056b3",
                        },
                      }}
                    />
                  }
                  label={choice}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontWeight: "500",
                      color: "#333",
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        );
      case "dropdown":
        return (
          <Box key={index} margin="normal" textAlign="left" sx={{ pb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontSize: "1.25rem", fontWeight: "bold" }}>
              {element.title || "Select an option"}
            </Typography>
            <FormControl fullWidth variant="outlined">
              <Select
                value={answers[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  transition: "all 0.3s ease-in-out",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0056b3",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0056b3",
                  },
                  "& .MuiSelect-select": {
                    padding: "12px 14px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ddd",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 200,
                      borderRadius: "8px",
                      mt: 1,
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
                      transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                      transform: "translateY(-10px)", // Start from above
                      opacity: 0,
                      "&.MuiPopover-paper": {
                        transform: "translateY(0px)", // Slide down effect
                        opacity: 1,
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {element.choices.map((choice, i) => (
                  <MenuItem key={i} value={choice}>
                    {choice}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                <div className="flex justify-center mt-4 pt-40">
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
