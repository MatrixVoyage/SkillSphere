import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ExpertInsightCard = ({ insight, onRead, onFollow, onComment }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-medium transition-all duration-300">
      {/* Expert Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={insight?.expert?.avatar}
                alt={insight?.expert?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Star" size={12} className="text-white" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {insight?.expert?.name}
            </h4>
            <p className="text-xs text-muted-foreground">
              {insight?.expert?.title} at {insight?.expert?.company}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {insight?.expert?.followers} followers
                </span>
              </div>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {insight?.publishedAt}
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFollow(insight?.expert?.id)}
          iconName={insight?.expert?.isFollowing ? "UserCheck" : "UserPlus"}
          className="text-xs"
        >
          {insight?.expert?.isFollowing ? 'Following' : 'Follow'}
        </Button>
      </div>
      {/* Insight Content */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
            <Icon name="Lightbulb" size={14} className="text-primary" />
          </div>
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            Expert Insight
          </span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {insight?.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {insight?.excerpt}
        </p>
      </div>
      {/* Topics */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {insight?.topics?.map((topic, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
      {/* Engagement Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Eye" size={14} />
            <span className="text-xs">{insight?.views}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="MessageCircle" size={14} />
            <span className="text-xs">{insight?.comments}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Heart" size={14} />
            <span className="text-xs">{insight?.likes}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onComment(insight)}
            iconName="MessageCircle"
            className="text-xs"
          >
            Comment
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRead(insight)}
            iconName="ArrowRight"
            iconPosition="right"
            className="text-xs"
          >
            Read Full
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpertInsightCard;