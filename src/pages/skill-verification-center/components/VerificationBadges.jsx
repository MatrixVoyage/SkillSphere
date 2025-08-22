import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerificationBadges = ({ badges, earnedBadges, onViewCriteria, onAppealDecision }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showEarnedOnly, setShowEarnedOnly] = useState(false);

  const categories = [
    { id: 'all', label: 'All Badges', count: badges?.length },
    { id: 'technical', label: 'Technical Skills', count: badges?.filter(b => b?.category === 'technical')?.length },
    { id: 'collaboration', label: 'Collaboration', count: badges?.filter(b => b?.category === 'collaboration')?.length },
    { id: 'leadership', label: 'Leadership', count: badges?.filter(b => b?.category === 'leadership')?.length },
    { id: 'achievement', label: 'Achievements', count: badges?.filter(b => b?.category === 'achievement')?.length }
  ];

  const trustLevels = [
    {
      level: 'Expert Validated',
      description: 'Verified by industry experts with 10+ years experience',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      icon: 'Crown'
    },
    {
      level: 'Community Verified',
      description: 'Validated through peer review and project collaboration',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: 'Users'
    },
    {
      level: 'AI Validated',
      description: 'Automatically verified through AI analysis and testing',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      icon: 'Brain'
    },
    {
      level: 'Self Reported',
      description: 'User-submitted claims pending verification',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: 'Clock'
    }
  ];

  const getBadgeStatus = (badge) => {
    const earned = earnedBadges?.find(eb => eb?.badgeId === badge?.id);
    if (earned) return { status: 'earned', earnedDate: earned?.earnedDate, trustLevel: earned?.trustLevel };
    if (badge?.progress && badge?.progress > 0) return { status: 'in-progress', progress: badge?.progress };
    return { status: 'available' };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'earned': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'in-progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'available': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredBadges = badges?.filter(badge => {
    const categoryMatch = selectedCategory === 'all' || badge?.category === selectedCategory;
    const earnedMatch = !showEarnedOnly || getBadgeStatus(badge)?.status === 'earned';
    return categoryMatch && earnedMatch;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Verification Badges</h2>
          <p className="text-sm text-gray-600 mt-1">Trust levels and achievement recognition</p>
        </div>
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={showEarnedOnly}
              onChange={(e) => setShowEarnedOnly(e?.target?.checked)}
              className="rounded border-gray-300"
            />
            <span>Show earned only</span>
          </label>
          <Button variant="outline" iconName="Info" onClick={() => onViewCriteria()}>
            View Criteria
          </Button>
        </div>
      </div>
      {/* Trust Levels */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4">Trust Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustLevels?.map((level, index) => (
            <div key={index} className={`border rounded-lg p-4 ${level?.bgColor} ${level?.borderColor}`}>
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={level?.icon} size={20} className={level?.color} />
                <h4 className={`font-medium ${level?.color}`}>{level?.level}</h4>
              </div>
              <p className="text-sm text-gray-700">{level?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category?.id
                ? 'bg-blue-100 text-blue-700 border border-blue-200' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{category?.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              selectedCategory === category?.id ? 'bg-blue-200 text-blue-700' : 'bg-gray-200 text-gray-600'
            }`}>
              {category?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges?.map((badge, index) => {
          const badgeStatus = getBadgeStatus(badge);
          return (
            <div key={index} className={`border rounded-lg p-4 transition-all hover:shadow-sm ${getStatusColor(badgeStatus?.status)}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${badge?.bgColor} rounded-lg flex items-center justify-center relative`}>
                    <Icon name={badge?.icon} size={24} className={badge?.color} />
                    {badgeStatus?.status === 'earned' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Icon name="Check" size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{badge?.title}</h3>
                    <p className="text-sm text-gray-600">{badge?.category}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(badgeStatus?.status)}`}>
                  {badgeStatus?.status === 'earned' ? 'Earned' : 
                   badgeStatus?.status === 'in-progress' ? 'In Progress' : 'Available'}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-4">{badge?.description}</p>
              {/* Progress Bar for In-Progress Badges */}
              {badgeStatus?.status === 'in-progress' && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Progress</span>
                    <span className="text-xs font-medium text-blue-600">{badgeStatus?.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${badgeStatus?.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              {/* Earned Badge Details */}
              {badgeStatus?.status === 'earned' && (
                <div className="mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-emerald-900">Earned</span>
                    <span className="text-xs text-emerald-700">{badgeStatus?.earnedDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={14} className="text-emerald-600" />
                    <span className="text-xs text-emerald-700">{badgeStatus?.trustLevel}</span>
                  </div>
                </div>
              )}
              {/* Requirements */}
              <div className="mb-4">
                <h4 className="text-xs font-medium text-gray-700 mb-2">Requirements:</h4>
                <ul className="space-y-1">
                  {badge?.requirements?.map((req, reqIndex) => (
                    <li key={reqIndex} className="flex items-center space-x-2 text-xs">
                      <Icon 
                        name={badgeStatus?.status === 'earned' ? "CheckCircle" : "Circle"} 
                        size={12} 
                        className={badgeStatus?.status === 'earned' ? "text-emerald-600" : "text-gray-400"} 
                      />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={14} className="text-gray-500" />
                  <span className="text-xs text-gray-500">{badge?.earnedBy} earned</span>
                </div>
                <div className="flex items-center space-x-2">
                  {badgeStatus?.status === 'earned' && badge?.appealable && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAppealDecision(badge?.id)}
                    >
                      Appeal
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    onClick={() => onViewCriteria(badge?.id)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Appeal Process Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Appeal Process</h4>
            <p className="text-sm text-blue-700">
              If you believe a verification decision was incorrect, you can submit an appeal with additional evidence. 
              Appeals are reviewed by a panel of community experts within 5-7 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationBadges;