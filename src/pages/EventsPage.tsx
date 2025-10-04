import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Schedule as TimeIcon,
  People as PeopleIcon,
  Add as AddIcon,
  Event as EventIcon,
  Close as CloseIcon,
  PhotoCamera as PhotoIcon,
  MyLocation as GPSIcon,
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
  Description as DescriptionIcon,
  Category as CategoryIcon,
  Favorite as LikeIcon,
  FavoriteBorder as LikeOutlineIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  Visibility as ViewIcon,
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkedIcon,
} from '@mui/icons-material';

// Mock data for events with enhanced engagement metrics
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
    // Enhanced engagement metrics
    likes: 156,
    comments: 23,
    shares: 12,
    views: 1247,
    bookmarks: 34,
    isLiked: false,
    isBookmarked: false,
    createdAt: '2024-03-01',
    impactScore: 85,
    carbonOffset: '2.5 tons CO2',
    wasteCollected: '150 kg',
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
    // Enhanced engagement metrics
    likes: 89,
    comments: 15,
    shares: 8,
    views: 892,
    bookmarks: 21,
    isLiked: true,
    isBookmarked: false,
    createdAt: '2024-02-28',
    impactScore: 92,
    carbonOffset: '1.8 tons CO2',
    wasteCollected: '200 kg',
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
    // Enhanced engagement metrics
    likes: 203,
    comments: 31,
    shares: 18,
    views: 1456,
    bookmarks: 45,
    isLiked: false,
    isBookmarked: true,
    createdAt: '2024-02-25',
    impactScore: 88,
    carbonOffset: '3.2 tons CO2',
    wasteCollected: '0 kg',
  },
];

interface EventFormData {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  maxParticipants: number;
  equipmentProvided: boolean;
  bringOwnEquipment: string;
  refreshments: boolean;
  ageRestriction: string;
  difficultyLevel: string;
  contactEmail: string;
  contactPhone: string;
  specialInstructions: string;
  tags: string[];
  photos: File[];
}

const eventCategories = [
  'Park Cleanup',
  'Beach Cleanup',
  'Tree Planting',
  'River Restoration',
  'Wildlife Conservation',
  'Recycling Drive',
  'Community Garden',
  'Environmental Education',
  'Waste Reduction',
  'Energy Conservation',
];

const difficultyLevels = ['Easy', 'Moderate', 'Challenging'];
const ageRestrictions = ['All Ages', '13+', '16+', '18+'];

export const EventsPage: React.FC = () => {
  const [hostDialogOpen, setHostDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [events, setEvents] = useState(mockEvents);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    maxParticipants: 20,
    equipmentProvided: true,
    bringOwnEquipment: '',
    refreshments: false,
    ageRestriction: 'All Ages',
    difficultyLevel: 'Easy',
    contactEmail: '',
    contactPhone: '',
    specialInstructions: '',
    tags: [],
    photos: [],
  });

  const steps = ['Basic Info', 'Details & Logistics', 'Contact & Publish'];

  const handleJoinEvent = (eventId: string) => {
    console.log('Joining event:', eventId);
    // In a real app, this would dispatch an action to join the event
  };

  const handleLikeEvent = (eventId: string) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? {
              ...event,
              isLiked: !event.isLiked,
              likes: event.isLiked ? event.likes - 1 : event.likes + 1,
            }
          : event
      )
    );
  };

  const handleBookmarkEvent = (eventId: string) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, isBookmarked: !event.isBookmarked }
          : event
      )
    );
  };

  const handleShareEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      navigator.clipboard.writeText(`Check out this event: ${event.title}`);
      // In a real app, this would open a share dialog
      console.log('Event shared:', event.title);
    }
  };

  const handleHostEvent = () => {
    setHostDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setHostDialogOpen(false);
    setActiveStep(0);
    setFormData({
      title: '',
      description: '',
      category: '',
      date: '',
      time: '',
      duration: '',
      location: '',
      maxParticipants: 20,
      equipmentProvided: true,
      bringOwnEquipment: '',
      refreshments: false,
      ageRestriction: 'All Ages',
      difficultyLevel: 'Easy',
      contactEmail: '',
      contactPhone: '',
      specialInstructions: '',
      tags: [],
      photos: [],
    });
  };

  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    console.log('Creating event:', formData);
    // In a real app, this would submit the event data
    handleCloseDialog();
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleInputChange('location', `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter it manually.');
        }
      );
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleInputChange('photos', [...formData.photos, ...files].slice(0, 5));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Event Title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
              placeholder="e.g., Central Park Cleanup Drive"
            />
            
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Event Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
              placeholder="Describe what participants will do, what to expect, and the environmental impact..."
            />

            <FormControl fullWidth required>
              <InputLabel>Event Category</InputLabel>
              <Select
                value={formData.category}
                label="Event Category"
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                {eventCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="date"
                  label="Event Date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="time"
                  label="Start Time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Duration"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="e.g., 3 hours"
                  required
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
                placeholder="Address or coordinates"
              />
              <Button
                variant="outlined"
                onClick={getCurrentLocation}
                sx={{ minWidth: 'auto', px: 2 }}
              >
                <GPSIcon />
              </Button>
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              type="number"
              label="Maximum Participants"
              value={formData.maxParticipants}
              onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value))}
              required
              inputProps={{ min: 1, max: 1000 }}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Difficulty Level</InputLabel>
                  <Select
                    value={formData.difficultyLevel}
                    label="Difficulty Level"
                    onChange={(e) => handleInputChange('difficultyLevel', e.target.value)}
                  >
                    {difficultyLevels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Age Restriction</InputLabel>
                  <Select
                    value={formData.ageRestriction}
                    label="Age Restriction"
                    onChange={(e) => handleInputChange('ageRestriction', e.target.value)}
                  >
                    {ageRestrictions.map((age) => (
                      <MenuItem key={age} value={age}>
                        {age}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.equipmentProvided}
                    onChange={(e) => handleInputChange('equipmentProvided', e.target.checked)}
                  />
                }
                label="Equipment will be provided"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.refreshments}
                    onChange={(e) => handleInputChange('refreshments', e.target.checked)}
                  />
                }
                label="Refreshments will be provided"
              />
            </Box>

            <TextField
              fullWidth
              label="What should participants bring?"
              value={formData.bringOwnEquipment}
              onChange={(e) => handleInputChange('bringOwnEquipment', e.target.value)}
              placeholder="e.g., Water bottle, sunscreen, comfortable shoes..."
              multiline
              rows={2}
            />

            <TextField
              fullWidth
              label="Special Instructions"
              value={formData.specialInstructions}
              onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
              placeholder="Any additional information participants should know..."
              multiline
              rows={3}
            />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Event Photos (Optional)
              </Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<PhotoIcon />}
                disabled={formData.photos.length >= 5}
              >
                Add Photos ({formData.photos.length}/5)
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </Button>
              {formData.photos.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  {formData.photos.map((photo, index) => (
                    <Paper key={index} sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                      <Typography variant="caption">{photo.name}</Typography>
                    </Paper>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            
            <TextField
              fullWidth
              type="email"
              label="Contact Email"
              value={formData.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              required
              placeholder="your.email@example.com"
            />

            <TextField
              fullWidth
              label="Contact Phone (Optional)"
              value={formData.contactPhone}
              onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />

            <Divider />

            <Typography variant="h6" gutterBottom>
              Event Summary
            </Typography>
            
            <Paper sx={{ p: 3, backgroundColor: '#f8f9fa' }}>
              <Typography variant="h6" gutterBottom>{formData.title}</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {formData.description}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      {formData.date} at {formData.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{formData.location}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <GroupIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      Max {formData.maxParticipants} participants
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CategoryIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{formData.category}</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 2 }}>
                <Chip label={formData.difficultyLevel} size="small" sx={{ mr: 1 }} />
                <Chip label={formData.ageRestriction} size="small" sx={{ mr: 1 }} />
                {formData.equipmentProvided && (
                  <Chip label="Equipment Provided" size="small" sx={{ mr: 1 }} />
                )}
                {formData.refreshments && (
                  <Chip label="Refreshments Included" size="small" />
                )}
              </Box>
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Community Events
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join local environmental events and make a difference in your community
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<EventIcon />}
          onClick={handleHostEvent}
          sx={{
            backgroundColor: '#4CAF50',
            '&:hover': { backgroundColor: '#45a049' },
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontWeight: 600,
          }}
        >
          Host Event
        </Button>
      </Box>

      {/* Events Grid */}
      <Grid container spacing={3}>
        {events.map((event) => (
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

                {/* Environmental Impact Metrics */}
                <Box sx={{ mb: 2, p: 2, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                    Expected Environmental Impact
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                        {event.carbonOffset}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        CO₂ Offset
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                        {event.wasteCollected}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Waste Collected
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                        {event.impactScore}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Impact Score
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Engagement Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleLikeEvent(event.id)}
                      sx={{ color: event.isLiked ? '#f44336' : 'text.secondary' }}
                    >
                      {event.isLiked ? <LikeIcon /> : <LikeOutlineIcon />}
                    </IconButton>
                    <Typography variant="caption">{event.likes}</Typography>

                    <IconButton size="small" sx={{ color: 'text.secondary', ml: 1 }}>
                      <CommentIcon />
                    </IconButton>
                    <Typography variant="caption">{event.comments}</Typography>

                    <IconButton
                      size="small"
                      onClick={() => handleShareEvent(event.id)}
                      sx={{ color: 'text.secondary', ml: 1 }}
                    >
                      <ShareIcon />
                    </IconButton>
                    <Typography variant="caption">{event.shares}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ViewIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {event.views}
                    </Typography>
                    
                    <IconButton
                      size="small"
                      onClick={() => handleBookmarkEvent(event.id)}
                      sx={{ color: event.isBookmarked ? '#4CAF50' : 'text.secondary' }}
                    >
                      {event.isBookmarked ? <BookmarkedIcon /> : <BookmarkIcon />}
                    </IconButton>
                  </Box>
                </Box>

                {/* Join button */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleJoinEvent(event.id)}
                  disabled={event.participantCount >= event.maxParticipants}
                  sx={{
                    backgroundColor: '#4CAF50',
                    '&:hover': { backgroundColor: '#45a049' },
                  }}
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
        onClick={handleHostEvent}
        sx={{
          position: 'fixed',
          bottom: { xs: 90, md: 20 },
          right: 20,
          backgroundColor: '#4CAF50',
          '&:hover': { backgroundColor: '#45a049' },
        }}
      >
        <AddIcon />
      </Fab>

      {/* Host Event Dialog */}
      <Dialog
        open={hostDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EventIcon sx={{ color: '#4CAF50' }} />
            <Typography variant="h6">Host Environmental Event</Typography>
          </Box>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ px: 3 }}>
          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          {renderStepContent(activeStep)}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
              disabled={!formData.title || !formData.description || !formData.contactEmail}
            >
              Create Event
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
              disabled={
                activeStep === 0 && (!formData.title || !formData.description || !formData.category || !formData.date || !formData.time || !formData.location)
              }
            >
              Next
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};