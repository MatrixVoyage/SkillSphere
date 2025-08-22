import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CompetencyTesting = ({ availableTests, completedTests, onStartTest, onViewResults }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTest, setSelectedTest] = useState(null);

  const categories = [
    { id: 'all', label: 'All Tests', icon: 'Grid3X3' },
    { id: 'frontend', label: 'Frontend', icon: 'Monitor' },
    { id: 'backend', label: 'Backend', icon: 'Server' },
    { id: 'fullstack', label: 'Full Stack', icon: 'Layers' },
    { id: 'mobile', label: 'Mobile', icon: 'Smartphone' },
    { id: 'devops', label: 'DevOps', icon: 'Settings' },
    { id: 'data', label: 'Data Science', icon: 'BarChart3' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-50 border-green-200';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Advanced': return 'text-red-600 bg-red-50 border-red-200';
      case 'Expert': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredTests = selectedCategory === 'all' 
    ? availableTests 
    : availableTests?.filter(test => test?.category === selectedCategory);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Competency Testing</h2>
          <p className="text-sm text-gray-600 mt-1">Validate your skills through AI-powered assessments</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Icon name="Brain" size={16} className="text-purple-600" />
          <span>AI + Peer Reviewed</span>
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
            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Test Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredTests?.map((test, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${test?.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon name={test?.icon} size={20} className={test?.color} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{test?.title}</h3>
                  <p className="text-sm text-gray-600">{test?.technology}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(test?.difficulty)}`}>
                {test?.difficulty}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-4">{test?.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{test?.duration}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Questions:</span>
                <span className="font-medium">{test?.questionCount}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Pass Score:</span>
                <span className="font-medium">{test?.passScore}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} className="text-gray-500" />
                  <span className="text-xs text-gray-500">{test?.attempts} attempts</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-yellow-500" />
                  <span className="text-xs text-gray-500">{test?.rating}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onStartTest(test?.id)}
                disabled={test?.status === 'completed'}
              >
                {test?.status === 'completed' ? 'Completed' : 'Start Test'}
              </Button>
            </div>

            {test?.tags && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex flex-wrap gap-1">
                  {test?.tags?.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Completed Tests Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">Recent Test Results</h3>
          <Button variant="ghost" size="sm" iconName="ExternalLink">
            View All Results
          </Button>
        </div>

        <div className="space-y-3">
          {completedTests?.slice(0, 5)?.map((test, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${test?.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon name={test?.icon} size={16} className={test?.color} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{test?.title}</h4>
                  <p className="text-sm text-gray-600">{test?.technology}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">
                      Completed: {test?.completedDate}
                    </span>
                    <span className="text-xs text-gray-500">
                      Duration: {test?.actualDuration}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getScoreColor(test?.score)}`}>
                  {test?.score}%
                </div>
                <div className="text-xs text-gray-500">
                  {test?.rank} percentile
                </div>
                <div className="mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewResults(test?.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Test Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Code" size={20} className="text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-900">Code Challenges</h4>
              <p className="text-sm text-blue-700">Real-world problems</p>
            </div>
          </div>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Brain" size={20} className="text-emerald-600" />
            <div>
              <h4 className="font-medium text-emerald-900">AI Scoring</h4>
              <p className="text-sm text-emerald-700">Intelligent evaluation</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={20} className="text-purple-600" />
            <div>
              <h4 className="font-medium text-purple-900">Peer Review</h4>
              <p className="text-sm text-purple-700">Community validation</p>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Award" size={20} className="text-orange-600" />
            <div>
              <h4 className="font-medium text-orange-900">Certificates</h4>
              <p className="text-sm text-orange-700">Verified achievements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetencyTesting;