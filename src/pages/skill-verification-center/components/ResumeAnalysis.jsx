import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResumeAnalysis = ({ analysisData, onUploadResume, onFixIssue }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-emerald-600 bg-emerald-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Clock';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'inconsistencies', label: 'Inconsistencies', icon: 'AlertTriangle' },
    { id: 'suggestions', label: 'Suggestions', icon: 'Lightbulb' },
    { id: 'validation', label: 'Validation', icon: 'Shield' }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">AI Resume Analysis</h2>
          <p className="text-sm text-gray-600 mt-1">Comprehensive validation of your resume content</p>
        </div>
        <Button
          variant="outline"
          iconName="Upload"
          iconPosition="left"
          onClick={onUploadResume}
        >
          Upload New Resume
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab?.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} className="text-emerald-600" />
                <div>
                  <p className="font-semibold text-emerald-900">{analysisData?.overview?.verified}</p>
                  <p className="text-sm text-emerald-700">Verified Claims</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-yellow-600" />
                <div>
                  <p className="font-semibold text-yellow-900">{analysisData?.overview?.warnings}</p>
                  <p className="text-sm text-yellow-700">Needs Review</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Icon name="XCircle" size={20} className="text-red-600" />
                <div>
                  <p className="font-semibold text-red-900">{analysisData?.overview?.errors}</p>
                  <p className="text-sm text-red-700">Issues Found</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Recent Analysis Results</h3>
            <div className="space-y-3">
              {analysisData?.recentResults?.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(result?.status)}`}>
                      <Icon name={getStatusIcon(result?.status)} size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{result?.section}</p>
                      <p className="text-sm text-gray-600">{result?.message}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{result?.timestamp}</p>
                    {result?.status === 'error' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onFixIssue(result?.id)}
                        className="mt-1"
                      >
                        Fix Issue
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Inconsistencies Tab */}
      {activeTab === 'inconsistencies' && (
        <div className="space-y-4">
          {analysisData?.inconsistencies?.map((issue, index) => (
            <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900">{issue?.title}</h4>
                    <p className="text-sm text-red-700 mt-1">{issue?.description}</p>
                    <div className="mt-2">
                      <p className="text-xs text-red-600 font-medium">Found in: {issue?.location}</p>
                      <p className="text-xs text-red-600">Confidence: {issue?.confidence}%</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFixIssue(issue?.id)}
                >
                  Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Suggestions Tab */}
      {activeTab === 'suggestions' && (
        <div className="space-y-4">
          {analysisData?.suggestions?.map((suggestion, index) => (
            <div key={index} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <div className="flex items-start space-x-3">
                <Icon name="Lightbulb" size={20} className="text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900">{suggestion?.title}</h4>
                  <p className="text-sm text-blue-700 mt-1">{suggestion?.description}</p>
                  <div className="mt-3 flex items-center space-x-4">
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      Impact: {suggestion?.impact}
                    </span>
                    <span className="text-xs text-blue-600">
                      Priority: {suggestion?.priority}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Validation Tab */}
      {activeTab === 'validation' && (
        <div className="space-y-4">
          {analysisData?.validationResults?.map((validation, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{validation?.category}</h4>
                <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(validation?.status)}`}>
                  {validation?.status?.toUpperCase()}
                </div>
              </div>
              <div className="space-y-2">
                {validation?.items?.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{item?.claim}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`${getStatusColor(item?.status)} px-2 py-1 rounded text-xs`}>
                        {item?.confidence}% match
                      </span>
                      <Icon name={getStatusIcon(item?.status)} size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeAnalysis;