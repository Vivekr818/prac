import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Grid,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Nature as EcoIcon,
  Event as EventIcon,
  Report as ReportIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useAppSelector } from '../store/hooks';

export const ProfilePage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography>Please log in to view your profile.</Typography>
      </Container>
    );
  }

  // Mock activity data
  const activityStats = {
    eventsJoined: 8,
    issuesReported: 12,
    impactPoints: user.impactScore,
    nextBadgeProgress: 75, // Progress towards next badge
  };

  const recentActivity = [
    {
      type: 'event',
      title: 'Joined Central Park Cleanup',
      date: '2024-03-10',
      points: 25,
    },
    {
      type: 'report',
      title: 'Reported broken street light',
      date: '2024-03-08',
      points: 10,
    },
    {
      type: 'badge',
      title: 'Earned "First Cleanup" badge',
      date: '2024-03-05',
      points: 50,
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <EventIcon color="primary" />;
      case 'report':
        return <ReportIcon color="secondary" />;
      case 'badge':
        return <TrophyIcon color="warning" />;
      default:
        return <EcoIcon />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={user.avatar}
                  sx={{ width: 80, height: 80, mr: 3 }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {user.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    {user.email}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      Joined {user.joinDate.toLocaleDateString()}
                    </Typography>
                  </Box>
                  {user.location && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {user.location.latitude.toFixed(2)}, {user.location.longitude.toFixed(2)}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Button variant="outlined" startIcon={<EditIcon />}>
                  Edit Profile
                </Button>
              </Box>

              {/* Status badges */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={`${user.impactScore} Impact Points`}
                  color="primary"
                  variant="filled"
                />
                {user.isVerified && (
                  <Chip label="Verified" color="success" variant="outlined" />
                )}
                {user.isAuthority && (
                  <Chip label="Authority" color="warning" variant="outlined" />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <EventIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" component="div" gutterBottom>
                {activityStats.eventsJoined}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Events Joined
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <ReportIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" component="div" gutterBottom>
                {activityStats.issuesReported}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Issues Reported
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <EcoIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" component="div" gutterBottom>
                {activityStats.impactPoints}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Impact Points
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrophyIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" component="div" gutterBottom>
                {user.badges.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Badges Earned
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Badges Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Achievements
              </Typography>
              
              {/* Progress to next badge */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Progress to next badge</Typography>
                  <Typography variant="body2">{activityStats.nextBadgeProgress}%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={activityStats.nextBadgeProgress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              {/* Earned badges */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {user.badges.map((badge) => (
                  <Box
                    key={badge.id}
                    sx={{
                      textAlign: 'center',
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 2,
                      minWidth: 100,
                    }}
                  >
                    <Typography variant="h4" component="div">
                      {badge.icon}
                    </Typography>
                    <Typography variant="caption" display="block" fontWeight={600}>
                      {badge.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {badge.earnedAt.toLocaleDateString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        {getActivityIcon(activity.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.title}
                        secondary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>{activity.date}</span>
                            <Chip
                              label={`+${activity.points} pts`}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};