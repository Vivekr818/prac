import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Avatar,
  IconButton,
  Chip,
  Collapse,
  TextField,
  Button,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  FavoriteOutlined as LikeIcon,
  Favorite as LikedIcon,
  ChatBubbleOutline as CommentIcon,
  Share as ShareIcon,
  MoreVert as MoreIcon,
  Send as SendIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { Post, Comment } from '../../types/social';
import { useAppDispatch } from '../../store/hooks';
import { likePost, addComment, sharePost } from '../../store/socialSlice';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handleLike = () => {
    dispatch(likePost({
      postId: post.id,
      type: post.isLiked ? 'unlike' : 'like',
    }));
  };

  const handleComment = () => {
    if (commentText.trim()) {
      dispatch(addComment({
        postId: post.id,
        content: commentText.trim(),
      }));
      setCommentText('');
    }
  };

  const handleShare = () => {
    dispatch(sharePost(post.id));
    // In a real app, this might open a share dialog
    navigator.share?.({
      title: `${post.author.name}'s post`,
      text: post.content,
      url: window.location.href,
    }).catch(() => {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    });
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => (
    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
      <Avatar src={comment.author.avatar} sx={{ width: 32, height: 32 }}>
        {comment.author.name.charAt(0)}
      </Avatar>
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            backgroundColor: 'grey.100',
            borderRadius: 2,
            p: 1.5,
            mb: 0.5,
          }}
        >
          <Typography variant="subtitle2" fontWeight={600}>
            {comment.author.name}
          </Typography>
          <Typography variant="body2">{comment.content}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {formatTimeAgo(comment.createdAt)}
          </Typography>
          <Button size="small" sx={{ minWidth: 'auto', p: 0.5 }}>
            <Typography variant="caption">Like</Typography>
          </Button>
          <Button size="small" sx={{ minWidth: 'auto', p: 0.5 }}>
            <Typography variant="caption">Reply</Typography>
          </Button>
          {comment.likes > 0 && (
            <Typography variant="caption" color="text.secondary">
              {comment.likes} likes
            </Typography>
          )}
        </Box>
        
        {/* Replies */}
        {comment.replies.map((reply) => (
          <Box key={reply.id} sx={{ display: 'flex', gap: 1, mt: 1, ml: 2 }}>
            <Avatar src={reply.author.avatar} sx={{ width: 24, height: 24 }}>
              {reply.author.name.charAt(0)}
            </Avatar>
            <Box
              sx={{
                backgroundColor: 'grey.50',
                borderRadius: 2,
                p: 1,
                flexGrow: 1,
              }}
            >
              <Typography variant="caption" fontWeight={600}>
                {reply.author.name}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                {reply.content}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Card 
      sx={{ 
        mb: 3,
        overflow: 'visible',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #2E7D32, #4CAF50, #66BB6A)',
          borderRadius: '20px 20px 0 0',
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Post Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            src={post.author.avatar} 
            sx={{ 
              mr: 2, 
              width: 48, 
              height: 48,
              border: '3px solid',
              borderColor: 'primary.main',
              boxShadow: '0 4px 12px rgba(46, 125, 50, 0.2)',
            }}
          >
            {post.author.name.charAt(0)}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {post.author.name}
              </Typography>
              {post.author.isVerified && (
                <VerifiedIcon color="primary" sx={{ fontSize: 16 }} />
              )}
            </Box>
            <Typography variant="caption" color="text.secondary">
              {formatTimeAgo(post.createdAt)}
              {post.location && (
                <> • {post.location.address || 'Location shared'}</>
              )}
            </Typography>
          </Box>
          <IconButton onClick={handleMenuOpen}>
            <MoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Report Post</MenuItem>
            <MenuItem onClick={handleMenuClose}>Hide Post</MenuItem>
          </Menu>
        </Box>

        {/* Post Content */}
        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.content}
        </Typography>

        {/* Post Images */}
        {post.photos.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {post.photos.length === 1 ? (
              <Box
                component="img"
                src={post.photos[0]}
                alt="Post content"
                sx={{
                  width: '100%',
                  maxHeight: 400,
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />
            ) : (
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                {post.photos.slice(0, 4).map((photo, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={photo}
                    alt={`Post content ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: 150,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* Eco Tags */}
        {post.ecoTags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {post.ecoTags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                size="small"
                sx={{
                  backgroundColor: tag.color + '20',
                  color: tag.color,
                  border: `1px solid ${tag.color}40`,
                }}
              />
            ))}
          </Box>
        )}

        {/* Engagement Stats */}
        {(post.likes > 0 || post.comments.length > 0 || post.shares > 0) && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {post.likes > 0 && `${post.likes} likes`}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {post.comments.length > 0 && (
                <Typography variant="body2" color="text.secondary">
                  {post.comments.length} comments
                </Typography>
              )}
              {post.shares > 0 && (
                <Typography variant="body2" color="text.secondary">
                  {post.shares} shares
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </CardContent>

      <Divider />

      {/* Action Buttons */}
      <CardActions sx={{ justifyContent: 'space-around', py: 1 }}>
        <Button
          startIcon={post.isLiked ? <LikedIcon /> : <LikeIcon />}
          onClick={handleLike}
          color={post.isLiked ? 'primary' : 'inherit'}
          sx={{ flexGrow: 1 }}
        >
          Like
        </Button>
        <Button
          startIcon={<CommentIcon />}
          onClick={() => setShowComments(!showComments)}
          sx={{ flexGrow: 1 }}
        >
          Comment
        </Button>
        <Button
          startIcon={<ShareIcon />}
          onClick={handleShare}
          sx={{ flexGrow: 1 }}
        >
          Share
        </Button>
      </CardActions>

      {/* Comments Section */}
      <Collapse in={showComments}>
        <CardContent sx={{ pt: 0 }}>
          <Divider sx={{ mb: 2 }} />
          
          {/* Add Comment */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleComment();
                  }
                }}
              />
              <IconButton
                onClick={handleComment}
                disabled={!commentText.trim()}
                color="primary"
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Comments List */}
          {post.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};