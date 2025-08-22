import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ProgressVisualization = ({ projectData, teamMembers }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'velocity', label: 'Velocity', icon: 'TrendingUp' },
    { id: 'contributions', label: 'Contributions', icon: 'Users' },
    { id: 'skills', label: 'Skills', icon: 'Award' }
  ];

  const velocityData = [
    { week: 'Week 1', completed: 12, planned: 15 },
    { week: 'Week 2', completed: 18, planned: 20 },
    { week: 'Week 3', completed: 22, planned: 18 },
    { week: 'Week 4', completed: 16, planned: 25 },
    { week: 'Week 5', completed: 28, planned: 22 },
    { week: 'Week 6', completed: 24, planned: 30 }
  ];

  const contributionData = teamMembers?.map(member => ({
    name: member?.name?.split(' ')?.[0],
    commits: member?.stats?.commits,
    reviews: member?.stats?.reviews,
    tasks: member?.stats?.tasksCompleted
  }));

  const skillsData = [
    { name: 'Frontend', value: 35, color: '#3B82F6' },
    { name: 'Backend', value: 28, color: '#10B981' },
    { name: 'DevOps', value: 20, color: '#F59E0B' },
    { name: 'Testing', value: 17, color: '#EF4444' }
  ];

  const milestones = [
    { id: 1, title: 'Project Setup', completed: true, date: '2025-08-01', progress: 100 },
    { id: 2, title: 'Core Features', completed: true, date: '2025-08-10', progress: 100 },
    { id: 3, title: 'UI Implementation', completed: false, date: '2025-08-20', progress: 75 },
    { id: 4, title: 'Testing & QA', completed: false, date: '2025-08-25', progress: 30 },
    { id: 5, title: 'Deployment', completed: false, date: '2025-08-30', progress: 0 }
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tasks Done</p>
              <p className="text-2xl font-bold text-foreground">{projectData?.tasksCompleted}</p>
            </div>
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <Icon name="TrendingUp" size={12} className="text-success" />
            <span className="text-xs text-success">+12% from last week</span>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Code Reviews</p>
              <p className="text-2xl font-bold text-foreground">{projectData?.codeReviews}</p>
            </div>
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="GitPullRequest" size={20} className="text-secondary" />
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <Icon name="TrendingUp" size={12} className="text-success" />
            <span className="text-xs text-success">+8% from last week</span>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Commits</p>
              <p className="text-2xl font-bold text-foreground">{projectData?.totalCommits}</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="GitCommit" size={20} className="text-primary" />
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <Icon name="TrendingDown" size={12} className="text-destructive" />
            <span className="text-xs text-destructive">-3% from last week</span>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Team Velocity</p>
              <p className="text-2xl font-bold text-foreground">{projectData?.velocity}</p>
            </div>
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-accent" />
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <Icon name="TrendingUp" size={12} className="text-success" />
            <span className="text-xs text-success">+15% from last week</span>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-4">Project Milestones</h4>
        <div className="space-y-4">
          {milestones?.map((milestone, index) => (
            <div key={milestone?.id} className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                milestone?.completed ? 'bg-success text-white' : 'bg-muted border-2 border-border'
              }`}>
                {milestone?.completed ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-medium text-foreground">{milestone?.title}</h5>
                  <span className="text-sm text-muted-foreground">{milestone?.date}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      milestone?.completed ? 'bg-success' : 'bg-primary'
                    }`}
                    style={{ width: `${milestone?.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const VelocityTab = () => (
    <div className="space-y-6">
      <div className="bg-muted/30 rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-4">Team Velocity Trend</h4>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={velocityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-popover)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }} 
              />
              <Line type="monotone" dataKey="completed" stroke="var(--color-success)" strokeWidth={3} />
              <Line type="monotone" dataKey="planned" stroke="var(--color-primary)" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-muted/30 rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-4">Sprint Burndown</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Remaining Tasks</span>
              <span className="font-medium text-foreground">12 / 45</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-3/4"></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Sprint Day 8</span>
              <span>2 days remaining</span>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-4">Velocity Insights</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="text-sm text-foreground">Velocity increased by 15%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="text-sm text-foreground">On track for sprint goal</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-warning" />
              <span className="text-sm text-foreground">3 tasks at risk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContributionsTab = () => (
    <div className="space-y-6">
      <div className="bg-muted/30 rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-4">Team Contributions</h4>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-popover)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="commits" fill="var(--color-primary)" />
              <Bar dataKey="reviews" fill="var(--color-secondary)" />
              <Bar dataKey="tasks" fill="var(--color-accent)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teamMembers?.slice(0, 4)?.map((member) => (
          <div key={member?.id} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src={member?.avatar}
                alt={member?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h5 className="font-medium text-foreground">{member?.name}</h5>
                <p className="text-sm text-muted-foreground">{member?.role}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Commits</span>
                <span className="font-medium text-foreground">{member?.stats?.commits}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Reviews</span>
                <span className="font-medium text-foreground">{member?.stats?.reviews}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tasks</span>
                <span className="font-medium text-foreground">{member?.stats?.tasksCompleted}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SkillsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-muted/30 rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-4">Skill Distribution</h4>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {skillsData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-4">Learning Progress</h4>
          <div className="space-y-4">
            {skillsData?.map((skill) => (
              <div key={skill?.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{skill?.name}</span>
                  <span className="text-sm text-muted-foreground">{skill?.value}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${skill?.value}%`,
                      backgroundColor: skill?.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-4">Recent Achievements</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Code Review Master', description: 'Completed 50+ code reviews', icon: 'Award', color: 'text-warning' },
            { title: 'Bug Hunter', description: 'Fixed 25 critical bugs', icon: 'Shield', color: 'text-success' },
            { title: 'Team Player', description: 'Helped 10+ team members', icon: 'Users', color: 'text-primary' },
            { title: 'Documentation Pro', description: 'Wrote comprehensive docs', icon: 'FileText', color: 'text-secondary' },
            { title: 'Performance Optimizer', description: 'Improved app speed by 40%', icon: 'Zap', color: 'text-accent' },
            { title: 'Testing Champion', description: 'Achieved 95% test coverage', icon: 'CheckCircle', color: 'text-success' }
          ]?.map((achievement, index) => (
            <div key={index} className="bg-background/50 rounded-lg p-4 border border-border">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-muted rounded-lg flex items-center justify-center`}>
                  <Icon name={achievement?.icon} size={20} className={achievement?.color} />
                </div>
                <div>
                  <h5 className="font-medium text-foreground text-sm">{achievement?.title}</h5>
                  <p className="text-xs text-muted-foreground">{achievement?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'velocity': return <VelocityTab />;
      case 'contributions': return <ContributionsTab />;
      case 'skills': return <SkillsTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Progress Analytics</h3>
        <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
          Export Report
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {tabs?.map((tab) => (
          <Button
            key={tab?.id}
            variant={activeTab === tab?.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 ${activeTab === tab?.id ? 'bg-background shadow-sm' : ''}`}
            iconName={tab?.icon}
            iconPosition="left"
          >
            {tab?.label}
          </Button>
        ))}
      </div>
      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default ProgressVisualization;