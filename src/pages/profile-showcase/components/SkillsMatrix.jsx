import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsMatrix = ({ skillsData }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('matrix');

  const categories = [
    { key: 'all', label: 'All Skills', icon: 'Zap' },
    { key: 'frontend', label: 'Frontend', icon: 'Monitor' },
    { key: 'backend', label: 'Backend', icon: 'Server' },
    { key: 'database', label: 'Database', icon: 'Database' },
    { key: 'devops', label: 'DevOps', icon: 'Cloud' },
    { key: 'mobile', label: 'Mobile', icon: 'Smartphone' },
    { key: 'ai', label: 'AI/ML', icon: 'Brain' },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skillsData?.skills 
    : skillsData?.skills?.filter(skill => skill?.category === selectedCategory);

  const getSkillLevelColor = (level) => {
    if (level >= 90) return 'text-accent bg-accent/10 border-accent/20';
    if (level >= 70) return 'text-primary bg-primary/10 border-primary/20';
    if (level >= 50) return 'text-secondary bg-secondary/10 border-secondary/20';
    return 'text-muted-foreground bg-muted border-border';
  };

  const getSkillLevelText = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    return 'Beginner';
  };

  const SkillCard = ({ skill }) => (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-subtle transition-all duration-200 group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Icon name={skill?.icon || 'Code'} size={20} className="text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{skill?.name}</h4>
            <p className="text-sm text-muted-foreground">{skill?.category}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSkillLevelColor(skill?.selfAssessed)}`}>
            {getSkillLevelText(skill?.selfAssessed)}
          </span>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Users" size={12} />
            <span>{skill?.peerEndorsements} endorsements</span>
          </div>
        </div>
      </div>

      {/* Skill Progress Bars */}
      <div className="space-y-3 mb-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Self-assessed</span>
            <span className="text-sm font-medium text-foreground">{skill?.selfAssessed}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${skill?.selfAssessed}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Peer-validated</span>
            <span className="text-sm font-medium text-foreground">{skill?.peerValidated}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${skill?.peerValidated}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="mb-4">
        <h5 className="text-sm font-medium text-foreground mb-2">Recent Applications:</h5>
        <div className="space-y-1">
          {skill?.recentProjects?.slice(0, 2)?.map((project, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
              <span className="text-muted-foreground">{project}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Status */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          {skill?.verified && (
            <div className="flex items-center space-x-1 text-accent">
              <Icon name="ShieldCheck" size={14} />
              <span className="text-xs font-medium">Verified</span>
            </div>
          )}
          {skill?.trending && (
            <div className="flex items-center space-x-1 text-warning">
              <Icon name="TrendingUp" size={14} />
              <span className="text-xs font-medium">Trending</span>
            </div>
          )}
        </div>
        
        <Button variant="ghost" size="sm" className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          View Details
        </Button>
      </div>
    </div>
  );

  const SkillListItem = ({ skill }) => (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-subtle transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
            <Icon name={skill?.icon || 'Code'} size={24} className="text-muted-foreground" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="font-semibold text-foreground">{skill?.name}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSkillLevelColor(skill?.selfAssessed)}`}>
                {getSkillLevelText(skill?.selfAssessed)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Self-assessed</span>
                  <span className="text-xs font-medium">{skill?.selfAssessed}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${skill?.selfAssessed}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Peer-validated</span>
                  <span className="text-xs font-medium">{skill?.peerValidated}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-accent h-1.5 rounded-full"
                    style={{ width: `${skill?.peerValidated}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={12} />
                <span>{skill?.peerEndorsements} endorsements</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="FolderOpen" size={12} />
                <span>{skill?.recentProjects?.length} recent projects</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          {skill?.verified && (
            <Icon name="ShieldCheck" size={16} className="text-accent" />
          )}
          {skill?.trending && (
            <Icon name="TrendingUp" size={16} className="text-warning" />
          )}
          <Button variant="ghost" size="sm" iconName="ChevronRight" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-xl border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Skills Matrix</h2>
              <p className="text-sm text-muted-foreground">Self-assessed & peer-validated competencies</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'matrix' ? "default" : "outline"}
              size="sm"
              iconName="Grid3X3"
              onClick={() => setViewMode('matrix')}
            />
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              size="sm"
              iconName="List"
              onClick={() => setViewMode('list')}
            />
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories?.map((category) => (
            <Button
              key={category?.key}
              variant={selectedCategory === category?.key ? "default" : "outline"}
              size="sm"
              iconName={category?.icon}
              iconPosition="left"
              onClick={() => setSelectedCategory(category?.key)}
            >
              {category?.label}
            </Button>
          ))}
        </div>

        {/* Skills Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{skillsData?.totalSkills}</div>
            <div className="text-sm text-muted-foreground">Total Skills</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{skillsData?.expertLevel}</div>
            <div className="text-sm text-muted-foreground">Expert Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{skillsData?.verified}</div>
            <div className="text-sm text-muted-foreground">Verified</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">{skillsData?.endorsements}</div>
            <div className="text-sm text-muted-foreground">Endorsements</div>
          </div>
        </div>

        {/* Skills Display */}
        {viewMode === 'matrix' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredSkills?.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSkills?.map((skill, index) => (
              <SkillListItem key={index} skill={skill} />
            ))}
          </div>
        )}

        {filteredSkills?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Zap" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No skills found</h3>
            <p className="text-muted-foreground">Try selecting a different category or add your first skill.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsMatrix;