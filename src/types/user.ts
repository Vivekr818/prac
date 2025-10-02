export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  joinDate: Date;
  impactScore: number;
  badges: Badge[];
  preferences: UserPreferences;
  isVerified: boolean;
  isAuthority: boolean;
  stats: UserStats;
}

export interface UserStats {
  eventsJoined: number;
  eventsOrganized: number;
  issuesReported: number;
  issuesResolved: number;
  postsCreated: number;
  likesReceived: number;
  commentsReceived: number;
  totalImpactPoints: number;
  streakDays: number;
  level: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  earnedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export type BadgeCategory = 
  | 'cleanup' 
  | 'reporting' 
  | 'social' 
  | 'leadership' 
  | 'consistency' 
  | 'impact';

export interface UserPreferences {
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
  display: DisplayPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  eventReminders: boolean;
  issueUpdates: boolean;
  communityHighlights: boolean;
  weeklyDigest: boolean;
  achievementAlerts: boolean;
}

export interface PrivacyPreferences {
  showLocation: boolean;
  showActivity: boolean;
  showStats: boolean;
  allowMessaging: boolean;
  profileVisibility: 'public' | 'community' | 'private';
}

export interface DisplayPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  dateFormat: string;
}

export interface UpdateProfileData {
  name?: string;
  bio?: string;
  avatar?: File;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  preferences?: Partial<UserPreferences>;
}