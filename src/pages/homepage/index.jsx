import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import LiveActivityFeed from './components/LiveActivityFeed';
import HowItWorksSection from './components/HowItWorksSection';
import TrendingProjectsCarousel from './components/TrendingProjectsCarousel';
import SocialProofSection from './components/SocialProofSection';
import Footer from './components/Footer';

const Homepage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'SkillSphere - Where Skills Meet Community, Growth Meets Authenticity';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'Join the next-generation platform where developers collaborate on real projects, validate achievements through AI-powered verification, and build meaningful professional relationships.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Join the next-generation platform where developers collaborate on real projects, validate achievements through AI-powered verification, and build meaningful professional relationships.';
      document.getElementsByTagName('head')?.[0]?.appendChild(meta);
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-brand-canvas text-brand-text-primary"
    >
      {/* Hero Section */}
      <HeroSection />
      {/* Live Activity Feed */}
      <LiveActivityFeed />
      {/* How It Works Section */}
      <HowItWorksSection />
      {/* Trending Projects Carousel */}
      <TrendingProjectsCarousel />
      {/* Social Proof Section */}
      <SocialProofSection />
      {/* Footer */}
      <Footer />
      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-brand-accent hover:bg-brand-accent/90 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-200"
        style={{ display: 'none' }}
        onScroll={() => {
          const button = document.querySelector('.scroll-to-top');
          if (button) {
            button.style.display = window.scrollY > 500 ? 'flex' : 'none';
          }
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 14L12 9L17 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(64, 224, 208, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(64, 224, 208, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              animation: 'grid-move 20s linear infinite'
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-brand-secondary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }

        .scroll-to-top {
          display: none !important;
        }

        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(30, 30, 46, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(64, 224, 208, 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(64, 224, 208, 0.5);
        }
      `}</style>
    </motion.div>
  );
};

export default Homepage;