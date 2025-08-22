import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectPortfolio = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { key: 'all', label: 'All Projects', count: projects?.length },
    { key: 'web', label: 'Web Development', count: projects?.filter(p => p?.category === 'web')?.length },
    { key: 'mobile', label: 'Mobile Apps', count: projects?.filter(p => p?.category === 'mobile')?.length },
    { key: 'ai', label: 'AI/ML', count: projects?.filter(p => p?.category === 'ai')?.length },
    { key: 'opensource', label: 'Open Source', count: projects?.filter(p => p?.category === 'opensource')?.length },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects?.filter(project => project?.category === selectedCategory);

  const ProjectCard = ({ project }) => (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-medium transition-all duration-300 group">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project?.image}
          alt={project?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Project Status */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            project?.status === 'completed' 
              ? 'bg-accent/10 text-accent border border-accent/20'
              : project?.status === 'in-progress' ?'bg-warning/10 text-warning border border-warning/20' :'bg-primary/10 text-primary border border-primary/20'
          }`}>
            {project?.status === 'completed' ? 'Completed' : 
             project?.status === 'in-progress' ? 'In Progress' : 'Planning'}
          </span>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
            iconName="ExternalLink"
          />
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
            iconName="Github"
          />
        </div>

        {/* Impact Metric */}
        <div className="absolute bottom-3 left-3 text-white">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} />
            <span className="text-sm font-medium">{project?.impact}</span>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{project?.title}</h3>
            <p className="text-sm text-muted-foreground">{project?.description}</p>
          </div>
          <div className="flex items-center space-x-1 ml-3">
            <Icon name="Star" size={16} className="text-warning fill-current" />
            <span className="text-sm font-medium text-foreground">{project?.rating}</span>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project?.technologies?.slice(0, 4)?.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md border border-secondary/20"
            >
              {tech}
            </span>
          ))}
          {project?.technologies?.length > 4 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md border border-border">
              +{project?.technologies?.length - 4} more
            </span>
          )}
        </div>

        {/* Team Members */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Team:</span>
            <div className="flex -space-x-2">
              {project?.teamMembers?.slice(0, 3)?.map((member, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border-2 border-card overflow-hidden"
                  title={member?.name}
                >
                  <Image
                    src={member?.avatar}
                    alt={member?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {project?.teamMembers?.length > 3 && (
                <div className="w-6 h-6 rounded-full border-2 border-card bg-muted flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">+{project?.teamMembers?.length - 3}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="GitCommit" size={14} />
              <span>{project?.commits}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{project?.duration}</span>
            </div>
          </div>
        </div>

        {/* Verification & Links */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            {project?.verified && (
              <div className="flex items-center space-x-1 text-accent">
                <Icon name="ShieldCheck" size={14} />
                <span className="text-xs font-medium">Verified</span>
              </div>
            )}
            {project?.featured && (
              <div className="flex items-center space-x-1 text-primary">
                <Icon name="Award" size={14} />
                <span className="text-xs font-medium">Featured</span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" iconName="Eye">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectListItem = ({ project }) => (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-subtle transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={project?.image}
            alt={project?.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{project?.title}</h3>
              <p className="text-sm text-muted-foreground">{project?.description}</p>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} className="text-warning fill-current" />
                <span className="text-sm font-medium">{project?.rating}</span>
              </div>
              <Button variant="ghost" size="sm" iconName="ExternalLink" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {project?.technologies?.slice(0, 6)?.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>{project?.duration}</span>
              <span>•</span>
              <span>{project?.commits} commits</span>
              <span>•</span>
              <span>{project?.teamMembers?.length} team members</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={14} />
              <span>{project?.impact}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-xl border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="FolderOpen" size={20} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Project Portfolio</h2>
              <p className="text-sm text-muted-foreground">Collaborative work with verified outcomes</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
              iconName="Grid3X3"
              onClick={() => setViewMode('grid')}
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
              onClick={() => setSelectedCategory(category?.key)}
            >
              {category?.label} ({category?.count})
            </Button>
          ))}
        </div>

        {/* Projects Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects?.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects?.map((project, index) => (
              <ProjectListItem key={index} project={project} />
            ))}
          </div>
        )}

        {filteredProjects?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FolderX" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try selecting a different category or create your first project.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPortfolio;