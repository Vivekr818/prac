export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    isVerified: boolean;
  };
  content: string;
  photos: string[];
  ecoTags: EcoTag[];
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  likes: number;
  comments: Comment[];
  shares: number;
  isLiked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostData {
  content: string;
  photos?: File[];
  ecoTags: string[];
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}

export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  likes: number;
  isLiked: boolean;
  replies: Reply[];
  createdAt: Date;
}

export interface Reply {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: Date;
}

export interface EcoTag {
  id: string;
  name: string;
  category: EcoTagCategory;
  color: string;
  icon?: string;
}

export type EcoTagCategory = 
  | 'cleanup'
  | 'recycling'
  | 'upcycling'
  | 'energy'
  | 'transportation'
  | 'gardening'
  | 'conservation'
  | 'education'
  | 'policy'
  | 'other';

export interface SocialFeedState {
  posts: Post[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  currentPage: number;
  filters: {
    ecoTags: string[];
    dateRange?: {
      start: Date;
      end: Date;
    };
    location?: {
      latitude: number;
      longitude: number;
      radius: number; // in kilometers
    };
  };
}

export interface PostInteraction {
  postId: string;
  type: 'like' | 'unlike' | 'share';
}

export interface CommentData {
  postId: string;
  content: string;
  parentCommentId?: string; // For replies
}