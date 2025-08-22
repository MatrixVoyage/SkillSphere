import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Communities', href: '/community-explorer' },
        { name: 'Projects', href: '/project-workspace' },
        { name: 'Knowledge Hub', href: '/knowledge-hub' },
        { name: 'Skill Verification', href: '/skill-verification-center' }
      ]
    },
    {
      title: 'Features',
      links: [
        { name: 'AI-Powered Matching', href: '/community-explorer' },
        { name: 'Real-time Collaboration', href: '/project-workspace' },
        { name: 'Verified Certificates', href: '/skill-verification-center' },
        { name: 'Mentorship Program', href: '/community-explorer' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/knowledge-hub' },
        { name: 'API Reference', href: '/knowledge-hub' },
        { name: 'Community Guidelines', href: '/knowledge-hub' },
        { name: 'Success Stories', href: '/homepage' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/homepage' },
        { name: 'Careers', href: '/homepage' },
        { name: 'Privacy Policy', href: '/homepage' },
        { name: 'Terms of Service', href: '/homepage' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: 'Github', href: 'https://github.com' },
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: 'Linkedin', href: 'https://linkedin.com' },
    { name: 'Discord', icon: 'MessageCircle', href: 'https://discord.com' }
  ];

  const handleLinkClick = (href) => {
    if (href?.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = href;
    }
  };

  return (
    <footer className="bg-brand-canvas border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Logo */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                      >
                        <path
                          d="M12 2L2 7L12 12L22 7L12 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 17L12 22L22 17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 12L12 17L22 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse-glow"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-brand-headline text-xl font-bold text-brand-text-primary">
                      SkillSphere
                    </span>
                    <span className="text-xs text-brand-text-secondary font-mono">
                      v2.1.0
                    </span>
                  </div>
                </div>

                <p className="text-brand-text-secondary mb-6 leading-relaxed">
                  Where skills meet community, growth meets authenticity. Join the next-generation platform for collaborative developer growth.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks?.map((social) => (
                    <button
                      key={social?.name}
                      onClick={() => handleLinkClick(social?.href)}
                      className="w-10 h-10 bg-slate-800/50 border border-slate-700/50 rounded-lg flex items-center justify-center text-brand-text-secondary hover:text-brand-secondary hover:border-brand-secondary/50 transition-all duration-200"
                      title={social?.name}
                    >
                      <Icon name={social?.icon} size={18} />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {footerSections?.map((section, index) => (
              <motion.div
                key={section?.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-brand-text-primary font-semibold mb-4">
                  {section?.title}
                </h3>
                <ul className="space-y-3">
                  {section?.links?.map((link) => (
                    <li key={link?.name}>
                      <button
                        onClick={() => handleLinkClick(link?.href)}
                        className="text-brand-text-secondary hover:text-brand-secondary transition-colors duration-200 text-sm"
                      >
                        {link?.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-8 border-t border-slate-800"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-brand-text-primary mb-2">
                Stay Updated
              </h3>
              <p className="text-brand-text-secondary">
                Get the latest updates on new features, communities, and success stories.
              </p>
            </div>
            <div className="flex space-x-3">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-brand-text-primary placeholder-brand-text-secondary focus:outline-none focus:border-brand-secondary transition-colors duration-200"
                />
              </div>
              <button className="bg-brand-accent hover:bg-brand-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-8 border-t border-slate-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-brand-text-secondary">
              <span>© {currentYear} SkillSphere. All rights reserved.</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <button
                onClick={() => handleLinkClick('/homepage')}
                className="text-brand-text-secondary hover:text-brand-secondary transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleLinkClick('/homepage')}
                className="text-brand-text-secondary hover:text-brand-secondary transition-colors duration-200"
              >
                Terms of Service
              </button>
              <button
                onClick={() => handleLinkClick('/homepage')}
                className="text-brand-text-secondary hover:text-brand-secondary transition-colors duration-200"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </motion.div>

        {/* Developer Credit */}
        <div className="py-4 border-t border-slate-800/50">
          <div className="text-center">
            <p className="text-xs text-brand-text-secondary/60 font-mono">
              Built with ❤️ by developers, for developers • Powered by React & AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;