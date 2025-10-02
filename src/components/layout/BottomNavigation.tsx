import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  Paper,
  Badge,
} from '@mui/material';
import {
  Home as HomeIcon,
  Event as EventIcon,
  Report as ReportIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const navigationItems = [
  {
    label: 'Home',
    value: '/social',
    icon: <HomeIcon />,
  },
  {
    label: 'Events',
    value: '/events',
    icon: <EventIcon />,
  },
  {
    label: 'Report',
    value: '/report',
    icon: <ReportIcon />,
  },
  {
    label: 'Profile',
    value: '/profile',
    icon: <PersonIcon />,
  },
];

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  // Get current path for active state
  const currentPath = location.pathname;

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: { xs: 'block', md: 'none' },
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40px',
          height: '4px',
          background: 'linear-gradient(90deg, #2E7D32, #4CAF50)',
          borderRadius: '2px',
        },
      }}
      elevation={0}
    >
      <MuiBottomNavigation
        value={currentPath}
        onChange={handleChange}
        showLabels
        sx={{
          height: 80,
          background: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '8px 12px 12px',
            borderRadius: '16px',
            margin: '4px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&.Mui-selected': {
              background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
              color: 'white',
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 20px rgba(46, 125, 50, 0.3)',
            },
            '&:hover': {
              background: 'rgba(46, 125, 50, 0.1)',
              transform: 'translateY(-2px)',
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.75rem',
            fontWeight: 600,
            '&.Mui-selected': {
              fontSize: '0.75rem',
            },
          },
        }}
      >
        {navigationItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={
              item.label === 'Report' ? (
                <Badge color="secondary" variant="dot">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )
            }
            sx={{
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
              },
            }}
          />
        ))}
      </MuiBottomNavigation>
    </Paper>
  );
};