import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendingProjectsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const trendingProjects = [
    {
      id: 1,
      title: 'AI-Powered Code Review Assistant',
      description: 'Building an intelligent code review tool that provides automated feedback and suggestions using machine learning algorithms.',
      community: 'AI/ML Enthusiasts',
      members: 12,
      skillsRequired: ['Python', 'TensorFlow', 'React', 'Node.js'],
      difficulty: 'Advanced',
      progress: 65,
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
      contributors: [
        { name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
        { name: 'Sarah Kim', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100' },
        { name: 'Marcus Johnson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' }
      ],
      tags: ['Hot', 'AI'],
      estimatedTime: '8-12 weeks',
      openPositions: 3
    },
    {
      id: 2,
      title: 'Decentralized Social Media Platform',
      description: 'Creating a blockchain-based social network that gives users complete control over their data and content.',
      community: 'Blockchain Developers',
      members: 8,
      skillsRequired: ['Solidity', 'Web3', 'React', 'IPFS'],
      difficulty: 'Expert',
      progress: 40,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
      contributors: [
        { name: 'Elena Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
        { name: 'David Park', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' }
      ],
      tags: ['Trending', 'Web3'],
      estimatedTime: '12-16 weeks',
      openPositions: 5
    },
    {
      id: 3,
      title: 'Real-time Collaborative IDE',
      description: 'Developing a cloud-based integrated development environment with real-time collaboration features for remote teams.',
      community: 'Full-Stack Developers',
      members: 15,
      skillsRequired: ['TypeScript', 'Socket.io', 'Docker', 'AWS'],
      difficulty: 'Intermediate',
      progress: 80,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
      contributors: [
        { name: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100' },
        { name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
        { name: 'Lisa Zhang', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100' },
        { name: 'Tom Anderson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' }
      ],
      tags: ['Popular', 'DevTools'],
      estimatedTime: '6-8 weeks',
      openPositions: 2
    },
    {
      id: 4,
      title: 'IoT Smart Home Dashboard',
      description: 'Building a comprehensive dashboard for managing IoT devices with real-time monitoring and automation features.',
      community: 'IoT Developers',
      members: 10,
      skillsRequired: ['React', 'Node.js', 'MQTT', 'MongoDB'],
      difficulty: 'Intermediate',
      progress: 25,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      contributors: [
        { name: 'Michael Brown', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
        { name: 'Anna Garcia', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' }
      ],
      tags: ['New', 'IoT'],
      estimatedTime: '10-14 weeks',
      openPositions: 6
    },
    {
      id: 5,
      title: 'Microservices E-commerce Platform',
      description: 'Architecting a scalable e-commerce solution using microservices architecture with modern DevOps practices.',
      community: 'DevOps Engineers',
      members: 18,
      skillsRequired: ['Kubernetes', 'Docker', 'Go', 'PostgreSQL'],
      difficulty: 'Advanced',
      progress: 55,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      contributors: [
        { name: 'Robert Lee', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
        { name: 'Sophie Turner', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100' },
        { name: 'Carlos Martinez', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' }
      ],
      tags: ['Enterprise', 'DevOps'],
      estimatedTime: '14-18 weeks',
      openPositions: 4
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % trendingProjects?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, trendingProjects?.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % trendingProjects?.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + trendingProjects?.length) % trendingProjects?.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleJoinProject = (projectId) => {
    window.location.href = '/project-workspace';
  };

  const handleViewCommunity = (communityName) => {
    window.location.href = '/community-explorer';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400 bg-green-400/20';
      case 'Intermediate':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'Advanced':
        return 'text-orange-400 bg-orange-400/20';
      case 'Expert':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTagColor = (tag) => {
    switch (tag) {
      case 'Hot':
        return 'text-red-400 bg-red-400/20';
      case 'Trending':
        return 'text-purple-400 bg-purple-400/20';
      case 'Popular':
        return 'text-blue-400 bg-blue-400/20';
      case 'New':
        return 'text-green-400 bg-green-400/20';
      default:
        return 'text-brand-secondary bg-brand-secondary/20';
    }
  };

  return (
    <section className="py-24 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-brand-headline text-brand-text-primary mb-6">
            Trending Projects
          </h2>
          <p className="text-xl text-brand-text-secondary max-w-3xl mx-auto">
            Join active communities working on cutting-edge projects that matter
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden"
              >
                <div className="grid lg:grid-cols-2 gap-8 p-8">
                  {/* Project Image */}
                  <div className="relative">
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <Image
                        src={trendingProjects?.[currentSlide]?.image}
                        alt={trendingProjects?.[currentSlide]?.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    
                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {trendingProjects?.[currentSlide]?.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-md text-xs font-semibold ${getTagColor(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Progress Indicator */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm font-medium">Progress</span>
                        <span className="text-white text-sm">{trendingProjects?.[currentSlide]?.progress}%</span>
                      </div>
                      <div className="w-full bg-black/30 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-brand-secondary to-brand-accent h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${trendingProjects?.[currentSlide]?.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={() => handleViewCommunity(trendingProjects?.[currentSlide]?.community)}
                          className="text-brand-secondary hover:text-brand-secondary/80 text-sm font-medium transition-colors"
                        >
                          {trendingProjects?.[currentSlide]?.community}
                        </button>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(trendingProjects?.[currentSlide]?.difficulty)}`}>
                          {trendingProjects?.[currentSlide]?.difficulty}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-brand-text-primary mb-4">
                        {trendingProjects?.[currentSlide]?.title}
                      </h3>

                      <p className="text-brand-text-secondary mb-6 leading-relaxed">
                        {trendingProjects?.[currentSlide]?.description}
                      </p>

                      {/* Skills Required */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-brand-text-primary mb-3">
                          Skills Required
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {trendingProjects?.[currentSlide]?.skillsRequired?.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-brand-secondary/20 text-brand-secondary text-sm rounded-md font-mono"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Contributors */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-brand-text-primary">
                            Contributors ({trendingProjects?.[currentSlide]?.members})
                          </h4>
                          <span className="text-xs text-brand-text-secondary">
                            {trendingProjects?.[currentSlide]?.openPositions} positions open
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {trendingProjects?.[currentSlide]?.contributors?.slice(0, 4)?.map((contributor, index) => (
                            <Image
                              key={index}
                              src={contributor?.avatar}
                              alt={contributor?.name}
                              className="w-8 h-8 rounded-full border-2 border-brand-secondary/30"
                            />
                          ))}
                          {trendingProjects?.[currentSlide]?.contributors?.length > 4 && (
                            <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-brand-secondary/30 flex items-center justify-center">
                              <span className="text-xs text-brand-text-secondary">
                                +{trendingProjects?.[currentSlide]?.contributors?.length - 4}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Project Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                          <div className="text-lg font-bold text-brand-accent">
                            {trendingProjects?.[currentSlide]?.estimatedTime}
                          </div>
                          <div className="text-xs text-brand-text-secondary">
                            Estimated Time
                          </div>
                        </div>
                        <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                          <div className="text-lg font-bold text-brand-secondary">
                            {trendingProjects?.[currentSlide]?.members}
                          </div>
                          <div className="text-xs text-brand-text-secondary">
                            Active Members
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <Button
                        variant="default"
                        onClick={() => handleJoinProject(trendingProjects?.[currentSlide]?.id)}
                        iconName="UserPlus"
                        iconPosition="left"
                        className="bg-brand-accent hover:bg-brand-accent/90 text-white flex-1"
                      >
                        Join Project
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleViewCommunity(trendingProjects?.[currentSlide]?.community)}
                        iconName="ExternalLink"
                        iconPosition="right"
                        className="border-brand-secondary text-brand-secondary hover:bg-brand-secondary/10"
                      >
                        View Community
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-full flex items-center justify-center text-brand-text-primary hover:bg-slate-700/80 transition-all duration-200 z-10"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-full flex items-center justify-center text-brand-text-primary hover:bg-slate-700/80 transition-all duration-200 z-10"
          >
            <Icon name="ChevronRight" size={20} />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {trendingProjects?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-brand-secondary' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/project-workspace'}
            iconName="Grid3x3"
            iconPosition="left"
            className="border-brand-secondary text-brand-secondary hover:bg-brand-secondary/10"
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingProjectsCarousel;