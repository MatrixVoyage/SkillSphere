import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityCard = ({ community, onJoin, onViewDetails }) => {
  const {
    id,
    name,
    description,
    category,
    difficulty,
    techStack,
    memberCount,
    maxMembers,
    progress,
    timeCommitment,
    mentorshipAvailable,
    isOpenSource,
    isCareerFocused,
    compatibilityScore,
    members,
    objectives,
    skillOutcomes,
    testimonial,
    isNew,
    isTrending,
    joinedMembers
  } = community;

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-green-600 bg-green-50 border-green-200';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Advanced': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (cat) => {
    const icons = {
      'Frontend': 'Monitor',
      'Backend': 'Server',
      'Mobile': 'Smartphone',
      'AI/ML': 'Brain',
      'DevOps': 'Settings',
      'Data Science': 'BarChart3',
      'Blockchain': 'Link',
      'Game Dev': 'Gamepad2'
    };
    return icons?.[cat] || 'Code';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {/* Status Badges */}
      <div className="flex items-center gap-2 mb-4">
        {isNew && (
          <span className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent border border-accent/20 rounded-full">
            New
          </span>
        )}
        {isTrending && (
          <span className="px-2 py-1 text-xs font-medium bg-orange-50 text-orange-600 border border-orange-200 rounded-full flex items-center gap-1">
            <Icon name="TrendingUp" size={12} />
            Trending
          </span>
        )}
        {mentorshipAvailable && (
          <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200 rounded-full">
            Mentorship
          </span>
        )}
      </div>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name={getCategoryIcon(category)} size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">{name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{category}</span>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(difficulty)}`}>
                {difficulty}
              </span>
            </div>
          </div>
        </div>
        
        {/* Compatibility Score */}
        <div className="text-right">
          <div className="text-2xl font-bold text-accent">{compatibilityScore}%</div>
          <div className="text-xs text-muted-foreground">Match</div>
        </div>
      </div>
      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
      {/* Objectives */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Key Objectives</h4>
        <div className="space-y-1">
          {objectives?.slice(0, 2)?.map((objective, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Target" size={12} className="text-accent" />
              <span>{objective}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Tech Stack */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {techStack?.slice(0, 4)?.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md border"
            >
              {tech}
            </span>
          ))}
          {techStack?.length > 4 && (
            <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md border">
              +{techStack?.length - 4} more
            </span>
          )}
        </div>
      </div>
      {/* Progress & Members */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-sm text-muted-foreground">{progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {members?.slice(0, 4)?.map((member, index) => (
                <Image
                  key={index}
                  src={member?.avatar}
                  alt={member?.name}
                  className="w-6 h-6 rounded-full border-2 border-card"
                />
              ))}
              {memberCount > 4 && (
                <div className="w-6 h-6 bg-muted border-2 border-card rounded-full flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">+{memberCount - 4}</span>
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              {memberCount}/{maxMembers} members
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>{timeCommitment}</span>
          </div>
        </div>
      </div>
      {/* Features */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        {isOpenSource && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <Icon name="GitBranch" size={14} />
            <span>Open Source</span>
          </div>
        )}
        {isCareerFocused && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <Icon name="Briefcase" size={14} />
            <span>Career-Focused</span>
          </div>
        )}
      </div>
      {/* Testimonial */}
      {testimonial && (
        <div className="bg-muted/50 rounded-lg p-3 mb-4">
          <p className="text-sm text-muted-foreground italic mb-2">"{testimonial?.content}"</p>
          <div className="flex items-center gap-2">
            <Image
              src={testimonial?.author?.avatar}
              alt={testimonial?.author?.name}
              className="w-5 h-5 rounded-full"
            />
            <span className="text-xs text-muted-foreground">{testimonial?.author?.name}</span>
          </div>
        </div>
      )}
      {/* Skill Outcomes */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-2">You'll Learn</h4>
        <div className="flex flex-wrap gap-1">
          {skillOutcomes?.slice(0, 3)?.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-accent/10 text-accent border border-accent/20 rounded-full flex items-center gap-1"
            >
              <Icon name="Award" size={10} />
              {skill}
            </span>
          ))}
        </div>
      </div>
      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onJoin(id)}
          className="flex-1"
          iconName="Plus"
          iconPosition="left"
        >
          Join Community
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(id)}
          iconName="Eye"
        />
      </div>
    </div>
  );
};

export default CommunityCard;