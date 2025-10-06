import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { HeaderSimple as Header } from './HeaderSimple';
import { BottomNavigation } from './BottomNavigation';
import { useAppSelector } from '../../store/hooks';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Debug logging
  console.log('Layout render - isAuthenticated:', isAuthenticated, 'isMobile:', isMobile);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Header - show for authenticated users or on public pages that need it */}
      <Header />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: '64px', // Always add padding for header
          pb: { xs: '70px', md: 0 }, // Add padding for bottom nav on mobile
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
        }}
      >
        {children}
      </Box>

      {/* Bottom navigation for mobile */}
      {isMobile && isAuthenticated && <BottomNavigation />}
    </Box>
  );
};