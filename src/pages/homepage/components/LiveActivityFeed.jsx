import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mockActivities = [
    {
      id: 1,
      type: 'project_completion',
      user: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        github: 'sarahchen'
      },
      action: 'completed project',
      target: 'E-commerce React App',
      skills: ['React', 'Node.js', 'MongoDB'],
      timestamp: new Date(Date.now() - 300000),
      community: 'Full-Stack Developers'
    },
    {
      id: 2,
      type: 'skill_verification',
      user: {
        name: 'Marcus Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        github: 'marcusdev'
      },
      action: 'earned verified skill',
      target: 'Docker Containerization',
      skills: ['Docker', 'DevOps'],
      timestamp: new Date(Date.now() - 600000),
      community: 'DevOps Engineers'
    },
    {
      id: 3,
      type: 'community_join',
      user: {
        name: 'Priya Patel',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        github: 'priyacode'
      },
      action: 'joined community',
      target: 'AI/ML Enthusiasts',
      skills: ['Python', 'TensorFlow', 'PyTorch'],
      timestamp: new Date(Date.now() - 900000),
      community: 'AI/ML Enthusiasts'
    },
    {
      id: 4,
      type: 'project_start',
      user: {
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        github: 'alexthompson'
      },
      action: 'started new project',
      target: 'Blockchain Voting System',
      skills: ['Solidity', 'Web3', 'React'],
      timestamp: new Date(Date.now() - 1200000),
      community: 'Blockchain Developers'
    },
    {
      id: 5,
      type: 'mentorship',
      user: {
        name: 'Elena Vasquez',
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150',
        github: 'elenavasquez'
      },
      action: 'became mentor for',
      target: 'Junior Frontend Developers',
      skills: ['Vue.js', 'CSS', 'JavaScript'],
      timestamp: new Date(Date.now() - 1500000),
      community: 'Frontend Masters'
    },
    {
      id: 6,
      type: 'achievement',
      user: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        github: 'davidkim'
      },
      action: 'unlocked achievement',
      target: 'Code Review Champion',
      skills: ['Code Review', 'Git', 'Collaboration'],
      timestamp: new Date(Date.now() - 1800000),
      community: 'Open Source Contributors'
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % mockActivities?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'project_completion':
        return { name: 'CheckCircle', color: 'text-green-400' };
      case 'skill_verification':
        return { name: 'Award', color: 'text-yellow-400' };
      case 'community_join':
        return { name: 'Users', color: 'text-blue-400' };
      case 'project_start':
        return { name: 'Rocket', color: 'text-purple-400' };
      case 'mentorship':
        return { name: 'Heart', color: 'text-pink-400' };
      case 'achievement':
        return { name: 'Trophy', color: 'text-orange-400' };
      default:
        return { name: 'Activity', color: 'text-gray-400' };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else {
      return `${hours}h ago`;
    }
  };

  if (activities?.length === 0) return null;

  return (
    <section className="py-16 bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-brand-headline text-brand-text-primary mb-4">
              Live Community Activity
            </h2>
            <p className="text-lg text-brand-text-secondary max-w-2xl mx-auto">
              See what developers are building, learning, and achieving right now
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Activity Cards Container */}
          <div className="relative h-96 overflow-hidden">
            <AnimatePresence mode="wait">
              {activities?.slice(currentIndex, currentIndex + 3)?.map((activity, index) => (
                <motion.div
                  key={`${activity?.id}-${currentIndex}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: index * 120
                  }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                  className="absolute w-full"
                >
                  <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-brand-secondary/50 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      {/* User Avatar */}
                      <div className="relative flex-shrink-0">
                        <Image
                          src={activity?.user?.avatar}
                          alt={activity?.user?.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-brand-secondary/30"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-800 rounded-full flex items-center justify-center">
                          <Icon 
                            name="Github" 
                            size={10} 
                            className="text-brand-text-secondary" 
                          />
                        </div>
                      </div>

                      {/* Activity Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-brand-text-primary">
                            {activity?.user?.name}
                          </span>
                          <span className="text-brand-text-secondary">
                            {activity?.action}
                          </span>
                          <div className={`${getActivityIcon(activity?.type)?.color}`}>
                            <Icon 
                              name={getActivityIcon(activity?.type)?.name} 
                              size={16} 
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <span className="text-brand-accent font-medium">
                            {activity?.target}
                          </span>
                          <span className="text-brand-text-secondary text-sm ml-2">
                            in {activity?.community}
                          </span>
                        </div>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {activity?.skills?.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-2 py-1 bg-brand-secondary/20 text-brand-secondary text-xs rounded-md font-mono"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-brand-text-secondary font-mono">
                            @{activity?.user?.github}
                          </span>
                          <span className="text-xs text-brand-text-secondary">
                            {formatTimeAgo(activity?.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Activity Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {activities?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index >= currentIndex && index < currentIndex + 3
                    ? 'bg-brand-secondary' :'bg-slate-600'
                }`}
              />
            ))}
          </div>

          {/* Real-time Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-accent mb-1">1,247</div>
              <div className="text-sm text-brand-text-secondary">Active Developers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-secondary mb-1">342</div>
              <div className="text-sm text-brand-text-secondary">Live Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">89</div>
              <div className="text-sm text-brand-text-secondary">Skills Verified Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">156</div>
              <div className="text-sm text-brand-text-secondary">New Connections</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveActivityFeed;