import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('main');
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationSections = {
    main: [
      { name: 'Home', path: '/homepage', icon: 'Home', description: 'Dashboard & Overview' },
      { name: 'Community', path: '/community-explorer', icon: 'Users', description: 'Explore Communities' },
      { name: 'Projects', path: '/project-workspace', icon: 'FolderOpen', description: 'Active Projects' },
      { name: 'Knowledge', path: '/knowledge-hub', icon: 'BookOpen', description: 'Learning Resources' },
      { name: 'Skills', path: '/skill-verification-center', icon: 'Award', description: 'Skill Verification' },
    ],
    personal: [
      { name: 'Profile', path: '/profile-showcase', icon: 'User', description: 'Your Profile' },
      { name: 'Achievements', path: '/achievements', icon: 'Trophy', description: 'Your Achievements' },
      { name: 'Learning Path', path: '/learning-path', icon: 'Map', description: 'Your Learning Journey' },
    ],
    tools: [
      { name: 'Code Editor', path: '/code-editor', icon: 'Code', description: 'Online IDE' },
      { name: 'Collaboration', path: '/collaboration', icon: 'GitBranch', description: 'Team Workspace' },
      { name: 'Analytics', path: '/analytics', icon: 'BarChart3', description: 'Progress Analytics' },
    ],
    settings: [
      { name: 'Settings', path: '/settings', icon: 'Settings', description: 'Account Settings' },
      { name: 'Help', path: '/help', icon: 'HelpCircle', description: 'Help & Support' },
      { name: 'Feedback', path: '/feedback', icon: 'MessageSquare', description: 'Send Feedback' },
    ],
  };

  const sectionTitles = {
    main: 'Navigation',
    personal: 'Personal',
    tools: 'Tools',
    settings: 'Settings',
  };

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (onToggle) {
      onToggle();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border z-sidebar transition-all duration-300 lg:fixed ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-muted-foreground">
                  Workspace
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-muted-foreground hover:text-foreground lg:hidden"
              iconName="X"
            />
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-6">
              {Object.entries(navigationSections)?.map(([sectionKey, items]) => (
                <div key={sectionKey} className="px-3">
                  {!isCollapsed && (
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {sectionTitles?.[sectionKey]}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveSection(activeSection === sectionKey ? '' : sectionKey)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                        iconName={activeSection === sectionKey ? "ChevronDown" : "ChevronRight"}
                      />
                    </div>
                  )}
                  
                  <div className={`space-y-1 ${!isCollapsed && activeSection !== sectionKey && sectionKey !== 'main' ? 'hidden' : ''}`}>
                    {items?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => handleNavigation(item?.path)}
                        className={`group flex items-center w-full rounded-lg text-sm font-medium transition-all duration-200 ${
                          isCollapsed ? 'p-3 justify-center' : 'p-3'
                        } ${
                          isActivePath(item?.path)
                            ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        title={isCollapsed ? item?.name : ''}
                      >
                        <Icon 
                          name={item?.icon} 
                          size={18} 
                          className={`${isActivePath(item?.path) ? 'text-primary' : 'text-current'} ${
                            !isCollapsed ? 'mr-3' : ''
                          }`}
                        />
                        {!isCollapsed && (
                          <div className="flex-1 text-left">
                            <div className="font-medium">{item?.name}</div>
                            <div className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">
                              {item?.description}
                            </div>
                          </div>
                        )}
                        {!isCollapsed && isActivePath(item?.path) && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="border-t border-border p-4">
            {!isCollapsed ? (
              <div className="space-y-3">
                {/* Quick Stats */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Weekly Progress
                    </span>
                    <span className="text-xs font-bold text-accent">
                      78%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full w-3/4 transition-all duration-500"></div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">
                    Online • 3 active projects
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={16} className="text-white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
      {/* Mobile Sidebar Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 lg:hidden bg-primary text-primary-foreground shadow-medium hover:bg-primary/90"
        iconName="Menu"
      />
    </>
  );
};

export default Sidebar;