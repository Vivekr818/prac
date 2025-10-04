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
    SmartToy as AIIcon,
    Category as CategoryIcon,
    CheckCircle as CheckIcon,
    Chat as ChatIcon,
} from '@mui/icons-material';
import { AIChatBot } from '../components/ai/AIChatBot';

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
    const [aiChatOpen, setAiChatOpen] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState<{
        category: string;
        confidence: number;
        suggestions: string[];
    } | null>(null);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const newPhotos = [...formData.photos, ...files].slice(0, 5);
        
        setFormData(prev => ({
            ...prev,
            photos: newPhotos,
        }));

        // Simulate AI analysis when photos are uploaded
        if (files.length > 0) {
            setTimeout(() => {
                const categories = ['Water Pollution', 'Illegal Dumping', 'Broken Street Lights', 'Air Quality', 'Garbage/Litter'];
                const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                const confidence = 0.85 + Math.random() * 0.1; // 85-95% confidence
                
                setAiAnalysis({
                    category: randomCategory,
                    confidence: confidence,
                    suggestions: [
                        'Document the exact location with GPS coordinates',
                        'Include time and date information',
                        'Take photos from multiple angles',
                        'Note any immediate safety concerns',
                    ],
                });

                // Auto-fill category if confidence is high
                if (confidence > 0.9) {
                    setFormData(prev => ({
                        ...prev,
                        category: randomCategory,
                    }));
                }
            }, 2000);
        }
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
            setAiAnalysis(null);
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

                            {/* AI Analysis Results */}
                            {aiAnalysis && (
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 3, backgroundColor: '#e3f2fd', border: '1px solid #2196f3' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                            <AIIcon sx={{ color: '#1976d2' }} />
                                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
                                                AI Analysis Results
                                            </Typography>
                                            <Chip
                                                icon={<CheckIcon />}
                                                label={`${Math.round(aiAnalysis.confidence * 100)}% Confident`}
                                                size="small"
                                                sx={{ backgroundColor: '#4caf50', color: 'white' }}
                                            />
                                        </Box>
                                        
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="subtitle2" gutterBottom>
                                                Detected Category:
                                            </Typography>
                                            <Chip
                                                icon={<CategoryIcon />}
                                                label={aiAnalysis.category}
                                                sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 600 }}
                                            />
                                        </Box>

                                        <Box>
                                            <Typography variant="subtitle2" gutterBottom>
                                                AI Suggestions:
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                {aiAnalysis.suggestions.map((suggestion, index) => (
                                                    <Typography key={index} variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <CheckIcon sx={{ fontSize: 16, color: '#4caf50' }} />
                                                        {suggestion}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        </Box>

                                        {aiAnalysis.confidence > 0.9 && (
                                            <Alert severity="success" sx={{ mt: 2 }}>
                                                High confidence detection! Category has been auto-filled.
                                            </Alert>
                                        )}
                                    </Paper>
                                </Grid>
                            )}

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

            {/* AI Chat Bot Floating Action Button */}
            <Button
                variant="contained"
                onClick={() => setAiChatOpen(true)}
                startIcon={<ChatIcon />}
                sx={{
                    position: 'fixed',
                    bottom: { xs: 90, md: 20 },
                    right: 20,
                    backgroundColor: '#2196f3',
                    '&:hover': { backgroundColor: '#1976d2' },
                    borderRadius: 3,
                    px: 3,
                    py: 1.5,
                    boxShadow: '0 4px 16px rgba(33, 150, 243, 0.3)',
                }}
            >
                Ask AI
            </Button>

            {/* AI Chat Bot Dialog */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: aiChatOpen ? 20 : -500,
                    right: 20,
                    width: { xs: '90vw', sm: 400 },
                    height: 500,
                    transition: 'bottom 0.3s ease-in-out',
                    zIndex: 1300,
                }}
            >
                <Paper
                    sx={{
                        height: '100%',
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    }}
                >
                    <AIChatBot 
                        onClose={() => setAiChatOpen(false)} 
                        context="report"
                    />
                </Paper>
            </Box>
        </Container>
    );
};