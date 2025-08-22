import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationDashboard = ({ verificationStats, onStartVerification }) => {
  const stats = [
    {
      title: "Resume Elements",
      verified: verificationStats?.resume?.verified,
      total: verificationStats?.resume?.total,
      percentage: Math.round((verificationStats?.resume?.verified / verificationStats?.resume?.total) * 100),
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      icon: "FileText"
    },
    {
      title: "Certificates",
      verified: verificationStats?.certificates?.verified,
      total: verificationStats?.certificates?.total,
      percentage: Math.round((verificationStats?.certificates?.verified / verificationStats?.certificates?.total) * 100),
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      icon: "Award"
    },
    {
      title: "Skills Assessment",
      verified: verificationStats?.skills?.verified,
      total: verificationStats?.skills?.total,
      percentage: Math.round((verificationStats?.skills?.verified / verificationStats?.skills?.total) * 100),
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      icon: "Code"
    },
    {
      title: "Peer Reviews",
      verified: verificationStats?.peerReviews?.verified,
      total: verificationStats?.peerReviews?.total,
      percentage: Math.round((verificationStats?.peerReviews?.verified / verificationStats?.peerReviews?.total) * 100),
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      icon: "Users"
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Verification Dashboard</h2>
          <p className="text-sm text-gray-600 mt-1">Track your verification progress across all categories</p>
        </div>
        <button
          onClick={onStartVerification}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span>Start New Verification</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
              <span className={`text-sm font-medium ${stat?.color}`}>
                {stat?.percentage}%
              </span>
            </div>
            <h3 className="font-medium text-gray-900 mb-1">{stat?.title}</h3>
            <p className="text-sm text-gray-600">
              {stat?.verified} of {stat?.total} verified
            </p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  stat?.percentage >= 80 ? 'bg-emerald-500' :
                  stat?.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${stat?.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationDashboard;