import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  CameraAlt as CameraIcon,
  ReportProblem as ReportIcon,
  People as PeopleIcon,
  Nature as TreeIcon,
  CheckCircle as CheckIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { CreatePostDialog } from '../components/social/CreatePostDialog';

export const HomePage: React.FC = () => {
  const [createPostOpen, setCreatePostOpen] = useState(false);

  const statsData = [
    {
      title: 'Community Members',
      value: '1,247',
      change: '+15% this month',
      icon: <PeopleIcon sx={{ color: '#4CAF50', fontSize: 24 }} />,
    },
    {
      title: 'Trees Planted',
      value: '3,456',
      change: '+8% this month',
      icon: <TreeIcon sx={{ color: '#4CAF50', fontSize: 24 }} />,
    },
    {
      title: 'Issues Resolved',
      value: '89',
      change: '+23% this month',
      icon: <CheckIcon sx={{ color: '#4CAF50', fontSize: 24 }} />,
    },
  ];

  const recentPosts = [
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: 'https://via.placeholder.com/40',
      content: 'Started my own herb garden today using recycled containers! Growing basil, mint, and rosemary. Every small step counts...',
      date: '22/10/2025',
    },
    {
      id: 2,
      author: 'Mike Chen',
      avatar: 'https://via.placeholder.com/40',
      content: 'Upcycled old glass jars into beautiful planters for my succulents! Instead of throwing them away, I gave them a new...',
      date: '21/10/2025',
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              color: '#2c3e50',
              mb: 1 
            }}
          >
            Welcome to Clean & Green
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Join your community in creating a cleaner, greener environment
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<CalendarIcon />}
              sx={{
                backgroundColor: '#4CAF50',
                '&:hover': { backgroundColor: '#45a049' },
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Join a Cleanup
            </Button>
            <Button
              variant="outlined"
              startIcon={<CameraIcon />}
              sx={{
                borderColor: '#4CAF50',
                color: '#4CAF50',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#45a049',
                  backgroundColor: 'rgba(76, 175, 80, 0.04)',
                },
              }}
              onClick={() => setCreatePostOpen(true)}
            >
              Share Your Impact
            </Button>
            <Button
              variant="outlined"
              startIcon={<ReportIcon />}
              sx={{
                borderColor: '#4CAF50',
                color: '#4CAF50',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#45a049',
                  backgroundColor: 'rgba(76, 175, 80, 0.04)',
                },
              }}
            >
              Report an Issue
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsData.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  '&:hover': {
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {stat.icon}
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ ml: 1, fontWeight: 500 }}
                  >
                    {stat.title}
                  </Typography>
                </Box>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    color: '#2c3e50',
                    mb: 1 
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                >
                  {stat.change}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Content Sections */}
        <Grid container spacing={4}>
          {/* Upcoming Cleanups */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                borderRadius: 3,
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarIcon sx={{ color: '#4CAF50', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Upcoming Cleanups
                    </Typography>
                  </Box>
                  <Button 
                    size="small" 
                    sx={{ 
                      color: '#4CAF50',
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    View All
                  </Button>
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mb: 3 }}
                >
                  Join the next community cleanup drives
                </Typography>

                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    py: 4,
                    color: 'text.secondary'
                  }}
                >
                  <CalendarIcon sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    No upcoming cleanup drives yet
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: '#4CAF50',
                      '&:hover': { backgroundColor: '#45a049' },
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Create First Drive
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Green Posts */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                borderRadius: 3,
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TreeIcon sx={{ color: '#4CAF50', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Recent Green Posts
                    </Typography>
                  </Box>
                  <Button 
                    size="small" 
                    sx={{ 
                      color: '#4CAF50',
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    View All
                  </Button>
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mb: 3 }}
                >
                  Latest eco-friendly activities from the community
                </Typography>

                {/* Posts List */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {recentPosts.map((post) => (
                    <Box 
                      key={post.id}
                      sx={{ 
                        display: 'flex', 
                        gap: 2,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #e9ecef',
                      }}
                    >
                      <Avatar 
                        src={post.avatar}
                        sx={{ width: 40, height: 40 }}
                      >
                        {post.author.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {post.author}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {post.date}
                          </Typography>
                        </Box>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {post.content}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Create Post Dialog */}
        <CreatePostDialog
          open={createPostOpen}
          onClose={() => setCreatePostOpen(false)}
        />
      </Container>
    </Box>
  );
};