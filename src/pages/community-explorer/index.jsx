import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import FeaturedCommunities from './components/FeaturedCommunities';
import SortOptions from './components/SortOptions';
import CommunityGrid from './components/CommunityGrid';

const CommunityExplorer = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('compatibility');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);

  // Mock data for communities
  const mockCommunities = [
    {
      id: 1,
      name: "React 18 Migration Masters",
      description: "Join fellow developers in migrating legacy React applications to React 18. Learn about concurrent features, automatic batching, and new hooks while working on real-world projects.",
      category: "Frontend",
      difficulty: "Intermediate",
      techStack: ["React", "TypeScript", "Vite", "Testing Library"],
      memberCount: 127,
      maxMembers: 150,
      progress: 68,
      timeCommitment: "10-15 hours/week",
      mentorshipAvailable: true,
      isOpenSource: true,
      isCareerFocused: true,
      compatibilityScore: 94,
      isNew: false,
      isTrending: true,
      members: [
        { name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
        { name: "Mike Rodriguez", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
        { name: "Emily Johnson", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
        { name: "David Kim", avatar: "https://randomuser.me/api/portraits/men/4.jpg" }
      ],
      objectives: [
        "Migrate 3 production apps to React 18",
        "Master concurrent rendering patterns",
        "Implement Suspense boundaries effectively"
      ],
      skillOutcomes: ["React 18 Expertise", "Performance Optimization", "Modern React Patterns"],
      testimonial: {
        content: "This community helped me land a senior React role at a Fortune 500 company!",
        author: {
          name: "Alex Thompson",
          avatar: "https://randomuser.me/api/portraits/men/5.jpg"
        }
      }
    },
    {
      id: 2,
      name: "AI/ML Career Accelerator",
      description: "Transform your career with hands-on machine learning projects. Build a portfolio of ML applications while learning from industry experts and collaborating with peers.",
      category: "AI/ML",
      difficulty: "Beginner",
      techStack: ["Python", "TensorFlow", "PyTorch", "Jupyter", "Docker"],
      memberCount: 89,
      maxMembers: 100,
      progress: 45,
      timeCommitment: "15-20 hours/week",
      mentorshipAvailable: true,
      isOpenSource: false,
      isCareerFocused: true,
      compatibilityScore: 87,
      isNew: true,
      isTrending: true,
      members: [
        { name: "Dr. Lisa Wang", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
        { name: "Carlos Martinez", avatar: "https://randomuser.me/api/portraits/men/7.jpg" },
        { name: "Priya Patel", avatar: "https://randomuser.me/api/portraits/women/8.jpg" },
        { name: "James Wilson", avatar: "https://randomuser.me/api/portraits/men/9.jpg" }
      ],
      objectives: [
        "Build 5 ML projects from scratch",
        "Deploy models to production",
        "Create a professional ML portfolio"
      ],
      skillOutcomes: ["Machine Learning", "Deep Learning", "MLOps", "Data Science"],
      testimonial: {
        content: "The mentorship here is incredible. I went from zero ML knowledge to getting hired as a Data Scientist!",
        author: {
          name: "Maria Garcia",
          avatar: "https://randomuser.me/api/portraits/women/10.jpg"
        }
      }
    },
    {
      id: 3,
      name: "Open Source Contribution Hub",
      description: "Make your first meaningful contributions to major open source projects. Get guidance from maintainers and build your GitHub profile with impactful contributions.",
      category: "Backend",
      difficulty: "Beginner",
      techStack: ["JavaScript", "Python", "Go", "Rust", "Git"],
      memberCount: 156,
      maxMembers: 200,
      progress: 72,
      timeCommitment: "5-10 hours/week",
      mentorshipAvailable: true,
      isOpenSource: true,
      isCareerFocused: false,
      compatibilityScore: 91,
      isNew: false,
      isTrending: false,
      members: [
        { name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
        { name: "Jane Smith", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
        { name: "Bob Johnson", avatar: "https://randomuser.me/api/portraits/men/13.jpg" },
        { name: "Alice Brown", avatar: "https://randomuser.me/api/portraits/women/14.jpg" }
      ],
      objectives: [
        "Make 10+ meaningful OSS contributions",
        "Get PRs merged in popular repositories",
        "Build relationships with maintainers"
      ],
      skillOutcomes: ["Open Source", "Git Workflow", "Code Review", "Community Building"]
    },
    {
      id: 4,
      name: "Mobile-First PWA Workshop",
      description: "Create progressive web applications that work seamlessly across all devices. Learn modern PWA techniques, service workers, and mobile optimization strategies.",
      category: "Mobile",
      difficulty: "Intermediate",
      techStack: ["React", "Service Workers", "IndexedDB", "Web APIs"],
      memberCount: 73,
      maxMembers: 80,
      progress: 38,
      timeCommitment: "8-12 hours/week",
      mentorshipAvailable: false,
      isOpenSource: true,
      isCareerFocused: true,
      compatibilityScore: 82,
      isNew: true,
      isTrending: false,
      members: [
        { name: "Tom Wilson", avatar: "https://randomuser.me/api/portraits/men/15.jpg" },
        { name: "Sarah Davis", avatar: "https://randomuser.me/api/portraits/women/16.jpg" },
        { name: "Mike Chen", avatar: "https://randomuser.me/api/portraits/men/17.jpg" },
        { name: "Lisa Anderson", avatar: "https://randomuser.me/api/portraits/women/18.jpg" }
      ],
      objectives: [
        "Build 3 production-ready PWAs",
        "Master offline-first architecture",
        "Implement push notifications"
      ],
      skillOutcomes: ["PWA Development", "Mobile Optimization", "Service Workers", "Web APIs"]
    },
    {
      id: 5,
      name: "DevOps Automation Bootcamp",
      description: "Master modern DevOps practices through hands-on projects. Set up CI/CD pipelines, manage infrastructure as code, and learn container orchestration.",
      category: "DevOps",
      difficulty: "Advanced",
      techStack: ["Docker", "Kubernetes", "AWS", "Terraform", "Jenkins"],
      memberCount: 45,
      maxMembers: 50,
      progress: 85,
      timeCommitment: "20+ hours/week",
      mentorshipAvailable: true,
      isOpenSource: false,
      isCareerFocused: true,
      compatibilityScore: 76,
      isNew: false,
      isTrending: true,
      members: [
        { name: "Alex Kumar", avatar: "https://randomuser.me/api/portraits/men/19.jpg" },
        { name: "Rachel Green", avatar: "https://randomuser.me/api/portraits/women/20.jpg" },
        { name: "Chris Taylor", avatar: "https://randomuser.me/api/portraits/men/21.jpg" },
        { name: "Nina Patel", avatar: "https://randomuser.me/api/portraits/women/22.jpg" }
      ],
      objectives: [
        "Deploy scalable microservices",
        "Automate infrastructure provisioning",
        "Implement monitoring and logging"
      ],
      skillOutcomes: ["DevOps", "Cloud Architecture", "Container Orchestration", "Infrastructure as Code"]
    },
    {
      id: 6,
      name: "Blockchain DApp Development",
      description: "Build decentralized applications on Ethereum and other blockchains. Learn smart contract development, Web3 integration, and DeFi protocols.",
      category: "Blockchain",
      difficulty: "Advanced",
      techStack: ["Solidity", "Web3.js", "React", "Hardhat", "IPFS"],
      memberCount: 62,
      maxMembers: 75,
      progress: 52,
      timeCommitment: "15-20 hours/week",
      mentorshipAvailable: true,
      isOpenSource: true,
      isCareerFocused: true,
      compatibilityScore: 69,
      isNew: false,
      isTrending: false,
      members: [
        { name: "Satoshi Nakamoto", avatar: "https://randomuser.me/api/portraits/men/23.jpg" },
        { name: "Vitalik Buterin", avatar: "https://randomuser.me/api/portraits/men/24.jpg" },
        { name: "Gavin Wood", avatar: "https://randomuser.me/api/portraits/men/25.jpg" },
        { name: "Changpeng Zhao", avatar: "https://randomuser.me/api/portraits/men/26.jpg" }
      ],
      objectives: [
        "Deploy 3 smart contracts to mainnet",
        "Build a full-stack DApp",
        "Understand DeFi protocols"
      ],
      skillOutcomes: ["Blockchain Development", "Smart Contracts", "Web3", "DeFi"]
    }
  ];

  // Featured communities (subset of all communities)
  const featuredCommunities = mockCommunities?.filter(c => c?.isTrending || c?.isNew)?.slice(0, 3);

  // Filter and sort communities
  const filteredAndSortedCommunities = useMemo(() => {
    let filtered = mockCommunities?.filter(community => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery?.toLowerCase();
        const matchesSearch = 
          community?.name?.toLowerCase()?.includes(query) ||
          community?.description?.toLowerCase()?.includes(query) ||
          community?.category?.toLowerCase()?.includes(query) ||
          community?.techStack?.some(tech => tech?.toLowerCase()?.includes(query));
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters?.categories && filters?.categories?.length > 0) {
        if (!filters?.categories?.includes(community?.category)) return false;
      }

      // Difficulty filter
      if (filters?.difficulties && filters?.difficulties?.length > 0) {
        if (!filters?.difficulties?.includes(community?.difficulty)) return false;
      }

      // Tech stack filter
      if (filters?.techStack && filters?.techStack?.length > 0) {
        const hasMatchingTech = filters?.techStack?.some(tech => 
          community?.techStack?.includes(tech)
        );
        if (!hasMatchingTech) return false;
      }

      // Quick filters
      if (filters?.beginnerFriendly && community?.difficulty !== 'Beginner') return false;
      if (filters?.mentorshipAvailable && !community?.mentorshipAvailable) return false;
      if (filters?.openSource && !community?.isOpenSource) return false;
      if (filters?.careerFocused && !community?.isCareerFocused) return false;
      if (filters?.newCommunities && !community?.isNew) return false;
      if (filters?.trending && !community?.isTrending) return false;

      // Compatibility score filter
      if (filters?.minCompatibility && community?.compatibilityScore < filters?.minCompatibility) return false;

      // Member count filters
      if (filters?.minMembers && community?.memberCount < parseInt(filters?.minMembers)) return false;
      if (filters?.maxMembers && community?.memberCount > parseInt(filters?.maxMembers)) return false;

      return true;
    });

    // Sort communities
    filtered?.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'compatibility':
          comparison = a?.compatibilityScore - b?.compatibilityScore;
          break;
        case 'trending':
          comparison = (b?.isTrending ? 1 : 0) - (a?.isTrending ? 1 : 0);
          break;
        case 'newest':
          comparison = (b?.isNew ? 1 : 0) - (a?.isNew ? 1 : 0);
          break;
        case 'members':
          comparison = a?.memberCount - b?.memberCount;
          break;
        case 'progress':
          comparison = a?.progress - b?.progress;
          break;
        case 'alphabetical':
          comparison = a?.name?.localeCompare(b?.name);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [searchQuery, filters, sortBy, sortOrder]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => setLoading(false), 500);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleJoinCommunity = (communityId) => {
    console.log('Joining community:', communityId);
    // Handle join logic here
  };

  const handleViewDetails = (communityId) => {
    console.log('Viewing community details:', communityId);
    // Handle view details logic here
  };

  // Mock suggestions based on search query
  const searchSuggestions = searchQuery ? [
    `${searchQuery} for beginners`,
    `${searchQuery} with mentorship`,
    `${searchQuery} open source projects`
  ] : [];

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
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Icon name="Compass" size={16} />
              Discover Communities
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Find Your Perfect
              <span className="text-gradient"> Developer Community</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join goal-based communities where developers collaborate on real projects, 
              build meaningful relationships, and advance their careers through shared accomplishments.
            </p>
            
            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              onSuggestionSelect={handleSuggestionSelect}
              suggestions={searchSuggestions}
            />
          </div>

          {/* Featured Communities */}
          <FeaturedCommunities
            communities={featuredCommunities}
            onJoin={handleJoinCommunity}
            onViewDetails={handleViewDetails}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isOpen={filterPanelOpen}
                onToggle={() => setFilterPanelOpen(!filterPanelOpen)}
                resultCount={filteredAndSortedCommunities?.length}
              />
            </div>

            {/* Communities Grid */}
            <div className="lg:col-span-3">
              {/* Sort and View Options */}
              <SortOptions
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {searchQuery ? `Results for "${searchQuery}"` : 'All Communities'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {filteredAndSortedCommunities?.length} communities found
                  </p>
                </div>
                
                {/* Quick Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Bookmark"
                    className="hidden sm:flex"
                  >
                    Save Search
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Bell"
                    className="hidden sm:flex"
                  >
                    Get Alerts
                  </Button>
                </div>
              </div>

              {/* Communities Grid */}
              <CommunityGrid
                communities={filteredAndSortedCommunities}
                viewMode={viewMode}
                onJoin={handleJoinCommunity}
                onViewDetails={handleViewDetails}
                loading={loading}
              />

              {/* Load More */}
              {filteredAndSortedCommunities?.length > 0 && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="ChevronDown"
                    iconPosition="right"
                  >
                    Load More Communities
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/10">
            <Icon name="Users" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Create your own community and bring together developers who share your vision. 
              SkillSphere provides all the tools you need to build and manage a thriving developer community.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Plus"
                iconPosition="left"
              >
                Create Community
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
              >
                Request Community
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityExplorer;