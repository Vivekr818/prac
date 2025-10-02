import axios, { AxiosResponse } from 'axios';
import { LoginCredentials, RegisterData, AuthResponse, SocialLoginData, User } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });
          
          const newToken = response.data.token;
          localStorage.setItem('token', newToken);
          
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // For demo purposes, simulate API call with mock data
    if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          email: credentials.email,
          name: 'Demo User',
          avatar: 'https://via.placeholder.com/150',
          location: { latitude: 40.7128, longitude: -74.0060 },
          joinDate: new Date(),
          impactScore: 150,
          badges: [
            {
              id: '1',
              name: 'First Cleanup',
              description: 'Participated in your first cleanup event',
              icon: '🌱',
              earnedAt: new Date(),
            },
          ],
          preferences: {
            notifications: {
              email: true,
              push: true,
              eventReminders: true,
              issueUpdates: true,
              communityHighlights: true,
            },
            privacy: {
              showLocation: true,
              showActivity: true,
              allowMessaging: true,
            },
            theme: 'light',
          },
          isVerified: true,
          isAuthority: false,
        },
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
      };
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockResponse;
    }

    // In a real app, this would make an actual API call
    const response: AxiosResponse<AuthResponse> = await apiClient.post('/auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    // For demo purposes, simulate successful registration
    const mockResponse: AuthResponse = {
      user: {
        id: '2',
        email: userData.email,
        name: userData.name,
        avatar: undefined,
        location: undefined,
        joinDate: new Date(),
        impactScore: 0,
        badges: [],
        preferences: {
          notifications: {
            email: true,
            push: true,
            eventReminders: true,
            issueUpdates: true,
            communityHighlights: true,
          },
          privacy: {
            showLocation: true,
            showActivity: true,
            allowMessaging: true,
          },
          theme: 'light',
        },
        isVerified: false,
        isAuthority: false,
      },
      token: 'mock-jwt-token-new-user',
      refreshToken: 'mock-refresh-token-new-user',
      expiresIn: 3600,
    };

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return mockResponse;

    // In a real app, this would make an actual API call
    // const response: AxiosResponse<AuthResponse> = await apiClient.post('/auth/register', userData);
    // return response.data;
  }

  async socialLogin(socialData: SocialLoginData): Promise<AuthResponse> {
    // For demo purposes, simulate successful social login
    const mockResponse: AuthResponse = {
      user: {
        id: '3',
        email: `${socialData.provider}user@example.com`,
        name: `${socialData.provider.charAt(0).toUpperCase() + socialData.provider.slice(1)} User`,
        avatar: 'https://via.placeholder.com/150',
        location: undefined,
        joinDate: new Date(),
        impactScore: 50,
        badges: [],
        preferences: {
          notifications: {
            email: true,
            push: true,
            eventReminders: true,
            issueUpdates: true,
            communityHighlights: true,
          },
          privacy: {
            showLocation: true,
            showActivity: true,
            allowMessaging: true,
          },
          theme: 'light',
        },
        isVerified: true,
        isAuthority: false,
      },
      token: `mock-jwt-token-${socialData.provider}`,
      refreshToken: `mock-refresh-token-${socialData.provider}`,
      expiresIn: 3600,
    };

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockResponse;

    // In a real app, this would make an actual API call
    // const response: AxiosResponse<AuthResponse> = await apiClient.post('/auth/social-login', socialData);
    // return response.data;
  }

  async logout(): Promise<void> {
    // In a real app, this would invalidate the token on the server
    await apiClient.post('/auth/logout');
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response: AxiosResponse<{ token: string }> = await apiClient.post('/auth/refresh', {
      refreshToken,
    });
    
    return response.data.token;
  }

  async resetPassword(email: string): Promise<void> {
    await apiClient.post('/auth/reset-password', { email });
  }

  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse<User> = await apiClient.get('/auth/me');
    return response.data;
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response: AxiosResponse<User> = await apiClient.put('/auth/profile', userData);
    return response.data;
  }
}

export const authService = new AuthService();