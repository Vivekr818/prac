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
  Divider,
  ListItemIcon,
  ListItemText,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  School as LearnIcon,
  Person as PersonIcon,
  EmojiEvents as AchievementsIcon,
  Nature as EcoIcon,
  TrendingUp as StatsIcon,
  Help as HelpIcon,
  Brightness4 as ThemeIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logoutUser } from '../../store/authSlice';

export const Header: React.FC = () => {
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
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              color: '#2c3e50',
              display: { xs: 'block', sm: 'none' },
            }}
          >
            C&G
          </Typography>
        </Box>

        {/* Desktop navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2, gap: 1 }}>
          <Button
            sx={{
              color: '#2c3e50',
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.08)',
              },
            }}
            href="/social"
          >
            Home
          </Button>
          <Button
            sx={{
              color: '#2c3e50',
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.08)',
              },
            }}
            href="/dashboard"
          >
            📊 Dashboard
          </Button>
          <Button
            sx={{
              color: '#2c3e50',
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.08)',
              },
            }}
            href="/events"
          >
            Events
          </Button>
          <Button
            sx={{
              color: '#2c3e50',
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.08)',
              },
            }}
            href="/map"
          >
            🗺️ Map
          </Button>

          <Button
            sx={{
              color: '#2c3e50',
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.08)',
              },
            }}
            href="/marketplace"
          >
            Marketplace
          </Button>
          <Button
            sx={{
              color: '#2c3e50',
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.08)',
              },
            }}
            href="/report"
          >
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

            {/* Enhanced User avatar with status indicators */}
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={handleProfileMenuOpen}
                sx={{ 
                  p: 0,
                  '&:hover': {
                    '& .profile-avatar': {
                      transform: 'scale(1.1)',
                      boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
                    }
                  }
                }}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: '#4CAF50',
                        border: '2px solid white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      }}
                    />
                  }
                >
                  <Avatar
                    className="profile-avatar"
                    src={user?.avatar}
                    alt={user?.name}
                    sx={{ 
                      width: 40, 
                      height: 40,
                      transition: 'all 0.2s ease',
                      border: '2px solid transparent',
                      background: user?.avatar ? 'none' : 'linear-gradient(135deg, #4CAF50, #66BB6A)',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </Badge>
              </IconButton>
              
              {/* Level indicator */}
              <Chip
                label="Lv.5"
                size="small"
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  backgroundColor: '#FF9800',
                  color: 'white',
                  fontSize: '0.7rem',
                  height: 18,
                  minWidth: 28,
                  '& .MuiChip-label': { px: 0.5 },
                }}
              />
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 4px 16px rgba(0,0,0,0.15))',
                    mt: 1.5,
                    minWidth: 280,
                    borderRadius: 3,
                    border: '1px solid rgba(0,0,0,0.05)',
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {/* User Info Header */}
              <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #f0f0f0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={user?.avatar}
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      mr: 2,
                      background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {user?.name || 'Eco Warrior'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        icon={<EcoIcon />}
                        label="Level 5 Eco Champion"
                        size="small"
                        sx={{ 
                          backgroundColor: '#e8f5e8', 
                          color: '#2e7d32',
                          fontSize: '0.7rem',
                          height: 20,
                        }}
                      />
                      <Chip
                        icon={<StarIcon />}
                        label="1,247 pts"
                        size="small"
                        sx={{ 
                          backgroundColor: '#fff3e0', 
                          color: '#f57c00',
                          fontSize: '0.7rem',
                          height: 20,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                
                {/* Progress to next level */}
                <Box sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Progress to Level 6
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      247/500 XP
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={49.4}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: '#f0f0f0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#4CAF50',
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              </Box>

              {/* Main Menu Items */}
              <MenuItem 
                onClick={() => {
                  window.location.href = '/profile';
                  handleMenuClose();
                }}
                sx={{ py: 1.5, px: 3 }}
              >
                <ListItemIcon>
                  <PersonIcon sx={{ color: '#4CAF50' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="My Profile" 
                  secondary="View and edit profile"
                  secondaryTypographyProps={{ fontSize: '0.75rem' }}
                />
              </MenuItem>

              <MenuItem 
                onClick={() => {
                  window.location.href = '/achievements';
                  handleMenuClose();
                }}
                sx={{ py: 1.5, px: 3 }}
              >
                <ListItemIcon>
                  <AchievementsIcon sx={{ color: '#FF9800' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Achievements" 
                  secondary="View badges and rewards"
                  secondaryTypographyProps={{ fontSize: '0.75rem' }}
                />
                <Badge badgeContent={3} color="error" sx={{ mr: 1 }} />
              </MenuItem>

              <MenuItem 
                onClick={() => {
                  window.location.href = '/impact';
                  handleMenuClose();
                }}
                sx={{ py: 1.5, px: 3 }}
              >
                <ListItemIcon>
                  <StatsIcon sx={{ color: '#2196F3' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Impact Stats" 
                  secondary="Track environmental impact"
                  secondaryTypographyProps={{ fontSize: '0.75rem' }}
                />
              </MenuItem>

              <Divider sx={{ my: 1 }} />

              <MenuItem 
                onClick={() => {
                  window.location.href = '/learn';
                  handleMenuClose();
                }}
                sx={{ py: 1.5, px: 3 }}
              >
                <ListItemIcon>
                  <LearnIcon sx={{ color: '#9C27B0' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Learn" 
                  secondary="Environmental education"
                  secondaryTypographyProps={{ fontSize: '0.75rem' }}
                />
              </MenuItem>

              <MenuItem 
                onClick={() => {
                  window.location.href = '/help';
                  handleMenuClose();
                }}
                sx={{ py: 1.5, px: 3 }}
              >
                <ListItemIcon>
                  <HelpIcon sx={{ color: '#607D8B' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Help & Support" 
                  secondary="Get help and feedback"
                  secondaryTypographyProps={{ fontSize: '0.75rem' }}
                />
              </MenuItem>

              <Divider sx={{ my: 1 }} />

              <MenuItem 
                onClick={() => {
                  window.location.href = '/settings';
                  handleMenuClose();
                }}
                sx={{ py: 1.5, px: 3 }}
              >
                <ListItemIcon>
                  <SettingsIcon sx={{ color: '#757575' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Settings" 
                  secondary="Account and preferences"
                  secondaryTypographyProps={{ fontSize: '0.75rem' }}
                />
              </MenuItem>

              <MenuItem 
                onClick={() => {
                  // Toggle theme functionality
                  console.log('Toggle theme');
                  handleMenuClose();
                }}
                sx={{ py: 1.5, px: 3 }}
              >
                <ListItemIcon>
                  <ThemeIcon sx={{ color: '#757575' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Dark Mode" 
                  secondary="Toggle appearance"
                  secondaryTypographyProps={{ fontSize: '0.75rem' }}
                />
              </MenuItem>

              <Divider sx={{ my: 1 }} />

              <MenuItem 
                onClick={handleLogout}
                sx={{ 
                  py: 1.5, 
                  px: 3,
                  '&:hover': {
                    backgroundColor: 'rgba(244, 67, 54, 0.08)',
                  }
                }}
              >
                <ListItemIcon>
                  <LogoutIcon sx={{ color: '#f44336' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Logout" 
                  secondary="Sign out of account"
                  secondaryTypographyProps={{ fontSize: '0.75rem' }}
                />
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