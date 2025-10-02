export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  location?: Coordinates;
  joinDate: Date;
  impactScore: number;
  badges: Badge[];
  preferences: UserPreferences;
  isVerified: boolean;
  isAuthority: boolean;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    eventReminders: boolean;
    issueUpdates: boolean;
    communityHighlights: boolean;
  };
  privacy: {
    showLocation: boolean;
    showActivity: boolean;
    allowMessaging: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export type SocialProvider = 'google' | 'facebook';

export interface SocialLoginData {
  provider: SocialProvider;
  token: string;
}