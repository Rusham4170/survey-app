import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Question = ({ question, onNext, onPrevious, showPrevious }) => {
  const [answer, setAnswer] = useState('');

  const handleNext = () => {
    if (answer.trim() !== '') {
      onNext(answer);
      setAnswer(''); // Clear the answer field after moving to the next question
    } else {
      alert('Please provide an answer before proceeding.');
    }
  };

  return (
    <Box textAlign="center" p={3} borderRadius={2} boxShadow={3} bgcolor="#fff">
      <Typography variant="h6" gutterBottom>
        {question.text}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        type={question.type}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        autoFocus
        margin="normal"
      />
      <Box mt={2}>
        {showPrevious && (
          <Button variant="outlined" color="secondary" onClick={onPrevious} sx={{ mr: 2 }}>
            Previous
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Question;
