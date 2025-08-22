import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingTopics = ({ topics, onTopicClick, onViewAll }) => {
  const getTrendIcon = (trend) => {
    if (trend > 0) return { icon: 'TrendingUp', color: 'text-green-500' };
    if (trend < 0) return { icon: 'TrendingDown', color: 'text-red-500' };
    return { icon: 'Minus', color: 'text-gray-500' };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-accent" />
          <h2 className="text-lg font-semibold text-foreground">
            Trending Topics
          </h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          iconName="ArrowRight"
          iconPosition="right"
          className="text-xs"
        >
          View All
        </Button>
      </div>
      {/* Topics List */}
      <div className="space-y-3">
        {topics?.map((topic, index) => {
          const trendInfo = getTrendIcon(topic?.trend);
          return (
            <div
              key={topic?.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onTopicClick(topic)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                  <span className="text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    {topic?.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {topic?.articles} articles • {topic?.discussions} discussions
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={trendInfo?.icon} 
                    size={14} 
                    className={trendInfo?.color} 
                  />
                  <span className={`text-xs font-medium ${trendInfo?.color}`}>
                    {Math.abs(topic?.trend)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Weekly Highlights */}
      <div className="mt-6 pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          This Week's Highlights
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Flame" size={14} className="text-orange-500" />
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">React 18</span> gained 
              <span className="font-medium text-green-500"> +45% </span> interest
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Zap" size={14} className="text-yellow-500" />
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">AI/ML</span> discussions 
              <span className="font-medium text-blue-500"> +32% </span> this week
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Star" size={14} className="text-purple-500" />
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">Web3</span> articles 
              <span className="font-medium text-accent"> +28% </span> engagement
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;