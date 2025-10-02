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
  Grid,
  FormControlLabel,
  Switch,
  Typography,
  Divider,
} from '@mui/material';
import {
  PhotoCamera as CameraIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserProfile, UpdateProfileData } from '../../types/user';

const schema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  bio: yup
    .string()
    .max(500, 'Bio must be less than 500 characters'),
  location: yup.object({
    address: yup.string(),
  }),
});

interface ProfileEditDialogProps {
  open: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (data: UpdateProfileData) => void;
  isLoading?: boolean;
}

export const ProfileEditDialog: React.FC<ProfileEditDialogProps> = ({
  open,
  onClose,
  profile,
  onSave,
  isLoading = false,
}) => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(profile.avatar || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<UpdateProfileData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: profile.name,
      bio: profile.bio || '',
      location: {
        address: profile.location?.address || '',
      },
      preferences: profile.preferences,
    },
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setValue('location.address', `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter it manually.');
        }
      );
    }
  };

  const onSubmit = (data: UpdateProfileData) => {
    const submitData = {
      ...data,
      ...(avatarFile && { avatar: avatarFile }),
    };
    onSave(submitData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {/* Avatar Section */}
            <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={avatarPreview}
                  sx={{ width: 100, height: 100, mb: 2 }}
                >
                  {profile.name.charAt(0).toUpperCase()}
                </Avatar>
                <IconButton
                  component="label"
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: -8,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  <CameraIcon />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </IconButton>
              </Box>
            </Grid>

            {/* Basic Info */}
            <Grid item xs={12}>
              <TextField
                {...register('name')}
                fullWidth
                label="Full Name"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('bio')}
                fullWidth
                multiline
                rows={3}
                label="Bio"
                placeholder="Tell us about yourself and your environmental interests..."
                error={!!errors.bio}
                helperText={errors.bio?.message || `${watch('bio')?.length || 0}/500 characters`}
              />
            </Grid>

            {/* Location */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  {...register('location.address')}
                  fullWidth
                  label="Location"
                  placeholder="City, State, Country or coordinates"
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

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Privacy Settings
              </Typography>
            </Grid>

            {/* Privacy Settings */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    {...register('preferences.privacy.showLocation')}
                    defaultChecked={profile.preferences.privacy.showLocation}
                  />
                }
                label="Show Location"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    {...register('preferences.privacy.showActivity')}
                    defaultChecked={profile.preferences.privacy.showActivity}
                  />
                }
                label="Show Activity"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    {...register('preferences.privacy.showStats')}
                    defaultChecked={profile.preferences.privacy.showStats}
                  />
                }
                label="Show Statistics"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    {...register('preferences.privacy.allowMessaging')}
                    defaultChecked={profile.preferences.privacy.allowMessaging}
                  />
                }
                label="Allow Messaging"
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Notification Settings
              </Typography>
            </Grid>

            {/* Notification Settings */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    {...register('preferences.notifications.email')}
                    defaultChecked={profile.preferences.notifications.email}
                  />
                }
                label="Email Notifications"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    {...register('preferences.notifications.push')}
                    defaultChecked={profile.preferences.notifications.push}
                  />
                }
                label="Push Notifications"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    {...register('preferences.notifications.eventReminders')}
                    defaultChecked={profile.preferences.notifications.eventReminders}
                  />
                }
                label="Event Reminders"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    {...register('preferences.notifications.issueUpdates')}
                    defaultChecked={profile.preferences.notifications.issueUpdates}
                  />
                }
                label="Issue Updates"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};