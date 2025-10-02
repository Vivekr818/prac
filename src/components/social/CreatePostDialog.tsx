import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
  Chip,
  Grid,
  Typography,
  Autocomplete,
  Paper,
} from '@mui/material';
import {
  PhotoCamera as CameraIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon,
  EmojiEmotions as EmojiIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CreatePostData } from '../../types/social';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { createPost } from '../../store/socialSlice';

const schema = yup.object({
  content: yup
    .string()
    .min(1, 'Post content is required')
    .max(2000, 'Post content must be less than 2000 characters')
    .required('Post content is required'),
  ecoTags: yup
    .array()
    .of(yup.string())
    .max(5, 'Maximum 5 eco-tags allowed'),
});

interface CreatePostDialogProps {
  open: boolean;
  onClose: () => void;
}

const availableEcoTags = [
  'Beach Cleanup',
  'Recycling',
  'Upcycling',
  'Solar Energy',
  'Urban Gardening',
  'Zero Waste',
  'Composting',
  'Water Conservation',
  'Bike Commuting',
  'Tree Planting',
  'Energy Saving',
  'Plastic Free',
  'Organic Food',
  'Green Transportation',
  'Wildlife Conservation',
];

export const CreatePostDialog: React.FC<CreatePostDialogProps> = ({
  open,
  onClose,
}) => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [location, setLocation] = useState<{ latitude: number; longitude: number; address?: string } | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<CreatePostData>({
    resolver: yupResolver(schema),
    defaultValues: {
      content: '',
      ecoTags: [],
    },
  });

  const contentLength = watch('content')?.length || 0;

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setPhotos(prev => [...prev, ...files].slice(0, 4)); // Limit to 4 photos
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const onSubmit = async (data: CreatePostData) => {
    try {
      const postData: CreatePostData = {
        ...data,
        photos: photos.length > 0 ? photos : undefined,
        location: location || undefined,
      };

      await dispatch(createPost(postData)).unwrap();
      
      // Reset form and close dialog
      reset();
      setPhotos([]);
      setLocation(null);
      onClose();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleClose = () => {
    reset();
    setPhotos([]);
    setLocation(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Create Post</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          {/* User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar src={user?.avatar} sx={{ mr: 2 }}>
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="subtitle1" fontWeight={600}>
              {user?.name}
            </Typography>
          </Box>

          {/* Post Content */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={4}
                placeholder="What's happening in your environmental journey?"
                variant="outlined"
                error={!!errors.content}
                helperText={
                  errors.content?.message || 
                  `${contentLength}/2000 characters`
                }
                sx={{ mb: 2 }}
              />
            )}
          />

          {/* Eco Tags */}
          <Controller
            name="ecoTags"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                options={availableEcoTags}
                value={field.value || []}
                onChange={(_, newValue) => field.onChange(newValue)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      color="primary"
                      {...getTagProps({ index })}
                      key={option}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Eco Tags"
                    placeholder="Add eco-friendly tags..."
                    error={!!errors.ecoTags}
                    helperText={errors.ecoTags?.message || 'Add up to 5 tags to categorize your post'}
                  />
                )}
                sx={{ mb: 2 }}
              />
            )}
          />

          {/* Photo Upload */}
          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CameraIcon />}
              disabled={photos.length >= 4}
              sx={{ mb: 1 }}
            >
              Add Photos ({photos.length}/4)
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </Button>

            {/* Photo Preview */}
            {photos.length > 0 && (
              <Grid container spacing={1} sx={{ mt: 1 }}>
                {photos.map((photo, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Paper
                      sx={{
                        position: 'relative',
                        paddingTop: '100%', // 1:1 Aspect Ratio
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <IconButton
                        onClick={() => removePhoto(index)}
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.7)',
                          },
                        }}
                        size="small"
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>

          {/* Location */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={<LocationIcon />}
              onClick={getCurrentLocation}
              color={location ? 'primary' : 'inherit'}
            >
              {location ? 'Location Added' : 'Add Location'}
            </Button>
            {location && (
              <Chip
                label={location.address || 'Location shared'}
                onDelete={() => setLocation(null)}
                color="primary"
                variant="outlined"
              />
            )}
          </Box>

          {/* Quick Actions */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <IconButton color="primary">
              <EmojiIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
              Add emoji, mention friends, or share your mood
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={isSubmitting || contentLength === 0}
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};