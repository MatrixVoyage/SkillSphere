import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AIAssistant = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Hello! I'm your AI coding assistant. I can help you with:\n\n• Code reviews and debugging\n• Architecture suggestions\n• Best practices recommendations\n• Resource finding\n• Documentation generation\n\nWhat would you like to work on today?`,
      timestamp: new Date(Date.now() - 300000)
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { id: 'review', label: 'Code Review', icon: 'Search', description: 'Review my latest code' },
    { id: 'debug', label: 'Debug Help', icon: 'Bug', description: 'Help me debug an issue' },
    { id: 'optimize', label: 'Optimize', icon: 'Zap', description: 'Suggest optimizations' },
    { id: 'docs', label: 'Generate Docs', icon: 'FileText', description: 'Create documentation' }
  ];

  const handleSendMessage = async (message) => {
    if (!message?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      'code review': `I'd be happy to help with code review! Please share your code and I'll analyze it for:\n\n• Code quality and best practices\n• Performance optimizations\n• Security considerations\n• Maintainability improvements\n\nYou can paste code directly or share a GitHub link.`,
      'debug': `Let's debug this together! To help you effectively, please provide:\n\n• The error message or unexpected behavior\n• Relevant code snippets\n• Steps to reproduce the issue\n• Your expected vs actual results\n\nI'll analyze the problem and suggest solutions.`,
      'optimize': `Great! I can help optimize your code for:\n\n• Performance improvements\n• Memory usage reduction\n• Algorithm efficiency\n• Bundle size optimization\n\nShare the code you'd like me to analyze and I'll provide specific recommendations.`,
      'documentation': `I'll help you create comprehensive documentation! I can generate:\n\n• API documentation\n• README files\n• Code comments\n• Architecture diagrams\n• User guides\n\nWhat type of documentation do you need?`
    };

    const lowerMessage = userMessage?.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage?.includes(key)) {
        return response;
      }
    }

    return `I understand you're asking about: "${userMessage}"\n\nI can help you with various development tasks. Could you provide more specific details about what you're working on? For example:\n\n• Share code snippets for review\n• Describe the problem you're facing\n• Specify what you'd like to optimize\n• Tell me what documentation you need\n\nThe more context you provide, the better I can assist you!`;
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      review: 'Can you help me review my code for best practices and potential improvements?',
      debug: 'I\'m having an issue with my code and need help debugging it.',
      optimize: 'Can you suggest ways to optimize my code for better performance?',
      docs: 'I need help generating documentation for my project.'
    };
    
    handleSendMessage(actionMessages?.[action?.id]);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onToggle}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
        >
          <Icon name="Bot" size={24} />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[32rem] bg-card border border-border rounded-lg shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">AI Assistant</h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Icon name="Settings" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => (
          <div key={message?.id} className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-sm ${message?.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`rounded-lg px-3 py-2 ${
                message?.type === 'user' ?'bg-primary text-primary-foreground ml-4' :'bg-muted text-foreground mr-4'
              }`}>
                <pre className="text-sm whitespace-pre-wrap font-sans">{message?.content}</pre>
              </div>
              <div className={`text-xs text-muted-foreground mt-1 ${
                message?.type === 'user' ? 'text-right mr-4' : 'text-left ml-4'
              }`}>
                {formatTime(message?.timestamp)}
              </div>
            </div>
            
            {message?.type === 'ai' && (
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0 order-0 mt-1">
                <Icon name="Bot" size={12} className="text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Icon name="Bot" size={12} className="text-white" />
            </div>
            <div className="bg-muted text-foreground rounded-lg px-3 py-2 mr-4 ml-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      {/* Quick Actions */}
      {messages?.length === 1 && (
        <div className="px-4 pb-2">
          <div className="grid grid-cols-2 gap-2">
            {quickActions?.map((action) => (
              <Button
                key={action?.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action)}
                className="flex flex-col items-center p-3 h-auto text-xs"
              >
                <Icon name={action?.icon} size={16} className="mb-1" />
                <span>{action?.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
      {/* Input */}
      <div className="border-t border-border p-4">
        <form onSubmit={(e) => { e?.preventDefault(); handleSendMessage(inputValue); }} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Ask me anything about your code..."
            value={inputValue}
            onChange={(e) => setInputValue(e?.target?.value)}
            className="flex-1 text-sm"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue?.trim() || isTyping}
            className="bg-gradient-to-r from-primary to-secondary text-white"
          >
            <Icon name="Send" size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;