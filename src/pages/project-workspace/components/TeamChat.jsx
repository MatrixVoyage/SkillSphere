import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const TeamChat = ({ messages, onSendMessage, members, isCollapsed, onToggleCollapse }) => {
  const [newMessage, setNewMessage] = useState('');
  const [activeThread, setActiveThread] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (newMessage?.trim()) {
      onSendMessage({
        id: Date.now(),
        content: newMessage,
        sender: 'You',
        timestamp: new Date(),
        type: 'text'
      });
      setNewMessage('');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const MessageItem = ({ message }) => {
    const isOwnMessage = message?.sender === 'You';
    
    return (
      <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2 max-w-xs lg:max-w-md`}>
          {!isOwnMessage && (
            <Image
              src={message?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${message?.sender}`}
              alt={message?.sender}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
          )}
          
          <div className={`${isOwnMessage ? 'mr-2' : 'ml-2'}`}>
            <div className={`rounded-lg px-3 py-2 ${
              isOwnMessage 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-foreground'
            }`}>
              {message?.type === 'code' ? (
                <div className="bg-background/10 rounded p-2 font-mono text-xs overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{message?.content}</pre>
                </div>
              ) : message?.type === 'file' ? (
                <div className="flex items-center space-x-2">
                  <Icon name="Paperclip" size={16} />
                  <span className="text-sm">{message?.fileName}</span>
                  <Button variant="ghost" size="sm">
                    <Icon name="Download" size={14} />
                  </Button>
                </div>
              ) : (
                <p className="text-sm">{message?.content}</p>
              )}
            </div>
            
            <div className={`flex items-center space-x-2 mt-1 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
              <span className="text-xs text-muted-foreground">{formatTime(message?.timestamp)}</span>
              {message?.reactions && message?.reactions?.length > 0 && (
                <div className="flex space-x-1">
                  {message?.reactions?.map((reaction, index) => (
                    <span key={index} className="text-xs bg-muted rounded px-1">
                      {reaction?.emoji} {reaction?.count}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isCollapsed) {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="MessageSquare" size={20} className="text-muted-foreground" />
            <span className="font-medium text-foreground">Team Chat</span>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="Maximize2" size={16} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg flex flex-col h-96">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="MessageSquare" size={20} className="text-muted-foreground" />
          <div>
            <h3 className="font-medium text-foreground">Team Chat</h3>
            <p className="text-xs text-muted-foreground">
              {members?.filter(m => m?.isOnline)?.length} online
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Icon name="Phone" size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Icon name="Video" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="Minimize2" size={16} />
          </Button>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages?.map((message) => (
          <MessageItem key={message?.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Message Input */}
      <div className="border-t border-border p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Paperclip" size={16} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Code" size={16} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Smile" size={16} />
            </Button>
          </div>
          
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e?.target?.value)}
              className="border-0 bg-muted focus:bg-background"
            />
          </div>
          
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            disabled={!newMessage?.trim()}
            className="text-primary hover:text-primary/80"
          >
            <Icon name="Send" size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TeamChat;