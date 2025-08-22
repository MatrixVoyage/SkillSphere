import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LearningPathCard = ({ path, onStart, onContinue }) => {
  const getProgressColor = (progress) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-medium transition-all duration-300">
      {/* Path Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Map" size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {path?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {path?.duration} • {path?.difficulty}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${
            path?.isNew ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-muted text-muted-foreground'
          }`}>
            {path?.isNew ? 'New' : 'Popular'}
          </span>
        </div>
      </div>
      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {path?.description}
      </p>
      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Progress
          </span>
          <span className="text-sm text-muted-foreground">
            {path?.completedSteps}/{path?.totalSteps} steps
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(path?.progress)}`}
            style={{ width: `${path?.progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{path?.progress}% complete</span>
          <span>Est. {path?.remainingTime} left</span>
        </div>
      </div>
      {/* Skills */}
      <div className="mb-4">
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
          Skills You'll Learn
        </p>
        <div className="flex flex-wrap gap-2">
          {path?.skills?.slice(0, 4)?.map((skill, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
            >
              {skill}
            </span>
          ))}
          {path?.skills?.length > 4 && (
            <span className="text-xs text-muted-foreground">
              +{path?.skills?.length - 4} more
            </span>
          )}
        </div>
      </div>
      {/* Steps Preview */}
      <div className="mb-4">
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
          Learning Steps
        </p>
        <div className="space-y-2">
          {path?.steps?.slice(0, 3)?.map((step, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                index < path?.completedSteps
                  ? 'bg-green-500 text-white'
                  : index === path?.completedSteps
                  ? 'bg-primary text-white' :'bg-muted text-muted-foreground'
              }`}>
                {index < path?.completedSteps ? (
                  <Icon name="Check" size={12} />
                ) : (
                  index + 1
                )}
              </div>
              <span className={`text-sm ${
                index < path?.completedSteps
                  ? 'text-muted-foreground line-through'
                  : index === path?.completedSteps
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground'
              }`}>
                {step?.title}
              </span>
            </div>
          ))}
          {path?.steps?.length > 3 && (
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                <Icon name="MoreHorizontal" size={12} className="text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">
                +{path?.steps?.length - 3} more steps
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Action Button */}
      <div className="pt-4 border-t border-border">
        {path?.progress > 0 ? (
          <Button
            variant="default"
            fullWidth
            onClick={() => onContinue(path)}
            iconName="Play"
            iconPosition="left"
          >
            Continue Learning
          </Button>
        ) : (
          <Button
            variant="outline"
            fullWidth
            onClick={() => onStart(path)}
            iconName="BookOpen"
            iconPosition="left"
          >
            Start Learning Path
          </Button>
        )}
      </div>
    </div>
  );
};

export default LearningPathCard;