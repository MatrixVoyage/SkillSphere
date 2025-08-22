import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LearningMoments = ({ moments, onAddMoment, onUpdateMoment }) => {
  const [isAddingMoment, setIsAddingMoment] = useState(false);
  const [newMoment, setNewMoment] = useState({
    title: '',
    description: '',
    category: 'technical',
    tags: []
  });
  const [expandedMoment, setExpandedMoment] = useState(null);

  const categories = [
    { id: 'technical', label: 'Technical', icon: 'Code', color: 'text-primary' },
    { id: 'collaboration', label: 'Collaboration', icon: 'Users', color: 'text-secondary' },
    { id: 'problem-solving', label: 'Problem Solving', icon: 'Lightbulb', color: 'text-accent' },
    { id: 'leadership', label: 'Leadership', icon: 'Crown', color: 'text-warning' },
    { id: 'communication', label: 'Communication', icon: 'MessageSquare', color: 'text-success' }
  ];

  const handleAddMoment = () => {
    if (newMoment?.title?.trim() && newMoment?.description?.trim()) {
      const moment = {
        id: Date.now(),
        ...newMoment,
        timestamp: new Date(),
        verified: false,
        endorsements: 0
      };
      onAddMoment(moment);
      setNewMoment({ title: '', description: '', category: 'technical', tags: [] });
      setIsAddingMoment(false);
    }
  };

  const handleEndorseMoment = (momentId) => {
    onUpdateMoment(momentId, { endorsements: moments?.find(m => m?.id === momentId)?.endorsements + 1 });
  };

  const getCategoryInfo = (categoryId) => {
    return categories?.find(cat => cat?.id === categoryId) || categories?.[0];
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-accent to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Learning Moments</h3>
            <p className="text-sm text-muted-foreground">Capture insights for skill verification</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingMoment(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Add Moment
        </Button>
      </div>
      {/* Add New Moment Form */}
      {isAddingMoment && (
        <div className="bg-muted/50 rounded-lg p-4 mb-6 border border-border">
          <h4 className="font-medium text-foreground mb-4">Capture a Learning Moment</h4>
          
          <div className="space-y-4">
            <Input
              label="What did you learn?"
              placeholder="e.g., Implemented efficient caching strategy"
              value={newMoment?.title}
              onChange={(e) => setNewMoment({ ...newMoment, title: e?.target?.value })}
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={3}
                placeholder="Describe the challenge, solution, and what you learned..."
                value={newMoment?.description}
                onChange={(e) => setNewMoment({ ...newMoment, description: e?.target?.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {categories?.map((category) => (
                  <Button
                    key={category?.id}
                    variant={newMoment?.category === category?.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNewMoment({ ...newMoment, category: category?.id })}
                    className="justify-start"
                    iconName={category?.icon}
                    iconPosition="left"
                  >
                    {category?.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddingMoment(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleAddMoment}
                disabled={!newMoment?.title?.trim() || !newMoment?.description?.trim()}
              >
                Save Moment
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Learning Moments List */}
      <div className="space-y-4">
        {moments?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Brain" size={24} className="text-muted-foreground" />
            </div>
            <h4 className="font-medium text-foreground mb-2">No learning moments yet</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Start capturing your insights and breakthroughs as you work on this project.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingMoment(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Add Your First Moment
            </Button>
          </div>
        ) : (
          moments?.map((moment) => {
            const categoryInfo = getCategoryInfo(moment?.category);
            const isExpanded = expandedMoment === moment?.id;
            
            return (
              <div key={moment?.id} className="bg-background/50 border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-6 h-6 bg-muted rounded flex items-center justify-center`}>
                        <Icon name={categoryInfo?.icon} size={12} className={categoryInfo?.color} />
                      </div>
                      <h4 className="font-medium text-foreground">{moment?.title}</h4>
                      {moment?.verified && (
                        <div className="flex items-center space-x-1">
                          <Icon name="CheckCircle" size={14} className="text-success" />
                          <span className="text-xs text-success">Verified</span>
                        </div>
                      )}
                    </div>
                    
                    <p className={`text-sm text-muted-foreground ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {moment?.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(moment?.timestamp)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Icon name="Tag" size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground capitalize">
                            {categoryInfo?.label}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEndorseMoment(moment?.id)}
                          className="text-muted-foreground hover:text-accent"
                        >
                          <Icon name="ThumbsUp" size={14} />
                          <span className="ml-1 text-xs">{moment?.endorsements}</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedMoment(isExpanded ? null : moment?.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={14} />
                        </Button>
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" iconName="Share" iconPosition="left">
                              Share
                            </Button>
                            <Button variant="outline" size="sm" iconName="Award" iconPosition="left">
                              Submit for Verification
                            </Button>
                          </div>
                          
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <Icon name="MoreHorizontal" size={16} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Quick Stats */}
      {moments?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{moments?.length}</div>
              <div className="text-xs text-muted-foreground">Total Moments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {moments?.filter(m => m?.verified)?.length}
              </div>
              <div className="text-xs text-muted-foreground">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {moments?.reduce((sum, m) => sum + m?.endorsements, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Endorsements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {new Set(moments.map(m => m.category))?.size}
              </div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningMoments;