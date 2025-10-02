import { Post, CreatePostData, PostInteraction, CommentData, Comment, EcoTag } from '../types/social';

class SocialService {
  private mockPosts: Post[] = [
    {
      id: '1',
      author: {
        id: 'user1',
        name: 'Sarah Johnson',
        avatar: 'https://via.placeholder.com/40',
        isVerified: true,
      },
      content: 'Just finished organizing a beach cleanup with 20 volunteers! We collected 15 bags of trash and found some interesting recyclables. The ocean is looking cleaner already! 🌊',
      photos: ['https://via.placeholder.com/400x300'],
      ecoTags: [
        { id: '1', name: 'Beach Cleanup', category: 'cleanup', color: '#2E7D32' },
        { id: '2', name: 'Ocean Conservation', category: 'conservation', color: '#1976D2' },
        { id: '3', name: 'Recycling', category: 'recycling', color: '#FF9800' },
      ],
      likes: 24,
      comments: [
        {
          id: 'c1',
          author: { id: 'user2', name: 'Mike Chen', avatar: 'https://via.placeholder.com/32' },
          content: 'Amazing work! Wish I could have joined you.',
          likes: 3,
          isLiked: false,
          replies: [],
          createdAt: new Date('2024-03-10T15:30:00'),
        },
      ],
      shares: 5,
      isLiked: false,
      createdAt: new Date('2024-03-10T14:00:00'),
      updatedAt: new Date('2024-03-10T14:00:00'),
    },
    {
      id: '2',
      author: {
        id: 'user2',
        name: 'Mike Chen',
        avatar: 'https://via.placeholder.com/40',
        isVerified: false,
      },
      content: 'Converted my old plastic bottles into planters for my herb garden! Zero waste and fresh herbs for cooking. Win-win! 🌱',
      photos: ['https://via.placeholder.com/400x300'],
      ecoTags: [
        { id: '4', name: 'Upcycling', category: 'upcycling', color: '#4CAF50' },
        { id: '5', name: 'Zero Waste', category: 'conservation', color: '#795548' },
        { id: '6', name: 'Urban Gardening', category: 'gardening', color: '#8BC34A' },
      ],
      likes: 18,
      comments: [],
      shares: 3,
      isLiked: true,
      createdAt: new Date('2024-03-10T10:00:00'),
      updatedAt: new Date('2024-03-10T10:00:00'),
    },
    {
      id: '3',
      author: {
        id: 'user3',
        name: 'Emma Rodriguez',
        avatar: 'https://via.placeholder.com/40',
        isVerified: true,
      },
      content: 'Switched to solar panels this month and my energy bill is already 80% lower! The environment and my wallet are both happy 😊',
      photos: [],
      ecoTags: [
        { id: '7', name: 'Solar Energy', category: 'energy', color: '#FFC107' },
        { id: '8', name: 'Renewable Energy', category: 'energy', color: '#FF9800' },
        { id: '9', name: 'Sustainability', category: 'conservation', color: '#2E7D32' },
      ],
      likes: 32,
      comments: [
        {
          id: 'c2',
          author: { id: 'user1', name: 'Sarah Johnson', avatar: 'https://via.placeholder.com/32' },
          content: 'That\'s fantastic! How long was the installation process?',
          likes: 1,
          isLiked: false,
          replies: [
            {
              id: 'r1',
              author: { id: 'user3', name: 'Emma Rodriguez', avatar: 'https://via.placeholder.com/32' },
              content: 'Just 2 days! The team was very professional.',
              likes: 2,
              isLiked: false,
              createdAt: new Date('2024-03-10T09:15:00'),
            },
          ],
          createdAt: new Date('2024-03-10T09:00:00'),
        },
      ],
      shares: 8,
      isLiked: false,
      createdAt: new Date('2024-03-10T08:00:00'),
      updatedAt: new Date('2024-03-10T08:00:00'),
    },
  ];

  async getPosts(params: {
    page: number;
    filters?: {
      ecoTags?: string[];
      dateRange?: { start: Date; end: Date };
      location?: { latitude: number; longitude: number; radius: number };
    };
  }): Promise<Post[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Apply filters (mock implementation)
    let filteredPosts = [...this.mockPosts];

    if (params.filters?.ecoTags && params.filters.ecoTags.length > 0) {
      filteredPosts = filteredPosts.filter(post =>
        post.ecoTags.some(tag => params.filters!.ecoTags!.includes(tag.name))
      );
    }

    // Pagination (mock)
    const startIndex = (params.page - 1) * 10;
    const endIndex = startIndex + 10;
    
    return filteredPosts.slice(startIndex, endIndex);
  }

  async createPost(postData: CreatePostData): Promise<Post> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newPost: Post = {
      id: `post_${Date.now()}`,
      author: {
        id: 'current-user',
        name: 'Demo User',
        avatar: 'https://via.placeholder.com/40',
        isVerified: true,
      },
      content: postData.content,
      photos: postData.photos ? postData.photos.map((_, index) => 
        `https://via.placeholder.com/400x300?text=Photo${index + 1}`
      ) : [],
      ecoTags: postData.ecoTags.map((tagName, index) => ({
        id: `tag_${Date.now()}_${index}`,
        name: tagName,
        category: 'other' as const,
        color: '#2E7D32',
      })),
      location: postData.location,
      likes: 0,
      comments: [],
      shares: 0,
      isLiked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add to mock data
    this.mockPosts.unshift(newPost);
    
    return newPost;
  }

  async interactWithPost(interaction: PostInteraction): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const post = this.mockPosts.find(p => p.id === interaction.postId);
    if (post) {
      switch (interaction.type) {
        case 'like':
          post.likes += 1;
          post.isLiked = true;
          break;
        case 'unlike':
          post.likes -= 1;
          post.isLiked = false;
          break;
        case 'share':
          post.shares += 1;
          break;
      }
    }
  }

  async addComment(commentData: CommentData): Promise<Comment> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      author: {
        id: 'current-user',
        name: 'Demo User',
        avatar: 'https://via.placeholder.com/32',
      },
      content: commentData.content,
      likes: 0,
      isLiked: false,
      replies: [],
      createdAt: new Date(),
    };

    // Add to mock data
    const post = this.mockPosts.find(p => p.id === commentData.postId);
    if (post) {
      if (commentData.parentCommentId) {
        // Add as reply
        const parentComment = post.comments.find(c => c.id === commentData.parentCommentId);
        if (parentComment) {
          parentComment.replies.push({
            id: newComment.id,
            author: newComment.author,
            content: newComment.content,
            likes: newComment.likes,
            isLiked: newComment.isLiked,
            createdAt: newComment.createdAt,
          });
        }
      } else {
        // Add as top-level comment
        post.comments.push(newComment);
      }
    }

    return newComment;
  }

  async getEcoTags(): Promise<EcoTag[]> {
    // Mock eco tags
    const mockTags: EcoTag[] = [
      { id: '1', name: 'Beach Cleanup', category: 'cleanup', color: '#2E7D32', icon: '🏖️' },
      { id: '2', name: 'Recycling', category: 'recycling', color: '#4CAF50', icon: '♻️' },
      { id: '3', name: 'Upcycling', category: 'upcycling', color: '#8BC34A', icon: '🔄' },
      { id: '4', name: 'Solar Energy', category: 'energy', color: '#FFC107', icon: '☀️' },
      { id: '5', name: 'Urban Gardening', category: 'gardening', color: '#8BC34A', icon: '🌱' },
      { id: '6', name: 'Zero Waste', category: 'conservation', color: '#795548', icon: '🗑️' },
      { id: '7', name: 'Composting', category: 'recycling', color: '#6D4C41', icon: '🍂' },
      { id: '8', name: 'Water Conservation', category: 'conservation', color: '#03A9F4', icon: '💧' },
      { id: '9', name: 'Bike Commuting', category: 'transportation', color: '#FF5722', icon: '🚲' },
      { id: '10', name: 'Tree Planting', category: 'conservation', color: '#4CAF50', icon: '🌳' },
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTags;
  }

  async searchPosts(query: string): Promise<Post[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Mock search implementation
    const filteredPosts = this.mockPosts.filter(post =>
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.ecoTags.some(tag => tag.name.toLowerCase().includes(query.toLowerCase())) ||
      post.author.name.toLowerCase().includes(query.toLowerCase())
    );

    return filteredPosts;
  }
}

export const socialService = new SocialService();