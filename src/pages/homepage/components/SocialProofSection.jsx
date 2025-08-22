import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProofSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [counters, setCounters] = useState({
    verifiedSkills: 0,
    projectsCompleted: 0,
    activeDevelopers: 0,
    careerAdvancements: 0
  });

  const metrics = [
    {
      id: 'verifiedSkills',
      label: 'Verified Skills Earned',
      value: 50000,
      suffix: '+',
      icon: 'Award',
      color: 'text-yellow-400'
    },
    {
      id: 'projectsCompleted',
      label: 'Projects Completed',
      value: 1200,
      suffix: '+',
      icon: 'CheckCircle',
      color: 'text-green-400'
    },
    {
      id: 'activeDevelopers',
      label: 'Active Developers',
      value: 25000,
      suffix: '+',
      icon: 'Users',
      color: 'text-blue-400'
    },
    {
      id: 'careerAdvancements',
      label: 'Career Advancements',
      value: 3500,
      suffix: '+',
      icon: 'TrendingUp',
      color: 'text-purple-400'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Frontend Developer',
      company: 'TechCorp',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      content: `SkillSphere transformed my career completely. Through collaborative projects, I not only learned React and Node.js but also got my skills verified by industry experts. The community support was incredible, and I landed my dream job within 6 months.`,
      skills: ['React', 'Node.js', 'TypeScript'],
      achievement: 'Promoted to Senior Developer',
      rating: 5,
      timeframe: '6 months ago'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'DevOps Engineer',
      company: 'CloudScale',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      content: `The real-world projects on SkillSphere gave me hands-on experience with Docker and Kubernetes that no tutorial could provide. Working with experienced mentors and getting peer reviews made all the difference in my learning journey.`,
      skills: ['Docker', 'Kubernetes', 'AWS'],
      achievement: 'Career Switch to DevOps',
      rating: 5,
      timeframe: '8 months ago'
    },
    {
      id: 3,
      name: 'Priya Patel',
      role: 'AI/ML Engineer',
      company: 'DataVision',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      content: `As a career changer from finance to tech, SkillSphere's AI-powered skill verification gave me the credibility I needed. The collaborative projects helped me build a portfolio that impressed employers and showcased my actual capabilities.`,
      skills: ['Python', 'TensorFlow', 'PyTorch'],
      achievement: 'Successful Career Transition',rating: 5,timeframe: '1 year ago'
    },
    {
      id: 4,
      name: 'Alex Thompson',role: 'Full-Stack Developer',company: 'StartupHub',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      content: `The mentorship opportunities on SkillSphere are unmatched. Senior developers actually take time to review your code and provide meaningful feedback. This platform doesn't just teach you to code; it teaches you to think like a professional developer.`,
      skills: ['JavaScript', 'React', 'MongoDB'],
      achievement: 'First Tech Job',
      rating: 5,
      timeframe: '4 months ago'
    },
    {
      id: 5,
      name: 'Elena Vasquez',
      role: 'Blockchain Developer',
      company: 'CryptoTech',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150',
      content: `SkillSphere's blockchain community introduced me to cutting-edge projects that I couldn't find anywhere else. The collaborative environment and expert guidance helped me transition from web development to blockchain development seamlessly.`,
      skills: ['Solidity', 'Web3', 'Ethereum'],
      achievement: '40% Salary Increase',
      rating: 5,
      timeframe: '10 months ago'
    }
  ];

  const companyLogos = [
    { name: 'Google', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100' },
    { name: 'Microsoft', logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100' },
    { name: 'Amazon', logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100' },
    { name: 'Meta', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100' },
    { name: 'Netflix', logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100' },
    { name: 'Spotify', logo: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=100' }
  ];

  useEffect(() => {
    // Animate counters
    const animateCounters = () => {
      metrics?.forEach(metric => {
        let current = 0;
        const increment = metric?.value / 100;
        const timer = setInterval(() => {
          current += increment;
          if (current >= metric?.value) {
            current = metric?.value;
            clearInterval(timer);
          }
          setCounters(prev => ({
            ...prev,
            [metric?.id]: Math.floor(current)
          }));
        }, 20);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('metrics-section');
    if (element) observer?.observe(element);

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}
      />
    ));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-brand-canvas to-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-brand-headline text-brand-text-primary mb-6">
            Trusted by Developers Worldwide
          </h2>
          <p className="text-xl text-brand-text-secondary max-w-3xl mx-auto">
            Join thousands of developers who have advanced their careers through authentic skill development and meaningful collaboration
          </p>
        </motion.div>

        {/* Metrics Section */}
        <motion.div
          id="metrics-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {metrics?.map((metric) => (
            <div
              key={metric?.id}
              className="text-center p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-brand-secondary/50 transition-all duration-300"
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-slate-700/50 flex items-center justify-center ${metric?.color}`}>
                <Icon name={metric?.icon} size={24} />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-brand-text-primary mb-2">
                {counters?.[metric?.id]?.toLocaleString()}{metric?.suffix}
              </div>
              <div className="text-sm text-brand-text-secondary">
                {metric?.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Testimonial Content */}
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8"
          >
            <div className="flex items-center mb-6">
              {renderStars(testimonials?.[currentTestimonial]?.rating)}
              <span className="ml-2 text-sm text-brand-text-secondary">
                {testimonials?.[currentTestimonial]?.timeframe}
              </span>
            </div>

            <blockquote className="text-lg text-brand-text-primary mb-6 leading-relaxed">
              "{testimonials?.[currentTestimonial]?.content}"
            </blockquote>

            <div className="flex items-center space-x-4 mb-6">
              <Image
                src={testimonials?.[currentTestimonial]?.avatar}
                alt={testimonials?.[currentTestimonial]?.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-brand-secondary/30"
              />
              <div>
                <div className="font-semibold text-brand-text-primary">
                  {testimonials?.[currentTestimonial]?.name}
                </div>
                <div className="text-brand-text-secondary">
                  {testimonials?.[currentTestimonial]?.role}
                </div>
                <div className="text-brand-secondary text-sm">
                  {testimonials?.[currentTestimonial]?.company}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {testimonials?.[currentTestimonial]?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-brand-secondary/20 text-brand-secondary text-sm rounded-md font-mono"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-2 text-green-400">
              <Icon name="TrendingUp" size={16} />
              <span className="text-sm font-medium">
                {testimonials?.[currentTestimonial]?.achievement}
              </span>
            </div>
          </motion.div>

          {/* Testimonial Navigation */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-brand-text-primary mb-6">
              Success Stories
            </h3>
            {testimonials?.map((testimonial, index) => (
              <button
                key={testimonial?.id}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'border-brand-secondary bg-brand-secondary/10' :'border-slate-700/50 bg-slate-800/30 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-brand-text-primary">
                      {testimonial?.name}
                    </div>
                    <div className="text-sm text-brand-text-secondary truncate">
                      {testimonial?.role} at {testimonial?.company}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                    <span className="text-xs text-brand-text-secondary">
                      {testimonial?.rating}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-lg font-semibold text-brand-text-secondary mb-8">
            Our developers work at leading companies
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companyLogos?.map((company, index) => (
              <div
                key={index}
                className="w-16 h-16 bg-slate-800/50 rounded-lg flex items-center justify-center hover:opacity-100 transition-opacity duration-300"
              >
                <span className="text-xs font-bold text-brand-text-secondary">
                  {company?.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-brand-secondary/20 to-brand-accent/20 border border-brand-secondary/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-brand-text-primary mb-4">
              Ready to Start Your Success Story?
            </h3>
            <p className="text-brand-text-secondary mb-6 max-w-2xl mx-auto">
              Join thousands of developers who are building real projects, earning verified skills, and advancing their careers through authentic collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/community-explorer'}
                className="bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Join a Community
              </button>
              <button
                onClick={() => window.location.href = '/profile-showcase'}
                className="border border-brand-secondary text-brand-secondary hover:bg-brand-secondary/10 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Create Profile
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;