import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  FavoriteBorder as LikeIcon,
  ChatBubbleOutline as CommentIcon,
  Share as ShareIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPosts } from '../store/socialSlice';
import { CreatePostDialog } from '../components/social/CreatePostDialog';

export const SocialFeedPage: React.FC = () => {
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { posts, isLoading } = useAppSelector((state) => state.social);

  useEffect(() => {
    dispatch(fetchPosts({ page: 1, reset: true }));
  }, [dispatch]);

  const mockPosts = [
    {
      id: '1',
      author: {
        name: 'Green Gardener',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        verified: true,
      },
      content: '🌱 Started my own herb garden today using recycled containers! Growing basil, mint, and rosemary. Every small step counts towards a greener future! #UrbanGardening #SustainableLiving',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
      timeAgo: '9d ago',
      likes: 23,
      comments: 5,
      tags: ['UrbanGardening', 'SustainableLiving', 'Recycling'],
    },
    {
      id: '2',
      author: {
        name: 'Eco Warrior',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        verified: false,
      },
      content: '♻️ Upcycled old glass jars into beautiful planters for my succulents! Instead of throwing them away, I gave them a new purpose. Small changes make a big difference!',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=400&fit=crop',
      timeAgo: '2d ago',
      likes: 45,
      comments: 12,
      tags: ['Upcycling', 'ZeroWaste', 'DIY'],
    },
    {
      id: '3',
      author: {
        name: 'Solar Sam',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        verified: true,
      },
      content: '☀️ Just installed solar panels on my roof! Excited to reduce my carbon footprint and save on energy bills. The future is renewable!',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
      timeAgo: '5d ago',
      likes: 67,
      comments: 18,
      tags: ['SolarEnergy', 'RenewableEnergy', 'CleanEnergy'],
    },
    {
      id: '4',
      author: {
        name: 'Ocean Cleaner',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        verified: true,
      },
      content: '🌊 Beach cleanup day with my local community! We collected over 50 bags of trash and plastic waste. Together we can make our oceans cleaner! #BeachCleanup #OceanConservation',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&h=400&fit=crop',
      timeAgo: '1d ago',
      likes: 89,
      comments: 24,
      tags: ['BeachCleanup', 'OceanConservation', 'Community'],
    },
    {
      id: '5',
      author: {
        name: 'Tree Hugger',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
        verified: false,
      },
      content: '🌳 Planted 20 native trees in our neighborhood park today! Each tree will absorb CO2 and provide habitat for local wildlife. Nature is healing! #TreePlanting #Reforestation',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
      timeAgo: '3d ago',
      likes: 156,
      comments: 31,
      tags: ['TreePlanting', 'Reforestation', 'ClimateAction'],
    },
    {
      id: '6',
      author: {
        name: 'Compost Queen',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
        verified: false,
      },
      content: '🍂 My composting setup is thriving! Turning kitchen scraps into nutrient-rich soil for my garden. Zero waste lifestyle in action! #Composting #ZeroWaste',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
      timeAgo: '6d ago',
      likes: 34,
      comments: 8,
      tags: ['Composting', 'ZeroWaste', 'Gardening'],
    },
    {
      id: '7',
      author: {
        name: 'Bike Commuter',
        avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face',
        verified: true,
      },
      content: '🚲 Day 100 of biking to work! Saved 200kg of CO2 emissions and improved my health. Sustainable transport for the win! #BikeCommute #SustainableTransport',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      timeAgo: '4d ago',
      likes: 78,
      comments: 15,
      tags: ['BikeCommute', 'SustainableTransport', 'HealthyLiving'],
    },
    {
      id: '8',
      author: {
        name: 'Plastic Free Pete',
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face',
        verified: false,
      },
      content: '🥤 Switched to reusable everything! Water bottles, shopping bags, food containers. My plastic consumption dropped by 90%! #PlasticFree #SustainableLiving',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop',
      timeAgo: '7d ago',
      likes: 92,
      comments: 19,
      tags: ['PlasticFree', 'SustainableLiving', 'ZeroWaste'],
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4 
        }}>
          <Box>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700, 
                color: '#2c3e50',
                mb: 1 
              }}
            >
              Green Social Feed
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
            >
              Share your eco-friendly activities and inspire others
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCreatePostOpen(true)}
            sx={{
              backgroundColor: '#4CAF50',
              '&:hover': { backgroundColor: '#45a049' },
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1.5,
            }}
          >
            Create Post
          </Button>
        </Box>

        {/* Posts Feed */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {mockPosts.map((post) => (
            <Card 
              key={post.id}
              sx={{ 
                borderRadius: 3,
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                overflow: 'hidden',
                '&:hover': {
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                },
              }}
            >
              <CardContent sx={{ p: 0 }}>
                {/* Post Header */}
                <Box sx={{ p: 3, pb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={post.author.avatar}
                        sx={{ 
                          width: 40, 
                          height: 40, 
                          mr: 2,
                          border: post.author.verified ? '2px solid #4CAF50' : 'none',
                        }}
                      >
                        {post.author.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {post.author.name}
                          </Typography>
                          {post.author.verified && (
                            <Box 
                              sx={{ 
                                width: 16, 
                                height: 16, 
                                borderRadius: '50%', 
                                backgroundColor: '#4CAF50',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography sx={{ color: 'white', fontSize: '10px' }}>✓</Typography>
                            </Box>
                          )}
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {post.timeAgo}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton size="small">
                      <MoreIcon />
                    </IconButton>
                  </Box>
                </Box>

                {/* Post Content */}
                <Box sx={{ px: 3, pb: 2 }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    {post.content}
                  </Typography>
                </Box>

                {/* Post Image */}
                <Box
                  component="img"
                  src={post.image}
                  alt="Post content"
                  sx={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                  }}
                />

                {/* Post Actions */}
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small" sx={{ color: '#666' }}>
                        <LikeIcon />
                      </IconButton>
                      <Typography variant="body2" color="text.secondary">
                        {post.likes}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small" sx={{ color: '#666' }}>
                        <CommentIcon />
                      </IconButton>
                      <Typography variant="body2" color="text.secondary">
                        {post.comments}
                      </Typography>
                    </Box>
                    
                    <IconButton size="small" sx={{ color: '#666', ml: 'auto' }}>
                      <ShareIcon />
                    </IconButton>
                  </Box>

                  {/* Tags */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {post.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={`#${tag}`}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                          color: '#4CAF50',
                          border: '1px solid rgba(76, 175, 80, 0.2)',
                          fontWeight: 500,
                          '&:hover': {
                            backgroundColor: 'rgba(76, 175, 80, 0.15)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Create Post Dialog */}
        <CreatePostDialog
          open={createPostOpen}
          onClose={() => setCreatePostOpen(false)}
        />
      </Container>
    </Box>
  );
};