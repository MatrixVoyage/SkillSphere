import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ProjectHeader from './components/ProjectHeader';
import KanbanBoard from './components/KanbanBoard';
import TeamChat from './components/TeamChat';
import AIAssistant from './components/AIAssistant';
import ProgressVisualization from './components/ProgressVisualization';
import LearningMoments from './components/LearningMoments';
import FileManager from './components/FileManager';

import Button from '../../components/ui/Button';

const ProjectWorkspace = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatCollapsed, setChatCollapsed] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [activeView, setActiveView] = useState('kanban');

  // Mock project data
  const projectData = {
    id: 1,
    name: "SkillSphere Mobile App",
    description: "React Native mobile application for the SkillSphere platform with real-time collaboration features",
    icon: "Smartphone",
    status: "active",
    progress: 68,
    dueDate: "2025-09-15",
    repository: "skillsphere/mobile-app",
    isStarred: true,
    tasksCompleted: 34,
    codeReviews: 18,
    totalCommits: 156,
    velocity: 24,
    members: [
      {
        id: 1,
        name: "Sarah Chen",
        role: "Frontend Lead",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        isOnline: true,
        stats: { commits: 45, reviews: 12, tasksCompleted: 8 }
      },
      {
        id: 2,
        name: "Marcus Johnson",
        role: "Backend Developer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        isOnline: true,
        stats: { commits: 38, reviews: 15, tasksCompleted: 6 }
      },
      {
        id: 3,
        name: "Elena Rodriguez",
        role: "UI/UX Designer",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        isOnline: false,
        stats: { commits: 22, reviews: 8, tasksCompleted: 12 }
      },
      {
        id: 4,
        name: "David Kim",
        role: "DevOps Engineer",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        isOnline: true,
        stats: { commits: 31, reviews: 10, tasksCompleted: 5 }
      },
      {
        id: 5,
        name: "Priya Patel",
        role: "QA Engineer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        isOnline: false,
        stats: { commits: 20, reviews: 25, tasksCompleted: 3 }
      }
    ]
  };

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Implement user authentication flow",
      description: "Create login, signup, and password reset screens with proper validation and error handling",
      status: "inprogress",
      priority: "high",
      assignee: projectData?.members?.[0],
      dueDate: "2025-08-25",
      comments: 3,
      attachments: 2
    },
    {
      id: 2,
      title: "Design community discovery interface",
      description: "Create wireframes and mockups for the community exploration feature",
      status: "review",
      priority: "medium",
      assignee: projectData?.members?.[2],
      dueDate: "2025-08-22",
      comments: 5,
      attachments: 1
    },
    {
      id: 3,
      title: "Set up CI/CD pipeline",
      description: "Configure automated testing and deployment for the mobile app",
      status: "todo",
      priority: "high",
      assignee: projectData?.members?.[3],
      dueDate: "2025-08-28",
      comments: 1,
      attachments: 0
    },
    {
      id: 4,
      title: "Implement real-time chat functionality",
      description: "Add WebSocket support for live messaging within project workspaces",
      status: "todo",
      priority: "medium",
      assignee: projectData?.members?.[1],
      dueDate: "2025-09-02",
      comments: 0,
      attachments: 0
    },
    {
      id: 5,
      title: "Create onboarding tutorial",
      description: "Design and implement interactive tutorial for new users",
      status: "done",
      priority: "low",
      assignee: projectData?.members?.[2],
      dueDate: "2025-08-15",
      comments: 8,
      attachments: 3
    },
    {
      id: 6,
      title: "Write unit tests for API endpoints",
      description: "Comprehensive test coverage for all authentication and user management endpoints",
      status: "inprogress",
      priority: "medium",
      assignee: projectData?.members?.[4],
      dueDate: "2025-08-30",
      comments: 2,
      attachments: 0
    }
  ]);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "Hey team! I\'ve just pushed the authentication flow updates. Could someone review the PR?",
      timestamp: new Date(Date.now() - 1800000),
      type: "text"
    },
    {
      id: 2,
      sender: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "I'll take a look at it after I finish the API integration. Should be done in about an hour.",
      timestamp: new Date(Date.now() - 1500000),
      type: "text"
    },
    {
      id: 3,
      sender: "Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "The new designs are ready! I\'ve updated the Figma file with the community discovery screens.",
      timestamp: new Date(Date.now() - 900000),
      type: "text"
    },
    {
      id: 4,
      sender: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `Here's the deployment script for the staging environment:\n\n#!/bin/bash\nnpm run build\ndocker build -t skillsphere-mobile .\ndocker push registry/skillsphere-mobile:latest`,
      timestamp: new Date(Date.now() - 600000),
      type: "code"
    },
    {
      id: 5,
      sender: "You",
      content: "Great work everyone! The progress this week has been amazing. Let\'s keep up the momentum!",
      timestamp: new Date(Date.now() - 300000),
      type: "text"
    }
  ]);

  const [learningMoments, setLearningMoments] = useState([
    {
      id: 1,
      title: "Optimized React Native performance with FlatList virtualization",
      description: `Discovered that our community list was causing performance issues on older devices. Implemented FlatList with proper keyExtractor and getItemLayout for smooth scrolling with 1000+ items.\n\nKey learnings:\n• Always use FlatList for large datasets\n• Implement proper key extraction\n• Consider getItemLayout for fixed-height items\n• Test on lower-end devices regularly`,
      category: "technical",
      timestamp: new Date(Date.now() - 86400000),
      verified: true,
      endorsements: 5,
      tags: ["react-native", "performance", "optimization"]
    },
    {
      id: 2,
      title: "Improved team communication through structured code reviews",
      description: `Introduced a code review checklist that improved our review quality and reduced back-and-forth. Team members now provide more constructive feedback and catch issues earlier.\n\nImplemented checklist includes:\n• Code style and conventions\n• Performance considerations\n• Security implications\n• Test coverage\n• Documentation updates`,
      category: "collaboration",
      timestamp: new Date(Date.now() - 172800000),
      verified: false,
      endorsements: 8,
      tags: ["code-review", "team-process", "quality"]
    },
    {
      id: 3,
      title: "Solved complex state management issue with Redux Toolkit",
      description: `Encountered a race condition in our authentication flow where multiple API calls were interfering with each other. Used RTK Query with proper cache invalidation to solve the issue.\n\nSolution involved:\n• Implementing proper loading states\n• Using RTK Query for API state management\n• Adding optimistic updates for better UX\n• Proper error handling and retry logic`,
      category: "problem-solving",
      timestamp: new Date(Date.now() - 259200000),
      verified: true,
      endorsements: 12,
      tags: ["redux", "state-management", "api", "debugging"]
    }
  ]);

  const [projectFiles, setProjectFiles] = useState([
    {
      id: 1,
      name: "project-requirements.pdf",
      size: 2048576,
      uploadedAt: new Date(Date.now() - 86400000),
      uploadedBy: "Sarah Chen",
      tags: ["requirements", "documentation"],
      description: "Detailed project requirements and specifications document"
    },
    {
      id: 2,
      name: "api-documentation.md",
      size: 512000,
      uploadedAt: new Date(Date.now() - 172800000),
      uploadedBy: "Marcus Johnson",
      tags: ["api", "documentation", "backend"],
      description: "Complete API documentation with examples and schemas"
    },
    {
      id: 3,
      name: "ui-mockups.fig",
      size: 15728640,
      uploadedAt: new Date(Date.now() - 259200000),
      uploadedBy: "Elena Rodriguez",
      tags: ["design", "ui", "mockups"],
      description: "Figma file containing all UI mockups and design system"
    },
    {
      id: 4,
      name: "deployment-config.yml",
      size: 8192,
      uploadedAt: new Date(Date.now() - 345600000),
      uploadedBy: "David Kim",
      tags: ["devops", "deployment", "config"],
      description: "Docker and Kubernetes deployment configuration"
    },
    {
      id: 5,
      name: "test-results-report.html",
      size: 1048576,
      uploadedAt: new Date(Date.now() - 432000000),
      uploadedBy: "Priya Patel",
      tags: ["testing", "qa", "report"],
      description: "Comprehensive test results and coverage report"
    },
    {
      id: 6,
      name: "architecture-diagram.png",
      size: 3145728,
      uploadedAt: new Date(Date.now() - 518400000),
      uploadedBy: "Marcus Johnson",
      tags: ["architecture", "diagram", "technical"],
      description: "System architecture overview and component relationships"
    }
  ]);

  const views = [
    { id: 'kanban', label: 'Kanban Board', icon: 'Columns' },
    { id: 'progress', label: 'Progress', icon: 'BarChart3' },
    { id: 'files', label: 'Files', icon: 'Folder' },
    { id: 'learning', label: 'Learning', icon: 'Brain' }
  ];

  const handleTaskUpdate = (taskId, updates) => {
    setTasks(prev => prev?.map(task => 
      task?.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const handleTaskCreate = () => {
    // In a real app, this would open a task creation modal
    console.log('Create new task');
  };

  const handleSendMessage = (message) => {
    setChatMessages(prev => [...prev, message]);
  };

  const handleAddLearningMoment = (moment) => {
    setLearningMoments(prev => [moment, ...prev]);
  };

  const handleUpdateLearningMoment = (momentId, updates) => {
    setLearningMoments(prev => prev?.map(moment =>
      moment?.id === momentId ? { ...moment, ...updates } : moment
    ));
  };

  const handleFileUpload = (file) => {
    setProjectFiles(prev => [file, ...prev]);
  };

  const handleFileDelete = (fileId) => {
    setProjectFiles(prev => prev?.filter(file => file?.id !== fileId));
  };

  const handleFileShare = (fileId) => {
    console.log('Share file:', fileId);
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'kanban':
        return (
          <KanbanBoard
            tasks={tasks}
            onTaskUpdate={handleTaskUpdate}
            onTaskCreate={handleTaskCreate}
          />
        );
      case 'progress':
        return (
          <ProgressVisualization
            projectData={projectData}
            teamMembers={projectData?.members}
          />
        );
      case 'files':
        return (
          <FileManager
            files={projectFiles}
            onFileUpload={handleFileUpload}
            onFileDelete={handleFileDelete}
            onFileShare={handleFileShare}
          />
        );
      case 'learning':
        return (
          <LearningMoments
            moments={learningMoments}
            onAddMoment={handleAddLearningMoment}
            onUpdateMoment={handleUpdateLearningMoment}
          />
        );
      default:
        return (
          <KanbanBoard
            tasks={tasks}
            onTaskUpdate={handleTaskUpdate}
            onTaskCreate={handleTaskCreate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      } pt-16`}>
        <div className="p-6 space-y-6">
          {/* Project Header */}
          <ProjectHeader
            project={projectData}
            onSettingsClick={() => console.log('Settings clicked')}
            onInviteClick={() => console.log('Invite clicked')}
          />

          {/* View Navigation */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {views?.map((view) => (
                  <Button
                    key={view?.id}
                    variant={activeView === view?.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveView(view?.id)}
                    iconName={view?.icon}
                    iconPosition="left"
                  >
                    {view?.label}
                  </Button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAiAssistantOpen(true)}
                  iconName="Bot"
                  iconPosition="left"
                >
                  AI Assistant
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Video"
                  iconPosition="left"
                >
                  Start Call
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3">
              {renderMainContent()}
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Team Chat */}
              <TeamChat
                messages={chatMessages}
                onSendMessage={handleSendMessage}
                members={projectData?.members}
                isCollapsed={chatCollapsed}
                onToggleCollapse={() => setChatCollapsed(!chatCollapsed)}
              />

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Create Task
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    iconName="GitPullRequest"
                    iconPosition="left"
                  >
                    New Pull Request
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Schedule Meeting
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    iconName="FileText"
                    iconPosition="left"
                  >
                    Add Documentation
                  </Button>
                </div>
              </div>

              {/* Project Stats */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-4">Project Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Sprint Progress</span>
                    <span className="text-sm font-medium text-foreground">68%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-2/3"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Code Coverage</span>
                    <span className="text-sm font-medium text-success">85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full w-5/6"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Team Velocity</span>
                    <span className="text-sm font-medium text-accent">24 pts</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* AI Assistant */}
      <AIAssistant
        isOpen={aiAssistantOpen}
        onToggle={() => setAiAssistantOpen(!aiAssistantOpen)}
      />
    </div>
  );
};

export default ProjectWorkspace;