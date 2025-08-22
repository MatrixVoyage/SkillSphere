import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EndorsementsSection = ({ endorsements }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showWriteModal, setShowWriteModal] = useState(false);

  const filters = [
    { key: 'all', label: 'All Endorsements', count: endorsements?.length },
    { key: 'recent', label: 'Recent', count: endorsements?.filter(e => e?.isRecent)?.length },
    { key: 'verified', label: 'Verified', count: endorsements?.filter(e => e?.verified)?.length },
    { key: 'project-based', label: 'Project-based', count: endorsements?.filter(e => e?.projectBased)?.length },
  ];

  const filteredEndorsements = selectedFilter === 'all' 
    ? endorsements 
    : endorsements?.filter(endorsement => {
        switch(selectedFilter) {
          case 'recent': return endorsement?.isRecent;
          case 'verified': return endorsement?.verified;
          case 'project-based': return endorsement?.projectBased;
          default: return true;
        }
      });

  const EndorsementCard = ({ endorsement }) => (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-subtle transition-shadow">
      <div className="flex items-start space-x-4">
        {/* Endorser Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={endorsement?.endorser?.avatar}
              alt={endorsement?.endorser?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {endorsement?.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-card flex items-center justify-center">
              <Icon name="Check" size={12} className="text-white" />
            </div>
          )}
        </div>

        {/* Endorsement Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold text-foreground">{endorsement?.endorser?.name}</h4>
              <p className="text-sm text-muted-foreground">{endorsement?.endorser?.title}</p>
              <p className="text-sm text-muted-foreground">{endorsement?.endorser?.company}</p>
            </div>
            
            <div className="flex flex-col items-end space-y-1">
              <span className="text-sm text-muted-foreground">{endorsement?.date}</span>
              {endorsement?.projectBased && (
                <div className="flex items-center space-x-1 text-xs text-primary">
                  <Icon name="FolderOpen" size={12} />
                  <span>Project-based</span>
                </div>
              )}
            </div>
          </div>

          {/* Endorsement Text */}
          <blockquote className="text-muted-foreground mb-4 italic">
            "{endorsement?.content}"
          </blockquote>

          {/* Skills Endorsed */}
          {endorsement?.skillsEndorsed && endorsement?.skillsEndorsed?.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-foreground mb-2">Skills endorsed:</h5>
              <div className="flex flex-wrap gap-2">
                {endorsement?.skillsEndorsed?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md border border-accent/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Context */}
          {endorsement?.projectContext && (
            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="FolderOpen" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Project Context</span>
              </div>
              <p className="text-sm text-muted-foreground">{endorsement?.projectContext?.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                <span>Duration: {endorsement?.projectContext?.duration}</span>
                <span>•</span>
                <span>Role: {endorsement?.projectContext?.role}</span>
              </div>
            </div>
          )}

          {/* Endorsement Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-4">
              {endorsement?.verified && (
                <div className="flex items-center space-x-1 text-accent">
                  <Icon name="ShieldCheck" size={14} />
                  <span className="text-xs font-medium">Verified</span>
                </div>
              )}
              
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="ThumbsUp" size={14} />
                <span className="text-xs">{endorsement?.helpfulCount} found helpful</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" iconName="MessageCircle">
                Reply
              </Button>
              <Button variant="ghost" size="sm" iconName="Share">
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const WriteEndorsementModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border shadow-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Write an Endorsement</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowWriteModal(false)}
              iconName="X"
            />
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your relationship
              </label>
              <select className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground">
                <option>Worked together on a project</option>
                <option>Mentored by this person</option>
                <option>Collaborated in a community</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Skills to endorse
              </label>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'Python', 'Leadership', 'Problem Solving']?.map((skill) => (
                  <button
                    key={skill}
                    className="px-3 py-1 border border-border rounded-md text-sm hover:bg-muted transition-colors"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your endorsement
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground h-32 resize-none"
                placeholder="Share your experience working with this person..."
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowWriteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="default">
              Submit Endorsement
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-card rounded-xl border border-border shadow-subtle">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="MessageSquare" size={20} className="text-warning" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Endorsements</h2>
                <p className="text-sm text-muted-foreground">Contextual testimonials from collaborators</p>
              </div>
            </div>
            
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setShowWriteModal(true)}
            >
              Write Endorsement
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filters?.map((filter) => (
              <Button
                key={filter?.key}
                variant={selectedFilter === filter?.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter?.key)}
              >
                {filter?.label} ({filter?.count})
              </Button>
            ))}
          </div>

          {/* Endorsements List */}
          <div className="space-y-6">
            {filteredEndorsements?.map((endorsement, index) => (
              <EndorsementCard key={index} endorsement={endorsement} />
            ))}
          </div>

          {filteredEndorsements?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No endorsements found</h3>
              <p className="text-muted-foreground">Try selecting a different filter or request endorsements from collaborators.</p>
            </div>
          )}

          {/* Load More */}
          {filteredEndorsements?.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" iconName="ChevronDown">
                Load More Endorsements
              </Button>
            </div>
          )}
        </div>
      </div>
      {showWriteModal && <WriteEndorsementModal />}
    </>
  );
};

export default EndorsementsSection;