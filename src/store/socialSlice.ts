import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post, CreatePostData, SocialFeedState, PostInteraction, CommentData } from '../types/social';
import { socialService } from '../services/socialService';

const initialState: SocialFeedState = {
  posts: [],
  isLoading: false,
  isLoadingMore: false,
  hasMore: true,
  error: null,
  currentPage: 1,
  filters: {
    ecoTags: [],
  },
};

// Async thunks
export const fetchPosts = createAsyncThunk(
  'social/fetchPosts',
  async (params: { page?: number; reset?: boolean } = {}, { getState, rejectWithValue }) => {
    try {
      const { social } = getState() as { social: SocialFeedState };
      const page = params.page || 1;
      const posts = await socialService.getPosts({
        page,
        filters: social.filters,
      });
      return { posts, page, reset: params.reset };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
    }
  }
);

export const createPost = createAsyncThunk(
  'social/createPost',
  async (postData: CreatePostData, { rejectWithValue }) => {
    try {
      const post = await socialService.createPost(postData);
      return post;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create post');
    }
  }
);

export const likePost = createAsyncThunk(
  'social/likePost',
  async (interaction: PostInteraction, { rejectWithValue }) => {
    try {
      await socialService.interactWithPost(interaction);
      return interaction;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to like post');
    }
  }
);

export const addComment = createAsyncThunk(
  'social/addComment',
  async (commentData: CommentData, { rejectWithValue }) => {
    try {
      const comment = await socialService.addComment(commentData);
      return { comment, postId: commentData.postId };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
    }
  }
);

export const sharePost = createAsyncThunk(
  'social/sharePost',
  async (postId: string, { rejectWithValue }) => {
    try {
      await socialService.interactWithPost({ postId, type: 'share' });
      return postId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to share post');
    }
  }
);

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<SocialFeedState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFeed: (state) => {
      state.posts = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
    updatePostLocally: (state, action: PayloadAction<{ postId: string; updates: Partial<Post> }>) => {
      const { postId, updates } = action.payload;
      const postIndex = state.posts.findIndex(post => post.id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex] = { ...state.posts[postIndex], ...updates };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state, action) => {
        if (action.meta.arg.page === 1 || action.meta.arg.reset) {
          state.isLoading = true;
        } else {
          state.isLoadingMore = true;
        }
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        
        if (action.payload.reset || action.payload.page === 1) {
          state.posts = action.payload.posts;
        } else {
          state.posts.push(...action.payload.posts);
        }
        
        state.currentPage = action.payload.page;
        state.hasMore = action.payload.posts.length === 10; // Assuming 10 posts per page
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        state.error = action.payload as string;
      })
      
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      
      // Like Post
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, type } = action.payload;
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          if (type === 'like') {
            post.likes += 1;
            post.isLiked = true;
          } else if (type === 'unlike') {
            post.likes -= 1;
            post.isLiked = false;
          }
        }
      })
      
      // Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        const { comment, postId } = action.payload;
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          post.comments.push(comment);
        }
      })
      
      // Share Post
      .addCase(sharePost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p.id === action.payload);
        if (post) {
          post.shares += 1;
        }
      });
  },
});

export const { clearError, setFilters, resetFeed, updatePostLocally } = socialSlice.actions;
export default socialSlice.reducer;