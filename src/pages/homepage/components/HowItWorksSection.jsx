import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: 'Join Goal-Based Communities',
      description: 'Discover communities aligned with your learning goals and career aspirations. Connect with like-minded developers working on similar projects.',
      icon: 'Users',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20',
      features: [
        'Smart matching algorithms',
        'Skill-based filtering',
        'Project compatibility scoring',
        'Community activity insights'
      ],
      visual: {
        type: 'community',
        elements: [
          { name: 'React Developers', members: 1247, active: true },
          { name: 'DevOps Engineers', members: 892, active: false },
          { name: 'AI/ML Enthusiasts', members: 2156, active: false }
        ]
      }
    },
    {
      id: 1,
      title: 'Collaborate on Real Projects',
      description: 'Work together on meaningful projects that solve real problems. Build your portfolio while learning from experienced developers.',
      icon: 'GitBranch',
      color: 'text-green-400',
      bgColor: 'bg-green-400/20',
      features: [
        'Real-world project challenges',
        'Collaborative code reviews',
        'Progress tracking tools',
        'Mentorship opportunities'
      ],
      visual: {
        type: 'project',
        elements: [
          { name: 'E-commerce Platform', progress: 75, contributors: 4 },
          { name: 'Task Management App', progress: 45, contributors: 3 },
          { name: 'Weather Dashboard', progress: 90, contributors: 2 }
        ]
      }
    },
    {
      id: 2,
      title: 'Earn Verified Skills',
      description: 'Get your achievements verified through AI-powered assessment and peer validation. Build a trusted professional profile.',
      icon: 'Award',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/20',
      features: [
        'AI-powered skill verification',
        'Blockchain-backed certificates',
        'Peer endorsement system',
        'Industry recognition'
      ],
      visual: {
        type: 'skills',
        elements: [
          { name: 'React Development', level: 'Expert', verified: true },
          { name: 'Node.js Backend', level: 'Advanced', verified: true },
          { name: 'Docker Deployment', level: 'Intermediate', verified: false }
        ]
      }
    }
  ];

  const handleExploreStep = (stepId) => {
    switch (stepId) {
      case 0:
        window.location.href = '/community-explorer';
        break;
      case 1:
        window.location.href = '/project-workspace';
        break;
      case 2:
        window.location.href = '/skill-verification-center';
        break;
      default:
        window.location.href = '/community-explorer';
    }
  };

  const renderStepVisual = (step) => {
    switch (step?.visual?.type) {
      case 'community':
        return (
          <div className="space-y-3">
            {step?.visual?.elements?.map((community, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  community?.active 
                    ? 'border-brand-secondary bg-brand-secondary/10' :'border-slate-600 bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      community?.active ? 'bg-brand-secondary animate-pulse' : 'bg-slate-500'
                    }`}></div>
                    <span className="text-sm font-medium text-brand-text-primary">
                      {community?.name}
                    </span>
                  </div>
                  <span className="text-xs text-brand-text-secondary">
                    {community?.members?.toLocaleString()} members
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'project':
        return (
          <div className="space-y-3">
            {step?.visual?.elements?.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg border border-slate-600 bg-slate-800/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-brand-text-primary">
                    {project?.name}
                  </span>
                  <span className="text-xs text-brand-text-secondary">
                    {project?.contributors} contributors
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project?.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="bg-gradient-to-r from-green-400 to-brand-secondary h-2 rounded-full"
                  ></motion.div>
                </div>
                <div className="text-xs text-brand-text-secondary mt-1">
                  {project?.progress}% complete
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-3">
            {step?.visual?.elements?.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg border border-slate-600 bg-slate-800/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      skill?.verified ? 'bg-green-400/20' : 'bg-slate-600/20'
                    }`}>
                      <Icon 
                        name={skill?.verified ? 'CheckCircle' : 'Clock'} 
                        size={12} 
                        className={skill?.verified ? 'text-green-400' : 'text-slate-400'} 
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-brand-text-primary">
                        {skill?.name}
                      </div>
                      <div className="text-xs text-brand-text-secondary">
                        {skill?.level}
                      </div>
                    </div>
                  </div>
                  {skill?.verified && (
                    <Icon name="Award" size={16} className="text-yellow-400" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900/50 to-brand-canvas">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-brand-headline text-brand-text-primary mb-6">
            How It Works
          </h2>
          <p className="text-xl text-brand-text-secondary max-w-3xl mx-auto">
            Your journey from learning to earning verified skills in three simple steps
          </p>
        </motion.div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4 p-2 bg-slate-800/50 rounded-xl border border-slate-700">
            {steps?.map((step, index) => (
              <button
                key={step?.id}
                onClick={() => setActiveStep(index)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeStep === index
                    ? `${step?.bgColor} ${step?.color} border border-current`
                    : 'text-brand-text-secondary hover:text-brand-text-primary hover:bg-slate-700/50'
                }`}
              >
                <Icon name={step?.icon} size={16} />
                <span className="text-sm font-medium hidden sm:inline">
                  Step {index + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Step Content */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Step Details */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-12 h-12 rounded-xl ${steps?.[activeStep]?.bgColor} flex items-center justify-center`}>
                <Icon 
                  name={steps?.[activeStep]?.icon} 
                  size={24} 
                  className={steps?.[activeStep]?.color} 
                />
              </div>
              <div>
                <div className="text-sm text-brand-text-secondary font-mono">
                  Step {activeStep + 1}
                </div>
                <h3 className="text-2xl font-bold text-brand-text-primary">
                  {steps?.[activeStep]?.title}
                </h3>
              </div>
            </div>

            <p className="text-lg text-brand-text-secondary mb-8 leading-relaxed">
              {steps?.[activeStep]?.description}
            </p>

            <div className="space-y-3 mb-8">
              {steps?.[activeStep]?.features?.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <Icon name="Check" size={16} className="text-green-400" />
                  <span className="text-brand-text-secondary">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => handleExploreStep(activeStep)}
              iconName="ArrowRight"
              iconPosition="right"
              className="border-brand-secondary text-brand-secondary hover:bg-brand-secondary/10"
            >
              Explore This Step
            </Button>
          </div>

          {/* Step Visual */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-brand-text-primary mb-2">
                Live Example
              </h4>
              <p className="text-sm text-brand-text-secondary">
                See how this step works in practice
              </p>
            </div>
            {renderStepVisual(steps?.[activeStep])}
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center space-x-4">
            {steps?.map((_, index) => (
              <React.Fragment key={index}>
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= activeStep ? 'bg-brand-secondary' : 'bg-slate-600'
                  }`}
                />
                {index < steps?.length - 1 && (
                  <div
                    className={`w-8 h-0.5 transition-all duration-300 ${
                      index < activeStep ? 'bg-brand-secondary' : 'bg-slate-600'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;