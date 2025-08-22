import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedCommunities = ({ communities, onJoin, onViewDetails }) => {
  if (!communities || communities?.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Featured Communities</h2>
          <p className="text-muted-foreground">
            Trending projects and seasonal opportunities curated for you
          </p>
        </div>
        <Button variant="outline" size="sm" iconName="Sparkles">
          View All Featured
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities?.map((community) => (
          <div
            key={community?.id}
            className="relative bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 rounded-xl p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {/* Featured Badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-gradient-to-r from-accent to-secondary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Icon name="Star" size={12} />
                Featured
              </div>
            </div>

            {/* Category Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
              <Icon name="Code" size={24} className="text-white" />
            </div>

            {/* Content */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground mb-2">{community?.name}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {community?.description}
              </p>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20">
                  {community?.category}
                </span>
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  {community?.difficulty}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Users" size={14} />
                  <span>{community?.memberCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={14} />
                  <span>{community?.timeCommitment}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-accent">{community?.compatibilityScore}%</div>
                <div className="text-xs text-muted-foreground">Match</div>
              </div>
            </div>

            {/* Members Preview */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                {community?.members?.slice(0, 4)?.map((member, index) => (
                  <Image
                    key={index}
                    src={member?.avatar}
                    alt={member?.name}
                    className="w-6 h-6 rounded-full border-2 border-card"
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                +{community?.memberCount - 4} others joined
              </span>
            </div>

            {/* Special Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {community?.mentorshipAvailable && (
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-200">
                  Mentorship
                </span>
              )}
              {community?.isOpenSource && (
                <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-full border border-green-200">
                  Open Source
                </span>
              )}
              {community?.isCareerFocused && (
                <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full border border-purple-200">
                  Career-Focused
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => onJoin(community?.id)}
                className="flex-1"
                iconName="Plus"
                iconPosition="left"
              >
                Join Now
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(community?.id)}
                iconName="ArrowRight"
              />
            </div>

            {/* Background Pattern */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCommunities;