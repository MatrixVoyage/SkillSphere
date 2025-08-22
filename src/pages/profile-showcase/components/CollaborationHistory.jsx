import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CollaborationHistory = ({ collaborationData }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const timeframes = [
    { key: 'all', label: 'All Time' },
    { key: 'recent', label: 'Last 6 Months' },
    { key: 'year', label: 'This Year' },
    { key: 'previous', label: 'Previous Years' },
  ];

  const types = [
    { key: 'all', label: 'All Types', icon: 'Users' },
    { key: 'projects', label: 'Projects', icon: 'FolderOpen' },
    { key: 'mentorship', label: 'Mentorship', icon: 'GraduationCap' },
    { key: 'community', label: 'Community', icon: 'Globe' },
    { key: 'opensource', label: 'Open Source', icon: 'GitBranch' },
  ];

  const filteredHistory = collaborationData?.history?.filter(item => {
    const timeMatch = selectedTimeframe === 'all' || item?.timeframe === selectedTimeframe;
    const typeMatch = selectedType === 'all' || item?.type === selectedType;
    return timeMatch && typeMatch;
  });

  const CollaborationItem = ({ item }) => {
    const getTypeIcon = (type) => {
      switch(type) {
        case 'projects': return 'FolderOpen';
        case 'mentorship': return 'GraduationCap';
        case 'community': return 'Globe';
        case 'opensource': return 'GitBranch';
        default: return 'Users';
      }
    };

    const getTypeColor = (type) => {
      switch(type) {
        case 'projects': return 'text-primary bg-primary/10 border-primary/20';
        case 'mentorship': return 'text-accent bg-accent/10 border-accent/20';
        case 'community': return 'text-secondary bg-secondary/10 border-secondary/20';
        case 'opensource': return 'text-warning bg-warning/10 border-warning/20';
        default: return 'text-muted-foreground bg-muted border-border';
      }
    };

    return (
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border"></div>
        <div className="flex items-start space-x-4 pb-8">
          {/* Timeline Dot */}
          <div className={`w-12 h-12 rounded-full border-2 border-card shadow-subtle flex items-center justify-center ${getTypeColor(item?.type)} relative z-10`}>
            <Icon name={getTypeIcon(item?.type)} size={20} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-subtle transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-foreground mb-1">{item?.title}</h4>
                  <p className="text-muted-foreground mb-2">{item?.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>{item?.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>{item?.collaborators?.length} collaborators</span>
                    </div>
                    {item?.outcome && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Target" size={14} />
                        <span>{item?.outcome}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2 ml-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(item?.type)}`}>
                    {item?.type?.charAt(0)?.toUpperCase() + item?.type?.slice(1)}
                  </span>
                  {item?.featured && (
                    <div className="flex items-center space-x-1 text-warning">
                      <Icon name="Star" size={14} />
                      <span className="text-xs font-medium">Featured</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Collaborators */}
              <div className="mb-4">
                <h5 className="text-sm font-medium text-foreground mb-3">Collaborators:</h5>
                <div className="flex flex-wrap gap-3">
                  {item?.collaborators?.map((collaborator, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-muted/50 rounded-lg p-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={collaborator?.avatar}
                          alt={collaborator?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{collaborator?.name}</p>
                        <p className="text-xs text-muted-foreground">{collaborator?.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies/Skills */}
              {item?.technologies && (
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-foreground mb-2">Technologies:</h5>
                  <div className="flex flex-wrap gap-2">
                    {item?.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md border border-secondary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Impact/Results */}
              {item?.impact && (
                <div className="mb-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="TrendingUp" size={16} className="text-accent" />
                    <span className="text-sm font-medium text-foreground">Impact & Results</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item?.impact}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4">
                  {item?.verified && (
                    <div className="flex items-center space-x-1 text-accent">
                      <Icon name="ShieldCheck" size={14} />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="Eye" size={14} />
                    <span className="text-xs">{item?.views} views</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" iconName="ExternalLink">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Share">
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StatsCard = ({ title, value, icon, color }) => (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon name={icon} size={20} />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-xl border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="GitBranch" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Collaboration History</h2>
            <p className="text-sm text-muted-foreground">Partnership patterns & community contributions</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Collaborations"
            value={collaborationData?.stats?.total}
            icon="Users"
            color="bg-primary/10 text-primary"
          />
          <StatsCard
            title="Active Projects"
            value={collaborationData?.stats?.activeProjects}
            icon="FolderOpen"
            color="bg-secondary/10 text-secondary"
          />
          <StatsCard
            title="Mentorship"
            value={collaborationData?.stats?.mentorship}
            icon="GraduationCap"
            color="bg-accent/10 text-accent"
          />
          <StatsCard
            title="Communities"
            value={collaborationData?.stats?.communities}
            icon="Globe"
            color="bg-warning/10 text-warning"
          />
        </div>
      </div>
      <div className="p-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-8">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-foreground mr-2">Timeframe:</span>
            {timeframes?.map((timeframe) => (
              <Button
                key={timeframe?.key}
                variant={selectedTimeframe === timeframe?.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe?.key)}
              >
                {timeframe?.label}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-foreground mr-2">Type:</span>
            {types?.map((type) => (
              <Button
                key={type?.key}
                variant={selectedType === type?.key ? "default" : "outline"}
                size="sm"
                iconName={type?.icon}
                iconPosition="left"
                onClick={() => setSelectedType(type?.key)}
              >
                {type?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {filteredHistory?.map((item, index) => (
            <CollaborationItem key={index} item={item} />
          ))}
        </div>

        {filteredHistory?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="GitBranch" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No collaborations found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or start collaborating on projects.</p>
          </div>
        )}

        {/* Load More */}
        {filteredHistory?.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" iconName="ChevronDown">
              Load More History
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationHistory;