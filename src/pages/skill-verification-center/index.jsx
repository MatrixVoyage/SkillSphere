import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import VerificationDashboard from './components/VerificationDashboard';
import AuthenticityScore from './components/AuthenticityScore';
import ResumeAnalysis from './components/ResumeAnalysis';
import CertificateUpload from './components/CertificateUpload';
import PeerReviewSystem from './components/PeerReviewSystem';
import CompetencyTesting from './components/CompetencyTesting';
import VerificationBadges from './components/VerificationBadges';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SkillVerificationCenter = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data for verification statistics
  const verificationStats = {
    resume: { verified: 8, total: 12 },
    certificates: { verified: 5, total: 7 },
    skills: { verified: 15, total: 20 },
    peerReviews: { verified: 12, total: 15 }
  };

  // Mock data for authenticity score
  const authenticityScore = {
    score: 87,
    trustLevel: 'Community Verified',
    breakdown: [
      {
        category: 'Resume Validation',
        description: 'AI-verified work experience and education',
        score: 92,
        weight: 25,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        icon: 'FileText'
      },
      {
        category: 'Certificate Verification',
        description: 'Blockchain-verified professional certificates',
        score: 88,
        weight: 20,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        icon: 'Award'
      },
      {
        category: 'Peer Reviews',
        description: 'Community validation through project work',
        score: 85,
        weight: 30,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        icon: 'Users'
      },
      {
        category: 'Skill Testing',
        description: 'Competency assessments and code challenges',
        score: 83,
        weight: 25,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        icon: 'Code'
      }
    ]
  };

  // Mock data for resume analysis
  const resumeAnalysisData = {
    overview: {
      verified: 8,
      warnings: 3,
      errors: 1
    },
    recentResults: [
      {
        id: 1,
        section: 'Work Experience',
        message: 'Successfully verified employment at TechCorp Inc.',
        status: 'verified',
        timestamp: '2 hours ago'
      },
      {
        id: 2,
        section: 'Education',
        message: 'University degree verification pending',
        status: 'warning',
        timestamp: '1 day ago'
      },
      {
        id: 3,
        section: 'Skills',
        message: 'React.js proficiency claim needs validation',
        status: 'error',
        timestamp: '2 days ago'
      }
    ],
    inconsistencies: [
      {
        id: 1,
        title: 'Employment Date Mismatch',
        description: 'LinkedIn profile shows different employment dates for TechCorp Inc.',
        location: 'Work Experience Section',
        confidence: 85
      },
      {
        id: 2,
        title: 'Skill Level Inconsistency',
        description: 'Claimed expert level in Node.js but project history suggests intermediate level',
        location: 'Skills Section',
        confidence: 72
      }
    ],
    suggestions: [
      {
        title: 'Add Project Links',
        description: 'Include GitHub repository links to validate your technical skills',
        impact: 'High',
        priority: 'High'
      },
      {
        title: 'Update LinkedIn Profile',
        description: 'Ensure consistency between resume and LinkedIn employment dates',
        impact: 'Medium',
        priority: 'Medium'
      }
    ],
    validationResults: [
      {
        category: 'Work Experience',
        status: 'verified',
        items: [
          { claim: 'Software Engineer at TechCorp', status: 'verified', confidence: 95 },
          { claim: 'Frontend Developer at StartupXYZ', status: 'warning', confidence: 78 }
        ]
      },
      {
        category: 'Education',
        status: 'pending',
        items: [
          { claim: 'BS Computer Science - MIT', status: 'pending', confidence: 0 },
          { claim: 'AWS Certified Solutions Architect', status: 'verified', confidence: 100 }
        ]
      }
    ]
  };

  // Mock data for certificates
  const certificates = [
    {
      id: 1,
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: 'Jan 15, 2024',
      expiryDate: 'Jan 15, 2027',
      status: 'verified',
      verificationScore: 98,
      verificationDetails: {
        blockchainHash: '0x1a2b3c4d5e6f7g8h9i0j',
        verifiedDate: 'Jan 16, 2024',
        authenticity: 98
      }
    },
    {
      id: 2,
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      issueDate: 'Dec 10, 2023',
      expiryDate: 'Dec 10, 2025',
      status: 'pending',
      verificationScore: null
    },
    {
      id: 3,
      name: 'Certified Kubernetes Administrator',
      issuer: 'Cloud Native Computing Foundation',
      issueDate: 'Nov 5, 2023',
      expiryDate: 'Nov 5, 2026',
      status: 'processing',
      verificationScore: null
    }
  ];

  // Mock data for peer reviews
  const peerReviews = {
    received: [
      {
        reviewer: {
          name: 'Sarah Chen',
          title: 'Senior Full Stack Developer',
          avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
          rating: 5,
          reviewCount: 47
        },
        skill: 'React.js',
        skillLevel: 'Advanced',
        project: 'E-commerce Platform',
        rating: 5,
        comment: `Exceptional React.js skills demonstrated throughout the project. Clean code architecture, excellent component design, and strong understanding of hooks and state management. Great collaboration and communication skills.`,
        date: '2 days ago',
        ratings: {
          technical: 5,
          communication: 5,
          collaboration: 4,
          problemSolving: 5
        },
        evidence: {
          title: 'GitHub Repository - E-commerce Frontend',
          url: 'https://github.com/example/ecommerce-frontend'
        }
      },
      {
        reviewer: {
          name: 'Michael Rodriguez',
          title: 'DevOps Engineer',
          avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
          rating: 4,
          reviewCount: 23
        },
        skill: 'Docker',
        skillLevel: 'Intermediate',
        project: 'Microservices Deployment',
        rating: 4,
        comment: `Good understanding of Docker containerization. Successfully containerized multiple services and set up proper networking. Could improve on optimization and security best practices.`,
        date: '1 week ago',
        ratings: {
          technical: 4,
          communication: 4,
          collaboration: 5,
          problemSolving: 4
        }
      }
    ],
    given: [
      {
        reviewee: {
          name: 'Alex Thompson',
          title: 'Junior Developer',
          avatar: 'https://randomuser.me/api/portraits/men/28.jpg'
        },
        skill: 'JavaScript',
        skillLevel: 'Intermediate',
        project: 'Task Management App',
        rating: 4,
        comment: `Strong JavaScript fundamentals with good ES6+ knowledge. Implemented clean async/await patterns and proper error handling. Eager to learn and receptive to feedback.`,
        date: '3 days ago',
        status: 'completed'
      }
    ]
  };

  const pendingReviews = [
    {
      id: 1,
      requester: {
        name: 'Emma Wilson',
        title: 'Frontend Developer',
        avatar: 'https://randomuser.me/api/portraits/women/25.jpg'
      },
      skill: 'Vue.js',
      skillLevel: 'Advanced',
      project: 'Dashboard Application',
      message: `I'd appreciate your review of my Vue.js skills based on our recent collaboration on the dashboard project. Your feedback would be valuable for my skill verification.`,
      requestDate: '1 day ago',
      projectDetails: {
        duration: '6 weeks',role: 'Lead Frontend Developer',teamSize: '4 members'
      }
    }
  ];

  // Mock data for competency tests
  const availableTests = [
    {
      id: 1,
      title: 'React.js Mastery',
      technology: 'React',
      category: 'frontend',
      difficulty: 'Advanced',
      description: 'Comprehensive assessment of React.js skills including hooks, context, and performance optimization.',
      duration: '90 minutes',
      questionCount: 45,
      passScore: 75,
      attempts: 1247,
      rating: 4.8,
      status: 'available',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: 'Code',
      tags: ['Hooks', 'Context API', 'Performance', 'Testing']
    },
    {
      id: 2,
      title: 'Node.js Backend Development',
      technology: 'Node.js',
      category: 'backend',
      difficulty: 'Intermediate',
      description: 'Test your Node.js backend development skills with Express, databases, and API design.',
      duration: '120 minutes',
      questionCount: 60,
      passScore: 70,
      attempts: 892,
      rating: 4.6,
      status: 'available',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: 'Server',
      tags: ['Express.js', 'MongoDB', 'REST API', 'Authentication']
    },
    {
      id: 3,
      title: 'Python Data Science',
      technology: 'Python',
      category: 'data',
      difficulty: 'Expert',
      description: 'Advanced data science assessment covering machine learning, data analysis, and visualization.',
      duration: '150 minutes',
      questionCount: 75,
      passScore: 80,
      attempts: 456,
      rating: 4.9,
      status: 'available',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: 'BarChart3',
      tags: ['Pandas', 'Scikit-learn', 'Matplotlib', 'NumPy']
    }
  ];

  const completedTests = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      technology: 'JavaScript',
      score: 92,
      rank: '95th',
      completedDate: 'Jan 15, 2024',
      actualDuration: '75 minutes',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: 'Code'
    },
    {
      id: 2,
      title: 'CSS Advanced Layouts',
      technology: 'CSS',
      score: 88,
      rank: '87th',
      completedDate: 'Jan 10, 2024',
      actualDuration: '60 minutes',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: 'Palette'
    }
  ];

  // Mock data for verification badges
  const badges = [
    {
      id: 1,
      title: 'React Expert',
      category: 'technical',
      description: 'Demonstrated mastery of React.js through projects and peer validation',
      requirements: [
        'Complete React.js competency test with 90%+ score',
        'Receive 5+ peer reviews for React projects',
        'Contribute to 3+ React open source projects'
      ],
      earnedBy: 234,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: 'Code',
      appealable: true
    },
    {
      id: 2,
      title: 'Team Collaborator',
      category: 'collaboration',
      description: 'Excellent collaboration skills validated by team members',
      requirements: [
        'Receive 10+ positive peer reviews',
        'Lead 2+ successful team projects',
        'Maintain 4.5+ collaboration rating'
      ],
      earnedBy: 567,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      icon: 'Users',
      progress: 75,
      appealable: false
    },
    {
      id: 3,
      title: 'Problem Solver',
      category: 'achievement',
      description: 'Consistently solves complex technical challenges',
      requirements: [
        'Complete 5+ advanced coding challenges',
        'Receive recognition for innovative solutions',
        'Help resolve 10+ community issues'
      ],
      earnedBy: 189,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: 'Lightbulb',
      appealable: true
    }
  ];

  const earnedBadges = [
    {
      badgeId: 1,
      earnedDate: 'Jan 20, 2024',
      trustLevel: 'Community Verified'
    }
  ];

  const navigationSections = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { id: 'authenticity', label: 'Authenticity Score', icon: 'Shield' },
    { id: 'resume', label: 'Resume Analysis', icon: 'FileText' },
    { id: 'certificates', label: 'Certificates', icon: 'Award' },
    { id: 'peer-reviews', label: 'Peer Reviews', icon: 'Users' },
    { id: 'testing', label: 'Competency Testing', icon: 'Code' },
    { id: 'badges', label: 'Verification Badges', icon: 'Star' }
  ];

  const handleStartVerification = () => {
    setActiveSection('resume');
  };

  const handleUploadResume = (file) => {
    console.log('Uploading resume:', file);
    // Handle resume upload logic
  };

  const handleFixIssue = (issueId) => {
    console.log('Fixing issue:', issueId);
    // Handle issue fixing logic
  };

  const handleUploadCertificate = (file) => {
    console.log('Uploading certificate:', file);
    // Handle certificate upload logic
  };

  const handleVerifyCertificate = (certId) => {
    console.log('Verifying certificate:', certId);
    // Handle certificate verification logic
  };

  const handleRequestReview = () => {
    console.log('Requesting peer review');
    // Handle review request logic
  };

  const handleSubmitReview = (requestId, action) => {
    console.log('Submitting review:', requestId, action);
    // Handle review submission logic
  };

  const handleStartTest = (testId) => {
    console.log('Starting test:', testId);
    // Handle test start logic
  };

  const handleViewResults = (testId) => {
    console.log('Viewing test results:', testId);
    // Handle view results logic
  };

  const handleViewCriteria = (badgeId) => {
    console.log('Viewing badge criteria:', badgeId);
    // Handle view criteria logic
  };

  const handleAppealDecision = (badgeId) => {
    console.log('Appealing badge decision:', badgeId);
    // Handle appeal logic
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <VerificationDashboard
            verificationStats={verificationStats}
            onStartVerification={handleStartVerification}
          />
        );
      case 'authenticity':
        return (
          <AuthenticityScore
            score={authenticityScore?.score}
            breakdown={authenticityScore?.breakdown}
            trustLevel={authenticityScore?.trustLevel}
          />
        );
      case 'resume':
        return (
          <ResumeAnalysis
            analysisData={resumeAnalysisData}
            onUploadResume={handleUploadResume}
            onFixIssue={handleFixIssue}
          />
        );
      case 'certificates':
        return (
          <CertificateUpload
            certificates={certificates}
            onUploadCertificate={handleUploadCertificate}
            onVerifyCertificate={handleVerifyCertificate}
          />
        );
      case 'peer-reviews':
        return (
          <PeerReviewSystem
            reviews={peerReviews}
            pendingReviews={pendingReviews}
            onRequestReview={handleRequestReview}
            onSubmitReview={handleSubmitReview}
          />
        );
      case 'testing':
        return (
          <CompetencyTesting
            availableTests={availableTests}
            completedTests={completedTests}
            onStartTest={handleStartTest}
            onViewResults={handleViewResults}
          />
        );
      case 'badges':
        return (
          <VerificationBadges
            badges={badges}
            earnedBadges={earnedBadges}
            onViewCriteria={handleViewCriteria}
            onAppealDecision={handleAppealDecision}
          />
        );
      default:
        return (
          <VerificationDashboard
            verificationStats={verificationStats}
            onStartVerification={handleStartVerification}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Skill Verification Center</h1>
                <p className="text-gray-600 mt-2">
                  Establish credibility through AI-powered validation and community verification
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>Verification Active</span>
                </div>
                <Button variant="outline" iconName="HelpCircle">
                  Help
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {navigationSections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => setActiveSection(section?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section?.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon name={section?.icon} size={16} />
                  <span>{section?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Section Content */}
          <div className="space-y-6">
            {renderActiveSection()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkillVerificationCenter;