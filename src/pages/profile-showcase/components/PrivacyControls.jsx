import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacyControls = ({ privacySettings, onUpdateSettings }) => {
  const [activeTab, setActiveTab] = useState('visibility');
  const [settings, setSettings] = useState(privacySettings);

  const handleSettingChange = (category, setting, value) => {
    const updatedSettings = {
      ...settings,
      [category]: {
        ...settings?.[category],
        [setting]: value
      }
    };
    setSettings(updatedSettings);
    onUpdateSettings(updatedSettings);
  };

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Visible to everyone', icon: 'Globe' },
    { value: 'network', label: 'Network Only', description: 'Visible to your connections', icon: 'Users' },
    { value: 'recruiters', label: 'Recruiters', description: 'Visible to verified recruiters', icon: 'Briefcase' },
    { value: 'private', label: 'Private', description: 'Only visible to you', icon: 'Lock' },
  ];

  const VisibilityControl = ({ label, setting, category, description }) => (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-1">
        <h4 className="font-medium text-foreground">{label}</h4>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <select
          value={settings?.[category]?.[setting]}
          onChange={(e) => handleSettingChange(category, setting, e?.target?.value)}
          className="px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
        >
          {visibilityOptions?.map((option) => (
            <option key={option?.value} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>
        
        <div className="w-8 h-8 flex items-center justify-center">
          <Icon 
            name={visibilityOptions?.find(opt => opt?.value === settings?.[category]?.[setting])?.icon || 'Globe'} 
            size={16} 
            className="text-muted-foreground" 
          />
        </div>
      </div>
    </div>
  );

  const ToggleControl = ({ label, setting, category, description }) => (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-1">
        <h4 className="font-medium text-foreground">{label}</h4>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      
      <button
        onClick={() => handleSettingChange(category, setting, !settings?.[category]?.[setting])}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          settings?.[category]?.[setting] ? 'bg-primary' : 'bg-muted'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings?.[category]?.[setting] ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const AudiencePreview = () => {
    const getAudienceCount = (visibility) => {
      switch(visibility) {
        case 'public': return '10M+ people';
        case 'network': return '1,247 connections';
        case 'recruiters': return '500+ recruiters';
        case 'private': return 'Only you';
        default: return 'Unknown';
      }
    };

    const profileVisibility = settings?.profile?.basicInfo;
    
    return (
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Icon name="Eye" size={20} className="text-primary" />
          <h4 className="font-medium text-foreground">Audience Preview</h4>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Your profile is visible to:</span>
            <span className="font-medium text-foreground">{getAudienceCount(profileVisibility)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Profile views this month:</span>
            <span className="font-medium text-foreground">2,847</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Recruiter views:</span>
            <span className="font-medium text-foreground">156</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Privacy Controls</h2>
            <p className="text-sm text-muted-foreground">Manage who can see your profile information</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'visibility', label: 'Visibility', icon: 'Eye' },
            { key: 'notifications', label: 'Notifications', icon: 'Bell' },
            { key: 'data', label: 'Data & Privacy', icon: 'Database' },
          ]?.map((tab) => (
            <Button
              key={tab?.key}
              variant={activeTab === tab?.key ? "default" : "outline"}
              size="sm"
              iconName={tab?.icon}
              iconPosition="left"
              onClick={() => setActiveTab(tab?.key)}
            >
              {tab?.label}
            </Button>
          ))}
        </div>

        {/* Visibility Settings */}
        {activeTab === 'visibility' && (
          <div className="space-y-6">
            <AudiencePreview />
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Profile Information</h3>
              <div className="space-y-3">
                <VisibilityControl
                  label="Basic Information"
                  setting="basicInfo"
                  category="profile"
                  description="Name, title, location, and profile photo"
                />
                <VisibilityControl
                  label="Contact Information"
                  setting="contactInfo"
                  category="profile"
                  description="Email, phone, and social media links"
                />
                <VisibilityControl
                  label="Work Experience"
                  setting="experience"
                  category="profile"
                  description="Employment history and achievements"
                />
                <VisibilityControl
                  label="Skills & Endorsements"
                  setting="skills"
                  category="profile"
                  description="Skill assessments and peer endorsements"
                />
                <VisibilityControl
                  label="Project Portfolio"
                  setting="projects"
                  category="profile"
                  description="Project showcase and collaboration history"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Activity & Engagement</h3>
              <div className="space-y-3">
                <VisibilityControl
                  label="Activity Status"
                  setting="activityStatus"
                  category="activity"
                  description="Online status and current coding activity"
                />
                <VisibilityControl
                  label="Collaboration History"
                  setting="collaborationHistory"
                  category="activity"
                  description="Past and current project collaborations"
                />
                <VisibilityControl
                  label="Community Participation"
                  setting="communityActivity"
                  category="activity"
                  description="Community posts and contributions"
                />
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Profile Interactions</h3>
              <div className="space-y-3">
                <ToggleControl
                  label="Profile Views"
                  setting="profileViews"
                  category="notifications"
                  description="Get notified when someone views your profile"
                />
                <ToggleControl
                  label="New Endorsements"
                  setting="endorsements"
                  category="notifications"
                  description="Get notified when you receive new endorsements"
                />
                <ToggleControl
                  label="Collaboration Requests"
                  setting="collaborationRequests"
                  category="notifications"
                  description="Get notified about new collaboration opportunities"
                />
                <ToggleControl
                  label="Skill Verifications"
                  setting="skillVerifications"
                  category="notifications"
                  description="Get notified when your skills are verified"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Communication</h3>
              <div className="space-y-3">
                <ToggleControl
                  label="Direct Messages"
                  setting="directMessages"
                  category="notifications"
                  description="Allow others to send you direct messages"
                />
                <ToggleControl
                  label="Recruiter Messages"
                  setting="recruiterMessages"
                  category="notifications"
                  description="Allow verified recruiters to contact you"
                />
                <ToggleControl
                  label="Weekly Digest"
                  setting="weeklyDigest"
                  category="notifications"
                  description="Receive weekly summary of your profile activity"
                />
              </div>
            </div>
          </div>
        )}

        {/* Data & Privacy Settings */}
        {activeTab === 'data' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Data Management</h3>
              <div className="space-y-3">
                <ToggleControl
                  label="Analytics Tracking"
                  setting="analytics"
                  category="data"
                  description="Allow collection of profile analytics data"
                />
                <ToggleControl
                  label="Personalized Recommendations"
                  setting="recommendations"
                  category="data"
                  description="Use your data to provide personalized content"
                />
                <ToggleControl
                  label="Third-party Integrations"
                  setting="thirdPartyIntegrations"
                  category="data"
                  description="Allow verified third-party services to access your data"
                />
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Data Export & Deletion</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Export Your Data</p>
                    <p className="text-xs text-muted-foreground">Download all your profile data</p>
                  </div>
                  <Button variant="outline" size="sm" iconName="Download">
                    Export
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Delete Account</p>
                    <p className="text-xs text-muted-foreground">Permanently delete your account and data</p>
                  </div>
                  <Button variant="destructive" size="sm" iconName="Trash2">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Changes */}
        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-border">
          <Button variant="outline">
            Reset to Defaults
          </Button>
          <Button variant="default" iconName="Save">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControls;