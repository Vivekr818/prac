import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import {
  Home as HomeIcon,
  Event as EventIcon,
  Report as ReportIcon,
  Person as PersonIcon,
  Map as MapIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  AdminPanelSettings as AdminIcon,
  EmojiEvents as BadgeIcon,
} from '@mui/icons-material';
import { useAppSelector } from '../../store/hooks';

interface SidebarProps {
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const handleNavigation = (path: string) => {
    navigate(path);
    onItemClick?.();
  };

  const mainNavItems = [
    { text: 'Home Feed', icon: <HomeIcon />, path: '/' },
    { text: 'Events', icon: <EventIcon />, path: '/events' },
    { text: 'Report Issue', icon: <ReportIcon />, path: '/report' },
    { text: 'Map View', icon: <MapIcon />, path: '/map' },
  ];

  const userNavItems = [
    { text: 'My Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'My Impact', icon: <AnalyticsIcon />, path: '/impact' },
    { text: 'Achievements', icon: <BadgeIcon />, path: '/achievements' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const authorityNavItems = [
    { text: 'Authority Dashboard', icon: <AdminIcon />, path: '/authority' },
  ];

  return (
    <Box sx={{ width: '100%', pt: 2 }}>
      {/* User info section */}
      {user && (
        <Box sx={{ px: 2, mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Welcome back,
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {user.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Chip
              label={`${user.impactScore} points`}
              size="small"
              color="primary"
              variant="outlined"
            />
            {user.isVerified && (
              <Chip
                label="Verified"
                size="small"
                color="success"
                variant="outlined"
              />
            )}
          </Box>
        </Box>
      )}

      <Divider />

      {/* Main navigation */}
      <List>
        <ListItem>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600 }}>
            Main
          </Typography>
        </ListItem>
        {mainNavItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                mx: 1,
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* User section */}
      <List>
        <ListItem>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600 }}>
            Personal
          </Typography>
        </ListItem>
        {userNavItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                mx: 1,
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Authority section */}
      {user?.isAuthority && (
        <>
          <Divider />
          <List>
            <ListItem>
              <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600 }}>
                Authority
              </Typography>
            </ListItem>
            {authorityNavItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    mx: 1,
                    borderRadius: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};