import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Box,
  Button,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  School as LearnIcon,
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logoutUser } from '../../store/authSlice';

export const HeaderSimple: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    handleMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#ffffff',
        color: '#2c3e50',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar>
        {/* Logo and title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              backgroundColor: '#4CAF50',
              borderRadius: '50%',
              width: 32,
              height: 32,
              mr: 2,
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>
              ✓
            </Typography>
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              color: '#2c3e50',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Clean & Green
          </Typography>
        </Box>

        {/* Desktop navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2, gap: 1 }}>
          <Button href="/social" sx={{ color: '#2c3e50', textTransform: 'none' }}>
            Home
          </Button>
          <Button href="/dashboard" sx={{ color: '#2c3e50', textTransform: 'none' }}>
            📊 Dashboard
          </Button>
          <Button href="/events" sx={{ color: '#2c3e50', textTransform: 'none' }}>
            Events
          </Button>
          <Button href="/map" sx={{ color: '#2c3e50', textTransform: 'none' }}>
            🗺️ Map
          </Button>
          <Button href="/marketplace" sx={{ color: '#2c3e50', textTransform: 'none' }}>
            Marketplace
          </Button>
          <Button href="/report" sx={{ color: '#2c3e50', textTransform: 'none' }}>
            Report
          </Button>
        </Box>

        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications */}
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Simple User avatar */}
            <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
              <Avatar
                src={user?.avatar}
                alt={user?.name}
                sx={{ width: 32, height: 32 }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => window.location.href = '/profile'}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => window.location.href = '/learn'}>
                Learn
              </MenuItem>
              <MenuItem onClick={() => window.location.href = '/settings'}>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" href="/login">
              Login
            </Button>
            <Button variant="contained" href="/register">
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};