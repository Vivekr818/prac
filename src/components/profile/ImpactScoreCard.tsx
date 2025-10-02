import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Grid,
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  EmojiEvents as TrophyIcon,
  Whatshot as StreakIcon,
  Nature as EcoIcon,
} from '@mui/icons-material';
import { UserStats } from '../../types/user';

interface ImpactScoreCardProps {
  stats: UserStats;
  impactScore: number;
}

export const ImpactScoreCard: React.FC<ImpactScoreCardProps> = ({
  stats,
  impactScore,
}) => {
  // Calculate level progress
  const pointsForNextLevel = (stats.level + 1) * 500; // 500 points per level
  const pointsInCurrentLevel = impactScore - (stats.level * 500);
  const progressToNextLevel = (pointsInCurrentLevel / 500) * 100;

  const impactCategories = [
    {
      label: 'Events',
      value: stats.eventsJoined,
      color: 'primary' as const,
      icon: '🌱',
    },
    {
      label: 'Reports',
      value: stats.issuesReported,
      color: 'secondary' as const,
      icon: '📍',
    },
    {
      label: 'Posts',
      value: stats.postsCreated,
      color: 'success' as const,
      icon: '📝',
    },
    {
      label: 'Organized',
      value: stats.eventsOrganized,
      color: 'warning' as const,
      icon: '👑',
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Impact Overview
        </Typography>

        {/* Main Impact Score */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h2" component="div" color="primary.main" gutterBottom>
            {impactScore.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Impact Points
          </Typography>
          
          {/* Level and Progress */}
          <Box sx={{ mt: 2, mb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Chip
                icon={<TrophyIcon />}
                label={`Level ${stats.level}`}
                color="primary"
                variant="outlined"
              />
              <Typography variant="caption" color="text.secondary">
                {pointsForNextLevel - impactScore} points to Level {stats.level + 1}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progressToNextLevel}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        </Box>

        {/* Impact Categories */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {impactCategories.map((category) => (
            <Grid item xs={6} key={category.label}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h4" component="div">
                  {category.icon}
                </Typography>
                <Typography variant="h6" component="div" gutterBottom>
                  {category.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {category.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Additional Stats */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <StreakIcon color="warning" sx={{ mr: 0.5 }} />
              <Typography variant="h6" component="div">
                {stats.streakDays}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Day Streak
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <TrendingIcon color="success" sx={{ mr: 0.5 }} />
              <Typography variant="h6" component="div">
                {stats.likesReceived}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Likes Received
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" component="div" gutterBottom>
              {stats.issuesResolved}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Issues Resolved
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};