import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export const TestComponent: React.FC = () => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        🎉 App is Working!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        This is a test component to verify the app is loading correctly.
      </Typography>
      <Button 
        variant="contained" 
        sx={{ backgroundColor: '#4CAF50' }}
        onClick={() => console.log('Button clicked!')}
      >
        Test Button
      </Button>
      <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="caption">
          Current time: {new Date().toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
};