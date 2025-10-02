import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Avatar,
  AvatarGroup,
  Fab,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Schedule as TimeIcon,
  People as PeopleIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Mock data for events
const mockEvents = [
  {
    id: '1',
    title: 'Central Park Cleanup Drive',
    description: 'Join us for a community cleanup event in Central Park. We\'ll provide all the necessary equipment and refreshments.',
    organizer: {
      name: 'Green Warriors NYC',
      avatar: 'https://via.placeholder.com/40',
    },
    date: '2024-03-15',
    time: '09:00 AM',
    location: 'Central Park, New York',
    participants: [
      { name: 'John', avatar: 'https://via.placeholder.com/32' },
      { name: 'Sarah', avatar: 'https://via.placeholder.com/32' },
      { name: 'Mike', avatar: 'https://via.placeholder.com/32' },
    ],
    participantCount: 24,
    maxParticipants: 50,
    tags: ['Park Cleanup', 'Community', 'Recycling'],
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Beach Restoration Project',
    description: 'Help restore the local beach ecosystem by removing invasive plants and planting native vegetation.',
    organizer: {
      name: 'Ocean Guardians',
      avatar: 'https://via.placeholder.com/40',
    },
    date: '2024-03-18',
    time: '08:00 AM',
    location: 'Sunset Beach, California',
    participants: [
      { name: 'Emma', avatar: 'https://via.placeholder.com/32' },
      { name: 'David', avatar: 'https://via.placeholder.com/32' },
    ],
    participantCount: 12,
    maxParticipants: 30,
    tags: ['Beach Cleanup', 'Restoration', 'Marine Life'],
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Urban Tree Planting Initiative',
    description: 'Plant trees in urban areas to improve air quality and create green spaces for the community.',
    organizer: {
      name: 'City Green Initiative',
      avatar: 'https://via.placeholder.com/40',
    },
    date: '2024-03-22',
    time: '10:00 AM',
    location: 'Downtown District, Chicago',
    participants: [
      { name: 'Lisa', avatar: 'https://via.placeholder.com/32' },
      { name: 'Tom', avatar: 'https://via.placeholder.com/32' },
      { name: 'Anna', avatar: 'https://via.placeholder.com/32' },
      { name: 'Chris', avatar: 'https://via.placeholder.com/32' },
    ],
    participantCount: 18,
    maxParticipants: 40,
    tags: ['Tree Planting', 'Urban Green', 'Air Quality'],
    status: 'upcoming',
  },
];

export const EventsPage: React.FC = () => {
  const handleJoinEvent = (eventId: string) => {
    console.log('Joining event:', eventId);
    // In a real app, this would dispatch an action to join the event
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Community Events
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Join local environmental events and make a difference in your community
        </Typography>
      </Box>

      {/* Events Grid */}
      <Grid container spacing={3}>
        {mockEvents.map((event) => (
          <Grid item xs={12} md={6} lg={4} key={event.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '6px',
                  background: 'linear-gradient(90deg, #2E7D32, #4CAF50, #66BB6A)',
                },
                '&:hover': {
                  '& .event-image': {
                    transform: 'scale(1.05)',
                  },
                },
              }}
            >
              <Box
                className="event-image"
                sx={{
                  height: 200,
                  background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 50%, #66BB6A 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease',
                  position: 'relative',
                  '&::after': {
                    content: '"🌱"',
                    fontSize: '4rem',
                    position: 'absolute',
                  },
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                {/* Event title */}
                <Typography variant="h6" component="h3" gutterBottom>
                  {event.title}
                </Typography>

                {/* Organizer */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={event.organizer.avatar} sx={{ width: 24, height: 24, mr: 1 }}>
                    {event.organizer.name.charAt(0)}
                  </Avatar>
                  <Typography variant="caption" color="text.secondary">
                    by {event.organizer.name}
                  </Typography>
                </Box>

                {/* Description */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {event.description}
                </Typography>

                {/* Event details */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TimeIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="caption">
                      {event.date} at {event.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="caption">{event.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PeopleIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="caption">
                      {event.participantCount}/{event.maxParticipants} participants
                    </Typography>
                  </Box>
                </Box>

                {/* Participants avatars */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AvatarGroup max={4} sx={{ mr: 1 }}>
                    {event.participants.map((participant, index) => (
                      <Avatar
                        key={index}
                        src={participant.avatar}
                        sx={{ width: 24, height: 24 }}
                      >
                        {participant.name.charAt(0)}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  {event.participantCount > 4 && (
                    <Typography variant="caption" color="text.secondary">
                      +{event.participantCount - 4} more
                    </Typography>
                  )}
                </Box>

                {/* Tags */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {event.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>

                {/* Join button */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleJoinEvent(event.id)}
                  disabled={event.participantCount >= event.maxParticipants}
                >
                  {event.participantCount >= event.maxParticipants ? 'Event Full' : 'Join Event'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Floating Action Button for creating new event */}
      <Fab
        color="primary"
        aria-label="create event"
        sx={{
          position: 'fixed',
          bottom: { xs: 90, md: 20 },
          right: 20,
        }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};