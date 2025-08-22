import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ profile, onEditProfile }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-subtle overflow-hidden">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-primary via-secondary to-accent relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
            iconName="Share"
          />
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
            iconName="MoreHorizontal"
          />
        </div>
      </div>
      {/* Profile Content */}
      <div className="px-6 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-16 relative z-10">
          {/* Profile Photo & Basic Info */}
          <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-xl border-4 border-card shadow-medium overflow-hidden">
                <Image
                  src={profile?.avatar}
                  alt={profile?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full border-4 border-card flex items-center justify-center">
                <Icon name="Zap" size={16} className="text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{profile?.name}</h1>
                <div className="flex items-center space-x-1">
                  <Icon name="BadgeCheck" size={20} className="text-primary" />
                  <span className="text-sm text-primary font-medium">Verified</span>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-2">{profile?.title}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={16} />
                  <span>{profile?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>Joined {profile?.joinedDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} />
                  <span>Last active {profile?.lastActive}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6 lg:mt-0">
            <Button
              variant="outline"
              iconName="MessageCircle"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Message
            </Button>
            <Button
              variant={isFollowing ? "outline" : "default"}
              iconName={isFollowing ? "UserCheck" : "UserPlus"}
              iconPosition="left"
              onClick={handleFollow}
              className="flex-1 sm:flex-none"
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Button
              variant="outline"
              iconName="Edit"
              iconPosition="left"
              onClick={onEditProfile}
              className="flex-1 sm:flex-none"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{profile?.stats?.projects}</div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{profile?.stats?.followers}</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{profile?.stats?.following}</div>
            <div className="text-sm text-muted-foreground">Following</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{profile?.stats?.contributions}</div>
            <div className="text-sm text-muted-foreground">Contributions</div>
          </div>
        </div>

        {/* Real-time Activity Indicator */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-foreground">Currently coding</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{profile?.currentActivity}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="GitBranch" size={16} />
              <span>3 commits today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;