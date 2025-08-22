import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [activeNodes, setActiveNodes] = useState([]);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(prev => {
        const newNodes = [...prev];
        const randomIndex = Math.floor(Math.random() * 12);
        if (newNodes?.includes(randomIndex)) {
          return newNodes?.filter(node => node !== randomIndex);
        } else {
          return [...newNodes, randomIndex]?.slice(-4);
        }
      });
    }, 1500);

    const phaseInterval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(phaseInterval);
    };
  }, []);

  const skillNodes = [
    { id: 0, name: 'React', x: 20, y: 30, color: 'text-blue-400' },
    { id: 1, name: 'Node.js', x: 80, y: 20, color: 'text-green-400' },
    { id: 2, name: 'Python', x: 60, y: 60, color: 'text-yellow-400' },
    { id: 3, name: 'Docker', x: 15, y: 70, color: 'text-cyan-400' },
    { id: 4, name: 'AWS', x: 85, y: 75, color: 'text-orange-400' },
    { id: 5, name: 'GraphQL', x: 40, y: 25, color: 'text-pink-400' },
    { id: 6, name: 'TypeScript', x: 70, y: 40, color: 'text-blue-300' },
    { id: 7, name: 'MongoDB', x: 25, y: 50, color: 'text-green-300' },
    { id: 8, name: 'Kubernetes', x: 90, y: 50, color: 'text-purple-400' },
    { id: 9, name: 'Redis', x: 50, y: 80, color: 'text-red-400' },
    { id: 10, name: 'Next.js', x: 10, y: 10, color: 'text-gray-300' },
    { id: 11, name: 'PostgreSQL', x: 75, y: 15, color: 'text-indigo-400' }
  ];

  const handleStartBuilding = () => {
    window.location.href = '/community-explorer';
  };

  const handleExploreCommunities = () => {
    window.location.href = '/community-explorer';
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-brand-canvas via-slate-900 to-brand-primary overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(64, 224, 208, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(64, 224, 208, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      {/* Skill Network Visualization */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative w-full h-full">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {skillNodes?.map((node, index) => 
              skillNodes?.slice(index + 1)?.map((targetNode, targetIndex) => {
                const distance = Math.sqrt(
                  Math.pow(node?.x - targetNode?.x, 2) + Math.pow(node?.y - targetNode?.y, 2)
                );
                if (distance < 40) {
                  return (
                    <motion.line
                      key={`${node?.id}-${targetNode?.id}`}
                      x1={`${node?.x}%`}
                      y1={`${node?.y}%`}
                      x2={`${targetNode?.x}%`}
                      y2={`${targetNode?.y}%`}
                      stroke="rgba(64, 224, 208, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ 
                        pathLength: activeNodes?.includes(node?.id) || activeNodes?.includes(targetNode?.id) ? 1 : 0.3,
                        stroke: activeNodes?.includes(node?.id) || activeNodes?.includes(targetNode?.id) 
                          ? "rgba(64, 224, 208, 0.8)" 
                          : "rgba(64, 224, 208, 0.3)"
                      }}
                      transition={{ duration: 0.8 }}
                    />
                  );
                }
                return null;
              })
            )}
          </svg>

          {/* Skill Nodes */}
          {skillNodes?.map((node) => (
            <motion.div
              key={node?.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node?.x}%`, top: `${node?.y}%` }}
              animate={{
                scale: activeNodes?.includes(node?.id) ? 1.3 : 1,
                opacity: activeNodes?.includes(node?.id) ? 1 : 0.7
              }}
              transition={{ duration: 0.5 }}
            >
              <div className={`relative w-12 h-12 rounded-full bg-slate-800 border-2 border-brand-secondary flex items-center justify-center ${
                activeNodes?.includes(node?.id) ? 'shadow-lg shadow-brand-secondary/50' : ''
              }`}>
                <span className={`text-xs font-mono font-bold ${node?.color}`}>
                  {node?.name?.slice(0, 2)}
                </span>
                {activeNodes?.includes(node?.id) && (
                  <div className="absolute inset-0 rounded-full border-2 border-brand-secondary animate-ping"></div>
                )}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-slate-800/90 rounded text-xs text-white font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {node?.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl lg:text-7xl font-brand-headline text-brand-text-primary mb-6 leading-tight">
              Where Skills Meet{' '}
              <span className="text-brand-secondary">Community</span>
              <br />
              Growth Meets{' '}
              <span className="text-brand-accent">Authenticity</span>
            </h1>
            <p className="text-xl lg:text-2xl text-brand-text-secondary max-w-3xl mx-auto leading-relaxed">
              Join the next-generation platform where developers collaborate on real projects, 
              validate achievements through AI-powered verification, and build meaningful 
              professional relationships through shared accomplishments.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              variant="default"
              size="lg"
              onClick={handleStartBuilding}
              iconName="Rocket"
              iconPosition="left"
              className="bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 text-lg font-brand-cta"
            >
              Start Building Together
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleExploreCommunities}
              iconName="Users"
              iconPosition="left"
              className="border-brand-secondary text-brand-secondary hover:bg-brand-secondary/10 px-8 py-4 text-lg"
            >
              Explore Communities
            </Button>
          </motion.div>

          {/* Live Activity Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center space-x-4 text-brand-text-secondary"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></div>
              <span className="text-sm font-mono">Live: 1,247 developers building</span>
            </div>
            <div className="w-1 h-4 bg-brand-text-secondary/30"></div>
            <div className="flex items-center space-x-2">
              <Icon name="GitBranch" size={16} className="text-brand-secondary" />
              <span className="text-sm font-mono">342 active projects</span>
            </div>
          </motion.div>

          {/* Floating Action Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center space-y-2 text-brand-text-secondary/60"
            >
              <span className="text-sm font-mono">Scroll to explore</span>
              <Icon name="ChevronDown" size={20} />
            </motion.div>
          </div>
        </div>
      </div>
      {/* Gradient Overlays */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-canvas to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-canvas/50 to-transparent"></div>
    </section>
  );
};

export default HeroSection;