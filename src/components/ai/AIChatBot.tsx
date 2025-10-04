import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Avatar,
  Chip,
  Divider,
  Button,
} from '@mui/material';
import {
  SmartToy as AIIcon,
  Send as SendIcon,
  Close as CloseIcon,
  Category as CategoryIcon,
  Lightbulb as SuggestionIcon,
  Help as HelpIcon,
} from '@mui/icons-material';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'categorization' | 'suggestion' | 'help';
}

interface AIChatBotProps {
  onClose?: () => void;
  showHeader?: boolean;
  context?: 'map' | 'report' | 'general';
}

export const AIChatBot: React.FC<AIChatBotProps> = ({ 
  onClose, 
  showHeader = true, 
  context = 'general' 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm your AI environmental assistant. I can help you categorize reports, suggest solutions, and answer questions about environmental issues.`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'help',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const quickActions = [
    { label: 'Categorize Photo', icon: <CategoryIcon />, action: 'categorize' },
    { label: 'Get Suggestions', icon: <SuggestionIcon />, action: 'suggest' },
    { label: 'Environmental Help', icon: <HelpIcon />, action: 'help' },
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText, context),
        sender: 'ai',
        timestamp: new Date(),
        type: getResponseType(inputText),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputText('');
  };

  const getAIResponse = (input: string, context: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('categorize') || lowerInput.includes('category')) {
      return 'I can help categorize environmental issues! Upload a photo and I\'ll analyze it to determine if it\'s waste management, water pollution, air quality, or infrastructure related. My AI vision can identify the type and severity of environmental problems.';
    }
    
    if (lowerInput.includes('solution') || lowerInput.includes('fix') || lowerInput.includes('help')) {
      return 'Based on the environmental issue, here are some solutions: 1) For waste - organize community cleanup drives, 2) For pollution - report to local authorities and document evidence, 3) For infrastructure - contact municipal services. Would you like specific guidance for your situation?';
    }
    
    if (context === 'map') {
      return 'I can help you navigate the map! You can filter reports by category, view AI-categorized issues, and find environmental problems near your location. Click on markers to see detailed AI analysis of each report.';
    }
    
    if (context === 'report') {
      return 'When reporting an issue, I\'ll automatically analyze your photos to categorize the environmental problem. This helps authorities respond more quickly and accurately. Make sure to include clear photos and location details!';
    }
    
    return 'I\'m here to help with environmental questions! I can categorize issues from photos, suggest solutions, help you understand environmental problems, and guide you through using the platform effectively.';
  };

  const getResponseType = (input: string): 'categorization' | 'suggestion' | 'help' => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('categorize') || lowerInput.includes('category')) return 'categorization';
    if (lowerInput.includes('solution') || lowerInput.includes('suggest')) return 'suggestion';
    return 'help';
  };

  const handleQuickAction = (action: string) => {
    let message = '';
    switch (action) {
      case 'categorize':
        message = 'How do you categorize environmental issues from photos?';
        break;
      case 'suggest':
        message = 'Can you suggest solutions for environmental problems?';
        break;
      case 'help':
        message = 'What environmental topics can you help me with?';
        break;
    }
    setInputText(message);
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'categorization': return <CategoryIcon sx={{ fontSize: 16 }} />;
      case 'suggestion': return <SuggestionIcon sx={{ fontSize: 16 }} />;
      case 'help': return <HelpIcon sx={{ fontSize: 16 }} />;
      default: return <AIIcon sx={{ fontSize: 16 }} />;
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      {showHeader && (
        <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ backgroundColor: '#2196f3', width: 32, height: 32 }}>
                <AIIcon sx={{ fontSize: 18 }} />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                  AI Environmental Assistant
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Powered by advanced AI • Online
                </Typography>
              </Box>
            </Box>
            {onClose && (
              <IconButton onClick={onClose} size="small">
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      )}

      {/* Quick Actions */}
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {quickActions.map((action) => (
            <Chip
              key={action.action}
              icon={action.icon}
              label={action.label}
              onClick={() => handleQuickAction(action.action)}
              size="small"
              sx={{
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                '&:hover': { backgroundColor: '#bbdefb' },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Messages */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <Box key={message.id} sx={{ mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  maxWidth: '80%',
                  backgroundColor: message.sender === 'user' ? '#4CAF50' : '#f5f5f5',
                  color: message.sender === 'user' ? 'white' : 'text.primary',
                  borderRadius: message.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                }}
              >
                {message.sender === 'ai' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    {getMessageIcon(message.type)}
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      AI Assistant
                    </Typography>
                  </Box>
                )}
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  {message.text}
                </Typography>
              </Paper>
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: 'block',
                textAlign: message.sender === 'user' ? 'right' : 'left',
                px: 1,
              }}
            >
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Input */}
      <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Ask about environmental issues, categorization, or solutions..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
          <IconButton
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            sx={{
              backgroundColor: '#4CAF50',
              color: 'white',
              '&:hover': { backgroundColor: '#45a049' },
              '&:disabled': { backgroundColor: '#e0e0e0' },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
        
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          AI responses are simulated. Real AI integration coming soon!
        </Typography>
      </Box>
    </Box>
  );
};