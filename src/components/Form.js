import React, { useState } from 'react';
import Question from './Question';
import { Container, Box, Typography, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  { id: 1, text: 'What is your name?', type: 'text' },
  { id: 2, text: 'How old are you?', type: 'number' },
  { id: 3, text: 'What is your favorite color?', type: 'text' },
  // Add more questions as needed
];

const Form = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNextQuestion = (answer) => {
    setAnswers({ ...answers, [questions[currentQuestionIndex].id]: answer });
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} position="relative" minHeight="200px">
        <AnimatePresence initial={false} mode="wait">
          {currentQuestionIndex < questions.length ? (
            <motion.div
              key={currentQuestionIndex}
              initial={{ y: 30, opacity: 0, position: 'absolute', width: '100%' }}
              animate={{ y: 0, opacity: 1, position: 'relative' }}
              exit={{ y: -30, opacity: 0, position: 'absolute', width: '100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <Question
                question={questions[currentQuestionIndex]}
                onNext={handleNextQuestion}
                onPrevious={handlePreviousQuestion}
                showPrevious={currentQuestionIndex > 0}
              />
            </motion.div>
          ) : (
            <motion.div
              key="review"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <Box textAlign="center" mt={5}>
                <Typography variant="h5" gutterBottom>
                  Review Your Answers
                </Typography>
                <ul>
                  {Object.entries(answers).map(([key, value]) => (
                    <li key={key}>
                      {questions.find((q) => q.id === parseInt(key)).text}: {value}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setCurrentQuestionIndex(0)}
                >
                  Start Over
                </Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Container>
  );
};

export default Form;
