import { UserProfile, UpdateProfileData, UserStats } from '../types/user';

class UserService {
  async getUserProfile(userId: string): Promise<UserProfile> {
    // Mock user profile data
    const mockProfile: UserProfile = {
      id: userId,
      email: 'demo@example.com',
      name: 'Demo User',
      avatar: 'https://via.placeholder.com/150',
      bio: 'Environmental enthusiast passionate about making a positive impact in my community. Love organizing cleanup events and inspiring others to go green! 🌱',
      location: {
        latitude: 40.7128,
        longitude: -74.0060,
        address: 'New York, NY, USA',
      },
      joinDate: new Date('2024-01-15'),
      impactScore: 1250,
      badges: [
        {
          id: '1',
          name: 'First Cleanup',
          description: 'Participated in your first cleanup event',
          icon: '🌱',
          category: 'cleanup',
          earnedAt: new Date('2024-01-20'),
          rarity: 'common',
        },
        {
          id: '2',
          name: 'Issue Reporter',
          description: 'Reported 10 environmental issues',
          icon: '📍',
          category: 'reporting',
          earnedAt: new Date('2024-02-05'),
          rarity: 'common',
        },
        {
          id: '3',
          name: 'Community Leader',
          description: 'Organized 5 successful events',
          icon: '👑',
          category: 'leadership',
          earnedAt: new Date('2024-02-28'),
          rarity: 'rare',
        },
      ],
      preferences: {
        notifications: {
          email: true,
          push: true,
          eventReminders: true,
          issueUpdates: true,
          communityHighlights: true,
          weeklyDigest: true,
          achievementAlerts: true,
        },
        privacy: {
          showLocation: true,
          showActivity: true,
          showStats: true,
          allowMessaging: true,
          profileVisibility: 'public',
        },
        display: {
          theme: 'light',
          language: 'en',
          timezone: 'America/New_York',
          dateFormat: 'MM/DD/YYYY',
        },
      },
      isVerified: true,
      isAuthority: false,
      stats: {
        eventsJoined: 12,
        eventsOrganized: 5,
        issuesReported: 18,
        issuesResolved: 3,
        postsCreated: 24,
        likesReceived: 156,
        commentsReceived: 89,
        totalImpactPoints: 1250,
        streakDays: 15,
        level: 3,
      },
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockProfile;
  }

  async updateProfile(updateData: UpdateProfileData): Promise<UserProfile> {
    // In a real app, this would make an API call
    console.log('Updating profile with:', updateData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return updated profile (mock)
    const updatedProfile = await this.getUserProfile('current-user');
    return {
      ...updatedProfile,
      ...updateData,
      // Handle nested updates
      ...(updateData.preferences && {
        preferences: {
          ...updatedProfile.preferences,
          ...updateData.preferences,
        },
      }),
    };
  }

  async uploadAvatar(file: File): Promise<string> {
    // In a real app, this would upload to cloud storage
    console.log('Uploading avatar:', file.name);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return mock URL
    return `https://via.placeholder.com/150?text=${encodeURIComponent(file.name)}`;
  }

  async getUserStats(userId: string): Promise<UserStats> {
    // Mock stats data
    const mockStats: UserStats = {
      eventsJoined: 12,
      eventsOrganized: 5,
      issuesReported: 18,
      issuesResolved: 3,
      postsCreated: 24,
      likesReceived: 156,
      commentsReceived: 89,
      totalImpactPoints: 1250,
      streakDays: 15,
      level: 3,
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockStats;
  }

  async getLeaderboard(timeframe: 'week' | 'month' | 'all' = 'month'): Promise<UserProfile[]> {
    // Mock leaderboard data
    const mockLeaderboard: UserProfile[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        avatar: 'https://via.placeholder.com/40',
        impactScore: 2150,
        isVerified: true,
        isAuthority: false,
        // ... other required fields with mock data
      } as UserProfile,
      {
        id: '2',
        name: 'Mike Chen',
        email: 'mike@example.com',
        avatar: 'https://via.placeholder.com/40',
        impactScore: 1890,
        isVerified: true,
        isAuthority: false,
        // ... other required fields with mock data
      } as UserProfile,
      // Add more mock users...
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockLeaderboard;
  }

  async searchUsers(query: string): Promise<UserProfile[]> {
    // Mock search results
    const mockResults: UserProfile[] = [
      // Mock search results based on query
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockResults;
  }
}

export const userService = new UserService();