import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerifiedResume = ({ resumeData }) => {
  const [expandedSection, setExpandedSection] = useState('experience');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const VerificationBadge = ({ type, verified }) => (
    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
      verified 
        ? 'bg-accent/10 text-accent border border-accent/20' :'bg-muted text-muted-foreground border border-border'
    }`}>
      <Icon name={verified ? "ShieldCheck" : "Shield"} size={12} />
      <span>{type}</span>
    </div>
  );

  const ExperienceItem = ({ experience }) => (
    <div className="border border-border rounded-lg p-4 hover:shadow-subtle transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{experience?.position}</h4>
          <p className="text-primary font-medium">{experience?.company}</p>
          <p className="text-sm text-muted-foreground">{experience?.duration}</p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <VerificationBadge type="AI Verified" verified={experience?.aiVerified} />
          <VerificationBadge type="Peer Confirmed" verified={experience?.peerConfirmed} />
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">{experience?.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {experience?.technologies?.map((tech, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md border border-secondary/20"
          >
            {tech}
          </span>
        ))}
      </div>

      {experience?.achievements && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-foreground">Key Achievements:</h5>
          {experience?.achievements?.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Icon name="TrendingUp" size={14} className="text-accent mt-0.5" />
              <span className="text-sm text-muted-foreground">{achievement}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const EducationItem = ({ education }) => (
    <div className="border border-border rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-foreground">{education?.degree}</h4>
          <p className="text-primary font-medium">{education?.institution}</p>
          <p className="text-sm text-muted-foreground">{education?.year}</p>
        </div>
        <VerificationBadge type="Blockchain Verified" verified={education?.verified} />
      </div>
      
      {education?.gpa && (
        <p className="text-sm text-muted-foreground">GPA: {education?.gpa}</p>
      )}
      
      {education?.honors && (
        <div className="mt-2">
          <span className="text-sm font-medium text-accent">{education?.honors}</span>
        </div>
      )}
    </div>
  );

  const CertificationItem = ({ certification }) => (
    <div className="border border-border rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-foreground">{certification?.name}</h4>
          <p className="text-primary font-medium">{certification?.issuer}</p>
          <p className="text-sm text-muted-foreground">
            Issued: {certification?.issueDate} • Expires: {certification?.expiryDate}
          </p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <VerificationBadge type="Blockchain" verified={certification?.blockchainVerified} />
          <Button
            variant="ghost"
            size="sm"
            iconName="ExternalLink"
            className="text-xs"
          >
            Verify
          </Button>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground">{certification?.description}</p>
    </div>
  );

  return (
    <div className="bg-card rounded-xl border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Verified Resume</h2>
              <p className="text-sm text-muted-foreground">AI-powered analysis with blockchain verification</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-sm text-accent">
              <Icon name="Shield" size={16} />
              <span className="font-medium">98% Verified</span>
            </div>
            <Button variant="outline" size="sm" iconName="Download">
              Export PDF
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'experience', label: 'Experience', icon: 'Briefcase' },
            { key: 'education', label: 'Education', icon: 'GraduationCap' },
            { key: 'certifications', label: 'Certifications', icon: 'Award' },
          ]?.map((tab) => (
            <Button
              key={tab?.key}
              variant={expandedSection === tab?.key ? "default" : "outline"}
              size="sm"
              iconName={tab?.icon}
              iconPosition="left"
              onClick={() => toggleSection(tab?.key)}
            >
              {tab?.label}
            </Button>
          ))}
        </div>

        {/* Experience Section */}
        {expandedSection === 'experience' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Work Experience</h3>
              <span className="text-sm text-muted-foreground">
                {resumeData?.experience?.length} positions
              </span>
            </div>
            {resumeData?.experience?.map((exp, index) => (
              <ExperienceItem key={index} experience={exp} />
            ))}
          </div>
        )}

        {/* Education Section */}
        {expandedSection === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Education</h3>
              <span className="text-sm text-muted-foreground">
                {resumeData?.education?.length} degrees
              </span>
            </div>
            {resumeData?.education?.map((edu, index) => (
              <EducationItem key={index} education={edu} />
            ))}
          </div>
        )}

        {/* Certifications Section */}
        {expandedSection === 'certifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Certifications</h3>
              <span className="text-sm text-muted-foreground">
                {resumeData?.certifications?.length} certificates
              </span>
            </div>
            {resumeData?.certifications?.map((cert, index) => (
              <CertificationItem key={index} certification={cert} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifiedResume;