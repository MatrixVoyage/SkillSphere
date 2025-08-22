import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ProfileHeader from './components/ProfileHeader';
import VerifiedResume from './components/VerifiedResume';
import ProjectPortfolio from './components/ProjectPortfolio';
import SkillsMatrix from './components/SkillsMatrix';
import EndorsementsSection from './components/EndorsementsSection';
import CollaborationHistory from './components/CollaborationHistory';
import PrivacyControls from './components/PrivacyControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProfileShowcase = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [editMode, setEditMode] = useState(false);

  // Mock profile data
  const profileData = {
    name: "Hemant Gaurav",
    title: "Senior Full-Stack Developer & AI Enthusiast",
    location: "San Francisco, CA",
    joinedDate: "March 2022",
    lastActive: "2 hours ago",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    currentActivity: "Working on React Native app optimization",
    stats: {
      projects: 47,
      followers: 1247,
      following: 892,
      contributions: 2847
    }
  };

  const resumeData = {
    experience: [
      {
        position: "Senior Full-Stack Developer",
        company: "TechFlow Solutions",
        duration: "Jan 2023 - Present",
        description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and driving technical architecture decisions.",
        technologies: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "Docker"],
        achievements: [
          "Improved application performance by 40% through code optimization",
          "Led migration to microservices architecture serving 100K+ users",
          "Mentored 8 junior developers with 95% retention rate"
        ],
        aiVerified: true,
        peerConfirmed: true
      },
      {
        position: "Full-Stack Developer",
        company: "StartupLab Inc",
        duration: "Jun 2021 - Dec 2022",
        description: "Developed and maintained multiple client projects using modern web technologies. Collaborated with cross-functional teams to deliver high-quality solutions.",
        technologies: ["Vue.js", "Python", "PostgreSQL", "Redis", "Kubernetes"],
        achievements: [
          "Built 12 successful client applications from scratch",
          "Reduced deployment time by 60% with CI/CD implementation",
          "Achieved 99.9% uptime across all production systems"
        ],
        aiVerified: true,
        peerConfirmed: false
      }
    ],
    education: [
      {
        degree: "Master of Science in Computer Science",
        institution: "Stanford University",
        year: "2019-2021",
        gpa: "3.8/4.0",
        honors: "Magna Cum Laude",
        verified: true
      },
      {
        degree: "Bachelor of Science in Software Engineering",
        institution: "UC Berkeley",
        year: "2015-2019",
        gpa: "3.6/4.0",
        verified: true
      }
    ],
    certifications: [
      {
        name: "AWS Solutions Architect Professional",
        issuer: "Amazon Web Services",
        issueDate: "March 2023",
        expiryDate: "March 2026",
        description: "Advanced certification demonstrating expertise in designing distributed applications and systems on AWS platform.",
        blockchainVerified: true
      },
      {
        name: "Google Cloud Professional Developer",
        issuer: "Google Cloud",
        issueDate: "January 2023",
        expiryDate: "January 2025",
        description: "Professional-level certification for developing scalable applications on Google Cloud Platform.",
        blockchainVerified: true
      }
    ]
  };

  const projectsData = [
    {
      title: "EcoTrack - Sustainability Platform",
      description: "A comprehensive platform for tracking and reducing carbon footprint with AI-powered recommendations.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      category: "web",
      status: "completed",
      impact: "Reduced CO2 by 15% for 10K+ users",
      rating: 4.8,
      technologies: ["React", "Node.js", "TensorFlow", "MongoDB", "AWS"],
      teamMembers: [
        { name: "Alex Johnson", avatar: "https://randomuser.me/api/portraits/men/32.jpg", role: "Backend Developer" },
        { name: "Maria Garcia", avatar: "https://randomuser.me/api/portraits/women/44.jpg", role: "UI/UX Designer" },
        { name: "David Kim", avatar: "https://randomuser.me/api/portraits/men/56.jpg", role: "Data Scientist" }
      ],
      commits: 247,
      duration: "6 months",
      verified: true,
      featured: true
    },
    {
      title: "HealthConnect Mobile App",
      description: "Cross-platform mobile application connecting patients with healthcare providers through secure messaging and appointment scheduling.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      category: "mobile",
      status: "in-progress",
      impact: "Serving 25K+ patients",
      rating: 4.6,
      technologies: ["React Native", "Firebase", "Node.js", "PostgreSQL"],
      teamMembers: [
        { name: "Jennifer Lee", avatar: "https://randomuser.me/api/portraits/women/68.jpg", role: "Mobile Developer" },
        { name: "Robert Chen", avatar: "https://randomuser.me/api/portraits/men/78.jpg", role: "Backend Developer" }
      ],
      commits: 189,
      duration: "4 months",
      verified: true,
      featured: false
    },
    {
      title: "AI Code Review Assistant",
      description: "Machine learning model that automatically reviews code for best practices, security vulnerabilities, and performance optimizations.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
      category: "ai",
      status: "completed",
      impact: "Improved code quality by 35%",
      rating: 4.9,
      technologies: ["Python", "TensorFlow", "Docker", "Kubernetes", "FastAPI"],
      teamMembers: [
        { name: "Dr. Emily Watson", avatar: "https://randomuser.me/api/portraits/women/32.jpg", role: "ML Engineer" },
        { name: "Michael Brown", avatar: "https://randomuser.me/api/portraits/men/45.jpg", role: "DevOps Engineer" }
      ],
      commits: 156,
      duration: "8 months",
      verified: true,
      featured: true
    }
  ];

  const skillsData = {
    totalSkills: 24,
    expertLevel: 8,
    verified: 18,
    endorsements: 156,
    skills: [
      {
        name: "React",
        category: "frontend",
        selfAssessed: 95,
        peerValidated: 92,
        peerEndorsements: 23,
        recentProjects: ["EcoTrack Platform", "HealthConnect App"],
        verified: true,
        trending: true,
        icon: "Code"
      },
      {
        name: "Node.js",
        category: "backend",
        selfAssessed: 90,
        peerValidated: 88,
        peerEndorsements: 19,
        recentProjects: ["EcoTrack API", "Microservices Architecture"],
        verified: true,
        trending: false,
        icon: "Server"
      },
      {
        name: "Python",
        category: "backend",
        selfAssessed: 85,
        peerValidated: 87,
        peerEndorsements: 15,
        recentProjects: ["AI Code Review", "Data Pipeline"],
        verified: true,
        trending: true,
        icon: "Code"
      },
      {
        name: "AWS",
        category: "devops",
        selfAssessed: 88,
        peerValidated: 85,
        peerEndorsements: 12,
        recentProjects: ["Cloud Migration", "Serverless Architecture"],
        verified: true,
        trending: false,
        icon: "Cloud"
      },
      {
        name: "Machine Learning",
        category: "ai",
        selfAssessed: 78,
        peerValidated: 82,
        peerEndorsements: 18,
        recentProjects: ["AI Code Review", "Recommendation Engine"],
        verified: true,
        trending: true,
        icon: "Brain"
      },
      {
        name: "React Native",
        category: "mobile",
        selfAssessed: 82,
        peerValidated: 79,
        peerEndorsements: 11,
        recentProjects: ["HealthConnect App", "Mobile Optimization"],
        verified: false,
        trending: false,
        icon: "Smartphone"
      }
    ]
  };

  const endorsementsData = [
    {
      endorser: {
        name: "Alex Johnson",
        title: "Senior Backend Developer",
        company: "TechFlow Solutions",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      content: "Sarah is an exceptional developer who consistently delivers high-quality code. Her expertise in React and Node.js helped our team build a scalable platform that now serves over 100K users. She's also an excellent mentor who helped me level up my skills significantly.",
      date: "2 weeks ago",
      skillsEndorsed: ["React", "Node.js", "Mentorship", "System Architecture"],
      projectBased: true,
      projectContext: {
        description: "EcoTrack Sustainability Platform",
        duration: "6 months",
        role: "Tech Lead"
      },
      verified: true,
      isRecent: true,
      helpfulCount: 12
    },
    {
      endorser: {
        name: "Dr. Emily Watson",
        title: "ML Engineering Manager",
        company: "AI Research Labs",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      content: "Working with Sarah on the AI Code Review project was a fantastic experience. Her ability to bridge the gap between traditional software development and machine learning is remarkable. She quickly grasped complex ML concepts and implemented them efficiently.",
      date: "1 month ago",
      skillsEndorsed: ["Python", "Machine Learning", "Problem Solving", "Cross-functional Collaboration"],
      projectBased: true,
      projectContext: {
        description: "AI Code Review Assistant",
        duration: "8 months",
        role: "Full-Stack Developer"
      },
      verified: true,
      isRecent: true,
      helpfulCount: 8
    },
    {
      endorser: {
        name: "Maria Garcia",
        title: "UI/UX Designer",
        company: "Design Studio Pro",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      content: "Sarah has an incredible eye for user experience despite being primarily a backend developer. She always considers the end-user impact of technical decisions and provides valuable input on frontend implementations. Her collaborative approach made our project a huge success.",
      date: "3 months ago",
      skillsEndorsed: ["User Experience", "Frontend Development", "Collaboration", "Technical Leadership"],
      projectBased: true,
      projectContext: {
        description: "EcoTrack User Interface Redesign",
        duration: "4 months",
        role: "Technical Consultant"
      },
      verified: true,
      isRecent: false,
      helpfulCount: 15
    }
  ];

  const collaborationData = {
    stats: {
      total: 47,
      activeProjects: 8,
      mentorship: 12,
      communities: 6
    },
    history: [
      {
        title: "EcoTrack Sustainability Platform",
        description: "Led development of a comprehensive carbon footprint tracking platform with AI-powered recommendations",
        type: "projects",
        duration: "Jan 2024 - Jun 2024",
        collaborators: [
          { name: "Alex Johnson", avatar: "https://randomuser.me/api/portraits/men/32.jpg", role: "Backend Developer" },
          { name: "Maria Garcia", avatar: "https://randomuser.me/api/portraits/women/44.jpg", role: "UI/UX Designer" },
          { name: "David Kim", avatar: "https://randomuser.me/api/portraits/men/56.jpg", role: "Data Scientist" }
        ],
        technologies: ["React", "Node.js", "TensorFlow", "MongoDB", "AWS"],
        impact: "Reduced CO2 emissions by 15% for 10,000+ users, featured in TechCrunch",
        outcome: "Successfully launched",
        verified: true,
        featured: true,
        views: 1247,
        timeframe: "recent"
      },
      {
        title: "Junior Developer Mentorship Program",
        description: "Mentored 8 junior developers through structured learning paths and hands-on project experience",
        type: "mentorship",
        duration: "Sep 2023 - Present",
        collaborators: [
          { name: "Jessica Park", avatar: "https://randomuser.me/api/portraits/women/28.jpg", role: "Junior Developer" },
          { name: "Ryan Martinez", avatar: "https://randomuser.me/api/portraits/men/41.jpg", role: "Junior Developer" },
          { name: "Priya Patel", avatar: "https://randomuser.me/api/portraits/women/52.jpg", role: "Junior Developer" }
        ],
        impact: "95% mentee retention rate, 6 promotions achieved, average skill improvement of 40%",
        outcome: "Ongoing program",
        verified: true,
        featured: false,
        views: 892,
        timeframe: "recent"
      },
      {
        title: "Open Source React Component Library",
        description: "Contributed to and maintained a popular React component library used by 50K+ developers",
        type: "opensource",
        duration: "Mar 2023 - Dec 2023",
        collaborators: [
          { name: "Open Source Community", avatar: "https://randomuser.me/api/portraits/men/67.jpg", role: "Maintainer" },
          { name: "Global Contributors", avatar: "https://randomuser.me/api/portraits/women/73.jpg", role: "Contributors" }
        ],
        technologies: ["React", "TypeScript", "Storybook", "Jest", "GitHub Actions"],
        impact: "500+ GitHub stars, 50K+ weekly downloads, 200+ community contributions",
        outcome: "Active maintenance",
        verified: true,
        featured: true,
        views: 2156,
        timeframe: "year"
      },
      {
        title: "AI/ML Developer Community Leadership",
        description: "Co-founded and led a local AI/ML developer community with monthly meetups and workshops",
        type: "community",
        duration: "Jan 2023 - Present",
        collaborators: [
          { name: "Dr. Michael Chen", avatar: "https://randomuser.me/api/portraits/men/89.jpg", role: "Co-founder" },
          { name: "Lisa Wang", avatar: "https://randomuser.me/api/portraits/women/91.jpg", role: "Event Coordinator" }
        ],
        impact: "Grew community from 50 to 800+ members, hosted 24 events, 15 speaker sessions",
        outcome: "Active community",
        verified: true,
        featured: false,
        views: 634,
        timeframe: "year"
      }
    ]
  };

  const [privacySettings, setPrivacySettings] = useState({
    profile: {
      basicInfo: 'public',
      contactInfo: 'network',
      experience: 'public',
      skills: 'public',
      projects: 'public'
    },
    activity: {
      activityStatus: 'network',
      collaborationHistory: 'public',
      communityActivity: 'public'
    },
    notifications: {
      profileViews: true,
      endorsements: true,
      collaborationRequests: true,
      skillVerifications: true,
      directMessages: true,
      recruiterMessages: true,
      weeklyDigest: false
    },
    data: {
      analytics: true,
      recommendations: true,
      thirdPartyIntegrations: false
    }
  });

  const sections = [
    { key: 'overview', label: 'Overview', icon: 'User' },
    { key: 'resume', label: 'Resume', icon: 'FileText' },
    { key: 'projects', label: 'Projects', icon: 'FolderOpen' },
    { key: 'skills', label: 'Skills', icon: 'Zap' },
    { key: 'endorsements', label: 'Endorsements', icon: 'MessageSquare' },
    { key: 'collaboration', label: 'Collaboration', icon: 'GitBranch' },
    { key: 'privacy', label: 'Privacy', icon: 'Shield' },
  ];

  const handleEditProfile = () => {
    setEditMode(!editMode);
  };

  const handleUpdatePrivacySettings = (newSettings) => {
    setPrivacySettings(newSettings);
  };

  useEffect(() => {
    document.title = `${profileData?.name} - Profile Showcase | SkillSphere`;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} pt-16`}>
        <div className="container-custom py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Profile Showcase</h1>
              <p className="text-muted-foreground mt-2">
                Your comprehensive professional identity with verified achievements
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Share"
                iconPosition="left"
              >
                Share Profile
              </Button>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
              >
                Export PDF
              </Button>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 p-4 bg-card rounded-lg border border-border">
            {sections?.map((section) => (
              <Button
                key={section?.key}
                variant={activeSection === section?.key ? "default" : "ghost"}
                size="sm"
                iconName={section?.icon}
                iconPosition="left"
                onClick={() => setActiveSection(section?.key)}
              >
                {section?.label}
              </Button>
            ))}
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Overview Section */}
            {activeSection === 'overview' && (
              <div className="space-y-8">
                <ProfileHeader 
                  profile={profileData} 
                  onEditProfile={handleEditProfile}
                />
                
                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Award" size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">98%</p>
                        <p className="text-sm text-muted-foreground">Profile Verified</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Icon name="TrendingUp" size={24} className="text-secondary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">2.8K</p>
                        <p className="text-sm text-muted-foreground">Profile Views</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon name="Users" size={24} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">156</p>
                        <p className="text-sm text-muted-foreground">Endorsements</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                        <Icon name="GitBranch" size={24} className="text-warning" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">47</p>
                        <p className="text-sm text-muted-foreground">Collaborations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Resume Section */}
            {activeSection === 'resume' && (
              <VerifiedResume resumeData={resumeData} />
            )}

            {/* Projects Section */}
            {activeSection === 'projects' && (
              <ProjectPortfolio projects={projectsData} />
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <SkillsMatrix skillsData={skillsData} />
            )}

            {/* Endorsements Section */}
            {activeSection === 'endorsements' && (
              <EndorsementsSection endorsements={endorsementsData} />
            )}

            {/* Collaboration Section */}
            {activeSection === 'collaboration' && (
              <CollaborationHistory collaborationData={collaborationData} />
            )}

            {/* Privacy Section */}
            {activeSection === 'privacy' && (
              <PrivacyControls 
                privacySettings={privacySettings}
                onUpdateSettings={handleUpdatePrivacySettings}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileShowcase;