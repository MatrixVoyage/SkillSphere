import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ProjectHeader = ({ project, onSettingsClick, onInviteClick }) => {
  const [isStarred, setIsStarred] = useState(project?.isStarred);

  const handleStarToggle = () => {
    setIsStarred(!isStarred);
  };

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name={project?.icon} size={24} className="text-white" />
            </div>
            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
              project?.status === 'active' ? 'bg-accent' : 
              project?.status === 'completed' ? 'bg-success' : 'bg-warning'
            } animate-pulse`}></div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-foreground">{project?.name}</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleStarToggle}
                className="text-muted-foreground hover:text-warning"
              >
                <Icon name={isStarred ? "Star" : "Star"} size={20} className={isStarred ? "fill-current text-warning" : ""} />
              </Button>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                project?.status === 'active' ? 'bg-accent/10 text-accent' :
                project?.status === 'completed'? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
              }`}>
                {project?.status?.charAt(0)?.toUpperCase() + project?.status?.slice(1)}
              </div>
            </div>
            
            <p className="text-muted-foreground mt-1">{project?.description}</p>
            
            <div className="flex items-center space-x-6 mt-3">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Due: {new Date(project.dueDate)?.toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {project?.members?.length} members
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="GitBranch" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {project?.repository}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            {project?.members?.slice(0, 4)?.map((member, index) => (
              <div key={member?.id} className="relative">
                <Image
                  src={member?.avatar}
                  alt={member?.name}
                  className="w-8 h-8 rounded-full border-2 border-background object-cover"
                />
              </div>
            ))}
            {project?.members?.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">
                  +{project?.members?.length - 4}
                </span>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onInviteClick}
            iconName="UserPlus"
            iconPosition="left"
          >
            Invite
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="Settings" size={20} />
          </Button>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Project Progress</span>
          <span className="text-sm text-muted-foreground">{project?.progress}% Complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full transition-all duration-500"
            style={{ width: `${project?.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;