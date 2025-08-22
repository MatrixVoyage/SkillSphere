import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ArticleCard from './components/ArticleCard';
import LearningPathCard from './components/LearningPathCard';
import ExpertInsightCard from './components/ExpertInsightCard';
import SearchFilters from './components/SearchFilters';
import BookmarkPanel from './components/BookmarkPanel';
import TrendingTopics from './components/TrendingTopics';

const KnowledgeHub = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    contentType: 'all',
    difficulty: null,
    topics: [],
    sortBy: 'recent'
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for articles
  const articles = [
    {
      id: 1,
      type: 'tutorial',
      title: 'Advanced React Patterns: Compound Components and Render Props',
      excerpt: `Learn how to build flexible and reusable React components using advanced patterns like compound components and render props. This comprehensive guide covers real-world examples and best practices for scalable component architecture.`,
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      difficulty: 'Advanced',
      readTime: 12,
      tags: ['React', 'JavaScript', 'Component Architecture', 'Design Patterns'],
      publishedAt: '2 days ago',
      views: '2.3k',
      comments: 45,
      likes: 189,
      isBookmarked: true
    },
    {
      id: 2,
      type: 'case-study',
      title: 'How We Scaled Our React App to Handle 10M+ Users',
      excerpt: `A detailed case study of performance optimizations, code splitting strategies, and infrastructure decisions that helped us scale our React application to serve millions of users without compromising user experience.`,
      author: {
        name: 'Michael Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      difficulty: 'Intermediate',
      readTime: 18,
      tags: ['React', 'Performance', 'Scaling', 'Architecture'],
      publishedAt: '1 week ago',
      views: '5.7k',
      comments: 92,
      likes: 341,
      isBookmarked: false
    },
    {
      id: 3,
      type: 'expert-insight',
      title: 'The Future of Web Development: Trends to Watch in 2024',
      excerpt: `Industry expert insights on emerging technologies, frameworks, and methodologies that will shape web development in the coming year. From AI integration to new JavaScript features.`,
      author: {
        name: 'Dr. Emily Watson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      difficulty: 'Beginner',
      readTime: 8,
      tags: ['Web Development', 'Trends', 'Future Tech', 'AI'],
      publishedAt: '3 days ago',
      views: '8.1k',
      comments: 156,
      likes: 523,
      isBookmarked: true
    },
    {
      id: 4,
      type: 'community',
      title: 'Building a Real-time Chat App with Socket.IO and React',
      excerpt: `Step-by-step community tutorial on creating a production-ready chat application with real-time messaging, user authentication, and message persistence using modern web technologies.`,
      author: {
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      difficulty: 'Intermediate',
      readTime: 25,
      tags: ['React', 'Socket.IO', 'Real-time', 'Node.js'],
      publishedAt: '5 days ago',
      views: '3.2k',
      comments: 67,
      likes: 234,
      isBookmarked: false
    }
  ];

  // Mock data for learning paths
  const learningPaths = [
    {
      id: 1,
      title: 'Full-Stack React Development',
      description: `Master modern React development from basics to advanced concepts, including state management, testing, and deployment strategies for production applications.`,
      duration: '8 weeks',
      difficulty: 'Intermediate',
      progress: 65,
      completedSteps: 12,
      totalSteps: 18,
      remainingTime: '3 weeks',
      isNew: false,
      skills: ['React', 'Redux', 'Testing', 'Deployment', 'API Integration'],
      steps: [
        { title: 'React Fundamentals', completed: true },
        { title: 'State Management with Redux', completed: true },
        { title: 'Component Testing', completed: false },
        { title: 'Performance Optimization', completed: false },
        { title: 'Production Deployment', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Machine Learning for Developers',
      description: `Learn practical machine learning concepts and implementation using Python, TensorFlow, and real-world datasets to build intelligent applications.`,
      duration: '12 weeks',
      difficulty: 'Advanced',
      progress: 25,
      completedSteps: 4,
      totalSteps: 16,
      remainingTime: '9 weeks',
      isNew: true,
      skills: ['Python', 'TensorFlow', 'Data Science', 'Neural Networks', 'Model Deployment'],
      steps: [
        { title: 'Python for ML', completed: true },
        { title: 'Data Preprocessing', completed: true },
        { title: 'Supervised Learning', completed: false },
        { title: 'Deep Learning Basics', completed: false },
        { title: 'Model Deployment', completed: false }
      ]
    },
    {
      id: 3,
      title: 'DevOps Fundamentals',
      description: `Comprehensive introduction to DevOps practices, CI/CD pipelines, containerization, and cloud deployment strategies for modern applications.`,
      duration: '6 weeks',
      difficulty: 'Beginner',
      progress: 0,
      completedSteps: 0,
      totalSteps: 12,
      remainingTime: '6 weeks',
      isNew: true,
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Monitoring'],
      steps: [
        { title: 'DevOps Introduction', completed: false },
        { title: 'Version Control with Git', completed: false },
        { title: 'Containerization with Docker', completed: false },
        { title: 'CI/CD Pipelines', completed: false },
        { title: 'Cloud Deployment', completed: false }
      ]
    }
  ];

  // Mock data for expert insights
  const expertInsights = [
    {
      id: 1,
      title: 'Why TypeScript is Becoming Essential for Large-Scale Applications',
      excerpt: `As applications grow in complexity, TypeScript provides the type safety and developer experience needed to maintain code quality and team productivity at scale.`,
      expert: {
        id: 1,
        name: 'Dan Abramov',
        title: 'Senior Software Engineer',
        company: 'Meta',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
        followers: '125k',
        isFollowing: false
      },
      topics: ['TypeScript', 'JavaScript', 'Software Architecture'],
      publishedAt: '1 day ago',
      views: '12.5k',
      comments: 234,
      likes: 892
    },
    {
      id: 2,
      title: 'The Evolution of Frontend Architecture: From MVC to Micro-frontends',
      excerpt: `Exploring how frontend architecture has evolved over the years and why micro-frontends are becoming the preferred approach for large organizations.`,
      expert: {
        id: 2,
        name: 'Kent C. Dodds',
        title: 'Full Stack Developer',
        company: 'Independent',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
        followers: '89k',
        isFollowing: true
      },
      topics: ['Frontend Architecture', 'Micro-frontends', 'React'],
      publishedAt: '4 days ago',
      views: '8.7k',
      comments: 156,
      likes: 567
    }
  ];

  // Mock data for bookmarks
  const bookmarks = [
    {
      id: 1,
      title: 'Advanced React Patterns: Compound Components and Render Props',
      author: 'Sarah Chen',
      readTime: 12,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&h=150&fit=crop'
    },
    {
      id: 2,
      title: 'Building Scalable Node.js Applications',
      author: 'Michael Rodriguez',
      readTime: 15,
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=150&h=150&fit=crop'
    },
    {
      id: 3,
      title: 'Machine Learning Model Deployment Strategies',
      author: 'Dr. Emily Watson',
      readTime: 20,
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=150&h=150&fit=crop'
    }
  ];

  // Mock data for trending topics
  const trendingTopics = [
    {
      id: 1,
      name: 'React 18',
      articles: 156,
      discussions: 89,
      trend: 45
    },
    {
      id: 2,
      name: 'Machine Learning',
      articles: 234,
      discussions: 145,
      trend: 32
    },
    {
      id: 3,
      name: 'Web3 Development',
      articles: 98,
      discussions: 67,
      trend: 28
    },
    {
      id: 4,
      name: 'TypeScript',
      articles: 189,
      discussions: 123,
      trend: 15
    },
    {
      id: 5,
      name: 'DevOps',
      articles: 167,
      discussions: 98,
      trend: -5
    }
  ];

  const tabs = [
    { id: 'feed', label: 'Feed', icon: 'Home' },
    { id: 'learning-paths', label: 'Learning Paths', icon: 'Map' },
    { id: 'expert-insights', label: 'Expert Insights', icon: 'Star' },
    { id: 'bookmarks', label: 'Bookmarks', icon: 'Bookmark' }
  ];

  const handleBookmark = (articleId) => {
    console.log('Bookmark article:', articleId);
  };

  const handleShare = (article) => {
    console.log('Share article:', article);
  };

  const handleReadArticle = (article) => {
    console.log('Read article:', article);
  };

  const handleStartLearningPath = (path) => {
    console.log('Start learning path:', path);
  };

  const handleContinueLearningPath = (path) => {
    console.log('Continue learning path:', path);
  };

  const handleFollowExpert = (expertId) => {
    console.log('Follow expert:', expertId);
  };

  const handleCommentOnInsight = (insight) => {
    console.log('Comment on insight:', insight);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'topics') {
      const currentTopics = activeFilters?.topics || [];
      const updatedTopics = currentTopics?.includes(value)
        ? currentTopics?.filter(topic => topic !== value)
        : [...currentTopics, value];
      setActiveFilters(prev => ({ ...prev, topics: updatedTopics }));
    } else {
      setActiveFilters(prev => ({ ...prev, [filterType]: value }));
    }
  };

  const handleClearFilters = () => {
    setActiveFilters({
      contentType: 'all',
      difficulty: null,
      topics: [],
      sortBy: 'recent'
    });
  };

  const handleRemoveBookmark = (bookmarkId) => {
    console.log('Remove bookmark:', bookmarkId);
  };

  const handleOpenArticle = (bookmark) => {
    console.log('Open article:', bookmark);
  };

  const handleCreateCollection = () => {
    console.log('Create new collection');
  };

  const handleTopicClick = (topic) => {
    console.log('Topic clicked:', topic);
  };

  const handleViewAllTopics = () => {
    console.log('View all topics');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {articles?.map((article) => (
              <ArticleCard
                key={article?.id}
                article={article}
                onBookmark={handleBookmark}
                onShare={handleShare}
                onRead={handleReadArticle}
              />
            ))}
          </div>
        );
      case 'learning-paths':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {learningPaths?.map((path) => (
              <LearningPathCard
                key={path?.id}
                path={path}
                onStart={handleStartLearningPath}
                onContinue={handleContinueLearningPath}
              />
            ))}
          </div>
        );
      case 'expert-insights':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {expertInsights?.map((insight) => (
              <ExpertInsightCard
                key={insight?.id}
                insight={insight}
                onRead={handleReadArticle}
                onFollow={handleFollowExpert}
                onComment={handleCommentOnInsight}
              />
            ))}
          </div>
        );
      case 'bookmarks':
        return (
          <div className="max-w-2xl mx-auto">
            <BookmarkPanel
              bookmarks={bookmarks}
              onRemoveBookmark={handleRemoveBookmark}
              onOpenArticle={handleOpenArticle}
              onCreateCollection={handleCreateCollection}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="container-custom section-padding">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="BookOpen" size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Knowledge Hub
                  </h1>
                  <p className="text-muted-foreground">
                    Discover, learn, and grow with curated content and expert insights
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                iconName="Filter"
                iconPosition="left"
                className="lg:hidden"
              >
                Filters
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
              >
                Contribute Article
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="max-w-2xl">
              <Input
                type="search"
                placeholder="Search articles, tutorials, insights, or ask a question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab?.id
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
            
            <div className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>Last updated: 2 minutes ago</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className={`xl:col-span-1 ${showFilters ? 'block' : 'hidden xl:block'}`}>
              <div className="space-y-6">
                <SearchFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
                <TrendingTopics
                  topics={trendingTopics}
                  onTopicClick={handleTopicClick}
                  onViewAll={handleViewAllTopics}
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="xl:col-span-3">
              {/* Content Stats */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Showing {articles?.length} results</span>
                  <span>•</span>
                  <span>Updated {new Date()?.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Grid3x3"
                    className="text-muted-foreground"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="List"
                    className="text-muted-foreground"
                  />
                </div>
              </div>

              {/* Content */}
              {renderContent()}

              {/* Load More */}
              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="ChevronDown"
                  iconPosition="right"
                >
                  Load More Content
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KnowledgeHub;