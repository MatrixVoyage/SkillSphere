import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthenticityScore = ({ score, breakdown, trustLevel }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score) => {
    if (score >= 90) return 'from-emerald-500 to-emerald-600';
    if (score >= 75) return 'from-blue-500 to-blue-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getTrustBadge = (level) => {
    const badges = {
      'Expert Validated': { color: 'bg-emerald-100 text-emerald-800', icon: 'Shield' },
      'Community Verified': { color: 'bg-blue-100 text-blue-800', icon: 'Users' },
      'Basic Verified': { color: 'bg-yellow-100 text-yellow-800', icon: 'CheckCircle' },
      'Unverified': { color: 'bg-gray-100 text-gray-800', icon: 'AlertCircle' }
    };
    return badges?.[level] || badges?.['Unverified'];
  };

  const badge = getTrustBadge(trustLevel);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Authenticity Score</h2>
          <p className="text-sm text-gray-600 mt-1">Your comprehensive credibility rating</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${badge?.color} flex items-center space-x-1`}>
          <Icon name={badge?.icon} size={14} />
          <span>{trustLevel}</span>
        </div>
      </div>
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
            <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${getScoreBackground(score)} flex items-center justify-center`}>
              <div className="text-center">
                <div className={`text-3xl font-bold text-white`}>
                  {score}
                </div>
                <div className="text-white text-sm opacity-90">
                  /100
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
            <Icon name="TrendingUp" size={16} className="text-emerald-600" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900 mb-3">Score Breakdown</h3>
        {breakdown?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 ${item?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={item?.icon} size={16} className={item?.color} />
              </div>
              <div>
                <p className="font-medium text-gray-900">{item?.category}</p>
                <p className="text-sm text-gray-600">{item?.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`font-semibold ${getScoreColor(item?.score)}`}>
                {item?.score}/100
              </div>
              <div className="text-xs text-gray-500">
                {item?.weight}% weight
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">How to improve your score</p>
            <p className="text-sm text-blue-700 mt-1">
              Complete certificate verification, participate in peer reviews, and maintain consistent project contributions to boost your authenticity score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticityScore;