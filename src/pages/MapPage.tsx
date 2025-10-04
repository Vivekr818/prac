import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Toolbar,
  Divider,
  Badge,
  Drawer,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  Layers as LayersIcon,
  MyLocation as MyLocationIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Fullscreen as FullscreenIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Map as MapIcon,
  Satellite as SatelliteIcon,
  Terrain as TerrainIcon,
  Chat as ChatIcon,
  SmartToy as AIIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { AIChatBot } from '../components/ai/AIChatBot';

export const MapPage: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [mapStyle, setMapStyle] = useState<'default' | 'satellite' | 'terrain'>('default');

  const mapIssues = [
    {
      id: '1',
      title: 'Illegal Dumping Site',
      category: 'Waste',
      aiCategory: 'Solid Waste - Construction Debris', // AI categorized
      status: 'Open',
      location: { lat: 40.7128, lng: -74.0060 },
      address: '123 Main St, New York, NY',
      reporter: 'Sarah Johnson',
      reportedDate: '2024-03-10',
      description: 'Large pile of construction waste dumped illegally behind the building.',
      photos: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'],
      upvotes: 15,
      aiConfidence: 0.95,
    },
    {
      id: '2',
      title: 'Broken Street Light',
      category: 'Infrastructure',
      aiCategory: 'Infrastructure - Street Lighting', // AI categorized
      status: 'In Progress',
      location: { lat: 40.7589, lng: -73.9851 },
      address: '456 Park Ave, New York, NY',
      reporter: 'Mike Chen',
      reportedDate: '2024-03-08',
      description: 'Street light has been out for 2 weeks, creating safety hazard.',
      photos: ['https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=300&h=200&fit=crop'],
      upvotes: 8,
      aiConfidence: 0.88,
    },
    {
      id: '3',
      title: 'Water Pollution',
      category: 'Water',
      aiCategory: 'Water Pollution - Chemical Runoff', // AI categorized
      status: 'Resolved',
      location: { lat: 40.7505, lng: -73.9934 },
      address: '789 River St, New York, NY',
      reporter: 'Emma Rodriguez',
      reportedDate: '2024-03-05',
      description: 'Chemical runoff visible in local stream.',
      photos: ['https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=300&h=200&fit=crop'],
      upvotes: 23,
      aiConfidence: 0.92,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return '#f44336';
      case 'In Progress': return '#ff9800';
      case 'Resolved': return '#4caf50';
      default: return '#757575';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Waste': return '#8bc34a';
      case 'Infrastructure': return '#2196f3';
      case 'Water': return '#00bcd4';
      case 'Air': return '#9c27b0';
      default: return '#607d8b';
    }
  };

  const MapIconBar = () => (
    <Card sx={{ mb: 2, borderRadius: 2 }}>
      <Toolbar sx={{ minHeight: '64px !important', px: 2 }}>
        {/* Left side - Map controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            color="primary"
            sx={{ 
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.2)' }
            }}
          >
            <MyLocationIcon />
          </IconButton>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          
          <IconButton onClick={() => {}}>
            <ZoomInIcon />
          </IconButton>
          <IconButton onClick={() => {}}>
            <ZoomOutIcon />
          </IconButton>
          <IconButton onClick={() => {}}>
            <FullscreenIcon />
          </IconButton>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          
          {/* Map style toggles */}
          <IconButton 
            color={mapStyle === 'default' ? 'primary' : 'default'}
            onClick={() => setMapStyle('default')}
          >
            <MapIcon />
          </IconButton>
          <IconButton 
            color={mapStyle === 'satellite' ? 'primary' : 'default'}
            onClick={() => setMapStyle('satellite')}
          >
            <SatelliteIcon />
          </IconButton>
          <IconButton 
            color={mapStyle === 'terrain' ? 'primary' : 'default'}
            onClick={() => setMapStyle('terrain')}
          >
            <TerrainIcon />
          </IconButton>
        </Box>

        {/* Center - Search */}
        <Box sx={{ flexGrow: 1, mx: 3 }}>
          <TextField
            size="small"
            placeholder="Search locations, reports, or addresses..."
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
              sx: { borderRadius: 3 }
            }}
          />
        </Box>

        {/* Right side - Filters and actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={() => {}}>
            <RefreshIcon />
          </IconButton>
          
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={() => setShowFilters(!showFilters)}
            sx={{ borderColor: '#4CAF50', color: '#4CAF50', borderRadius: 2 }}
          >
            Filters
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<LayersIcon />}
            sx={{ borderColor: '#4CAF50', color: '#4CAF50', borderRadius: 2 }}
          >
            Layers
          </Button>

          <Badge badgeContent={mapIssues.length} color="error">
            <Button
              variant="contained"
              startIcon={<LocationIcon />}
              sx={{ 
                backgroundColor: '#4CAF50', 
                borderRadius: 2,
                '&:hover': { backgroundColor: '#45a049' }
              }}
            >
              Reports
            </Button>
          </Badge>
        </Box>
      </Toolbar>
    </Card>
  );

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#2c3e50', mb: 1 }}>
            Environmental Issues Map 🗺️
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and report environmental issues in your community with AI-powered categorization
          </Typography>
        </Box>

        {/* Map Icon Bar */}
        <MapIconBar />

        <Grid container spacing={3}>
          {/* Map Area */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ height: 600, position: 'relative', borderRadius: 3 }}>
              <Box
                sx={{
                  height: '100%',
                  background: mapStyle === 'satellite' 
                    ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
                    : mapStyle === 'terrain'
                    ? 'linear-gradient(135deg, #8d6e63 0%, #a1887f 100%)'
                    : 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  borderRadius: 3,
                }}
              >
                {/* Mock Map Interface */}
                <Box sx={{ textAlign: 'center' }}>
                  <LocationIcon sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
                  <Typography variant="h6" color={mapStyle === 'default' ? '#2c3e50' : 'white'}>
                    Interactive Map View ({mapStyle})
                  </Typography>
                  <Typography variant="body2" color={mapStyle === 'default' ? 'text.secondary' : 'rgba(255,255,255,0.7)'}>
                    Click on markers to view issue details
                  </Typography>
                </Box>

                {/* Mock Map Markers with AI Categories */}
                {mapIssues.map((issue, index) => (
                  <Box
                    key={issue.id}
                    sx={{
                      position: 'absolute',
                      top: `${30 + index * 15}%`,
                      left: `${20 + index * 20}%`,
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: getStatusColor(issue.status),
                        border: '3px solid white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover': {
                          transform: 'scale(1.2)',
                        },
                      }}
                    >
                      <CategoryIcon sx={{ fontSize: 16, color: 'white' }} />
                    </Box>
                    {/* AI Confidence Badge */}
                    <Chip
                      label={`AI: ${Math.round(issue.aiConfidence * 100)}%`}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -20,
                        fontSize: '0.6rem',
                        height: 16,
                        backgroundColor: '#2196f3',
                        color: 'white',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Issue Details Panel */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ height: 600, borderRadius: 3, overflow: 'hidden' }}>
              <CardContent sx={{ p: 0, height: '100%' }}>
                {selectedIssue ? (
                  <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {selectedIssue.title}
                      </Typography>
                      <IconButton size="small" onClick={() => setSelectedIssue(null)}>
                        <CloseIcon />
                      </IconButton>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <img
                        src={selectedIssue.photos[0]}
                        alt={selectedIssue.title}
                        style={{
                          width: '100%',
                          height: 200,
                          objectFit: 'cover',
                          borderRadius: 8,
                        }}
                      />
                    </Box>

                    {/* AI Categorization Display */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        AI Analysis
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <AIIcon sx={{ fontSize: 16, color: '#2196f3' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {selectedIssue.aiCategory}
                        </Typography>
                        <Chip
                          label={`${Math.round(selectedIssue.aiConfidence * 100)}% confident`}
                          size="small"
                          sx={{ backgroundColor: '#e3f2fd', color: '#1976d2', fontSize: '0.7rem' }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                      <Chip
                        label={selectedIssue.status}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(selectedIssue.status),
                          color: 'white',
                          fontWeight: 600,
                        }}
                      />
                      <Chip
                        label={selectedIssue.category}
                        size="small"
                        sx={{
                          backgroundColor: getCategoryColor(selectedIssue.category),
                          color: 'white',
                        }}
                      />
                    </Box>

                    <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                      {selectedIssue.description}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Location
                      </Typography>
                      <Typography variant="body2">{selectedIssue.address}</Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Reported by
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24 }}>
                          {selectedIssue.reporter.charAt(0)}
                        </Avatar>
                        <Typography variant="body2">{selectedIssue.reporter}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          • {selectedIssue.reportedDate}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: '#4CAF50', flex: 1 }}
                      >
                        Upvote ({selectedIssue.upvotes})
                      </Button>
                      <Button variant="outlined" size="small" sx={{ borderColor: '#4CAF50', color: '#4CAF50' }}>
                        Share
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      p: 3,
                    }}
                  >
                    <Box>
                      <LocationIcon sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        Select an Issue
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Click on a marker on the map to view issue details and AI analysis
                      </Typography>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Floating Action Buttons */}
        <Box sx={{ position: 'fixed', bottom: { xs: 90, md: 20 }, right: 20, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* AI Chat Bot Button */}
          <Fab
            color="secondary"
            aria-label="ai chat"
            onClick={() => setAiChatOpen(true)}
            sx={{
              backgroundColor: '#2196f3',
              '&:hover': { backgroundColor: '#1976d2' },
            }}
          >
            <ChatIcon />
          </Fab>
          
          {/* Report Issue Button */}
          <Fab
            color="primary"
            aria-label="report issue"
            onClick={() => setReportDialogOpen(true)}
            sx={{
              backgroundColor: '#4CAF50',
              '&:hover': { backgroundColor: '#45a049' },
            }}
          >
            <AddIcon />
          </Fab>
        </Box>

        {/* AI Chat Bot Drawer */}
        <Drawer
          anchor="right"
          open={aiChatOpen}
          onClose={() => setAiChatOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: { xs: '100%', sm: 400 },
              maxWidth: '100vw',
            },
          }}
        >
          <AIChatBot 
            onClose={() => setAiChatOpen(false)} 
            context="map"
          />
        </Drawer>

        {/* Report Issue Dialog */}
        <Dialog open={reportDialogOpen} onClose={() => setReportDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Report New Issue</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField fullWidth label="Issue Title" sx={{ mb: 2 }} />
              <TextField fullWidth multiline rows={3} label="Description" sx={{ mb: 2 }} />
              <TextField fullWidth label="Location" sx={{ mb: 2 }} />
              
              {/* AI Categorization Placeholder */}
              <Box sx={{ mb: 2, p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <AIIcon sx={{ fontSize: 16, color: '#1976d2' }} />
                  <Typography variant="subtitle2" color="#1976d2">
                    AI will categorize your photos automatically
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Upload photos and AI will analyze and categorize the environmental issue
                </Typography>
              </Box>
              
              <Button variant="contained" fullWidth sx={{ backgroundColor: '#4CAF50' }}>
                Submit Report
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};