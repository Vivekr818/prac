import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { useAppSelector } from '../../store/hooks';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Header - only show for authenticated users */}
      {isAuthenticated && <Header />}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: isAuthenticated ? '64px' : 0, // Only add padding if header is shown
          pb: { xs: isAuthenticated ? '70px' : 0, md: 0 }, // Only add padding if bottom nav is shown
          minHeight: '100vh',
          backgroundColor: isAuthenticated ? '#f8f9fa' : 'transparent',
        }}
      >
        {children}
      </Box>

      {/* Bottom navigation for mobile - only for authenticated users */}
      {isMobile && isAuthenticated && <BottomNavigation />}
    </Box>
  );
};