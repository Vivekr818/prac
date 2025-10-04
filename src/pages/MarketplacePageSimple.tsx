import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export const MarketplacePageSimple: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: '#2c3e50', mb: 2 }}>
          🛒 Eco Marketplace
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover sustainable products that make a difference for our planet
        </Typography>
        <Box sx={{ mt: 4, p: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="body1">
            Marketplace is loading... This is a simplified version for testing.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};