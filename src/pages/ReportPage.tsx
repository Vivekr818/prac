import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Grid,
  Paper,
} from '@mui/material';
import {
  PhotoCamera as CameraIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
} from '@mui/icons-material';

const issueCategories = [
  'Garbage/Litter',
  'Potholes',
  'Broken Street Lights',
  'Graffiti',
  'Damaged Infrastructure',
  'Illegal Dumping',
  'Water Pollution',
  'Air Quality',
  'Noise Pollution',
  'Other',
];

export const ReportPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    photos: [] as File[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files].slice(0, 5), // Limit to 5 photos
    }));
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter it manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Submitting issue report:', formData);
      
      setSubmitSuccess(true);
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        photos: [],
      });
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Report an Issue
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Help improve your community by reporting environmental issues
        </Typography>
      </Box>

      {submitSuccess && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSubmitSuccess(false)}>
          Issue reported successfully! Tracking ID: #ENV-{Math.random().toString(36).substr(2, 9).toUpperCase()}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Issue Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Issue Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                  placeholder="Brief description of the issue"
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    label="Category"
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    {issueCategories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Location */}
              <Grid item xs={12} sm={6}>
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
                    <LocationIcon />
                  </Button>
                </Box>
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                  placeholder="Provide detailed information about the issue"
                />
              </Grid>

              {/* Photo Upload */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Photos (Optional)
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CameraIcon />}
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
                </Box>

                {/* Photo Preview */}
                {formData.photos.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.photos.map((photo, index) => (
                      <Paper
                        key={index}
                        sx={{
                          position: 'relative',
                          width: 100,
                          height: 100,
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <Chip
                          label="×"
                          size="small"
                          onClick={() => removePhoto(index)}
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            minWidth: 'auto',
                            width: 20,
                            height: 20,
                          }}
                        />
                      </Paper>
                    ))}
                  </Box>
                )}
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isSubmitting}
                  startIcon={<SendIcon />}
                >
                  {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Info Section */}
      <Box sx={{ mt: 4 }}>
        <Alert severity="info">
          <Typography variant="body2">
            <strong>What happens next?</strong><br />
            • Your report will be reviewed and categorized using AI<br />
            • Local authorities will be notified automatically<br />
            • You'll receive updates on the resolution progress<br />
            • The issue will be visible on the community map
          </Typography>
        </Alert>
      </Box>
    </Container>
  );
};