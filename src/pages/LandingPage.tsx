import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  Nature as EcoIcon,
  People as PeopleIcon,
  LocationOn as LocationIcon,
  TrendingUp as TrendingIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';

export const LandingPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#2E7D32', fontWeight: 700 }}>
        Welcome to Clean & Green 🌍
      </Typography>
      <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
        Join your community in creating a cleaner, greener environment
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          href="/register"
          sx={{
            backgroundColor: '#4CAF50',
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          Get Started Free
        </Button>
        <Button
          variant="outlined"
          size="large"
          href="/login"
          sx={{
            borderColor: '#4CAF50',
            color: '#4CAF50',
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          Sign In
        </Button>
      </Box>
      
      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 700 }}>1,247</Typography>
          <Typography color="text.secondary">Community Members</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 700 }}>3,456</Typography>
          <Typography color="text.secondary">Trees Planted</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 700 }}>89</Typography>
          <Typography color="text.secondary">Issues Resolved</Typography>
        </Box>
      </Box>
    </Container>
  );
};