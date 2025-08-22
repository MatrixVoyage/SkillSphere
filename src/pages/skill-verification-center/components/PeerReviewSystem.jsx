import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PeerReviewSystem = ({ reviews, pendingReviews, onRequestReview, onSubmitReview }) => {
  const [activeTab, setActiveTab] = useState('received');
  const [selectedReview, setSelectedReview] = useState(null);

  const getReviewStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-emerald-600 bg-emerald-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'text-purple-600 bg-purple-50';
      case 'Advanced': return 'text-blue-600 bg-blue-50';
      case 'Intermediate': return 'text-green-600 bg-green-50';
      case 'Beginner': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const tabs = [
    { id: 'received', label: 'Received Reviews', count: reviews?.received?.length },
    { id: 'given', label: 'Given Reviews', count: reviews?.given?.length },
    { id: 'pending', label: 'Pending Requests', count: pendingReviews?.length }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Peer Review System</h2>
          <p className="text-sm text-gray-600 mt-1">Community validation through project-based assessments</p>
        </div>
        <Button
          variant="default"
          iconName="UserPlus"
          iconPosition="left"
          onClick={onRequestReview}
        >
          Request Review
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
              activeTab === tab?.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>{tab?.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab?.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
            }`}>
              {tab?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Received Reviews Tab */}
      {activeTab === 'received' && (
        <div className="space-y-4">
          {reviews?.received?.map((review, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={review?.reviewer?.avatar}
                    alt={review?.reviewer?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{review?.reviewer?.name}</h4>
                    <p className="text-sm text-gray-600">{review?.reviewer?.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        {renderStars(review?.reviewer?.rating)}
                      </div>
                      <span className="text-xs text-gray-500">({review?.reviewer?.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    {renderStars(review?.rating)}
                  </div>
                  <p className="text-sm text-gray-500">{review?.date}</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSkillLevelColor(review?.skillLevel)}`}>
                    {review?.skill} - {review?.skillLevel}
                  </span>
                  <span className="text-xs text-gray-500">Project: {review?.project}</span>
                </div>
                <p className="text-sm text-gray-700">{review?.comment}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="font-medium text-gray-700">Technical Skills:</span>
                  <div className="flex items-center space-x-1 mt-1">
                    {renderStars(review?.ratings?.technical)}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Communication:</span>
                  <div className="flex items-center space-x-1 mt-1">
                    {renderStars(review?.ratings?.communication)}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Collaboration:</span>
                  <div className="flex items-center space-x-1 mt-1">
                    {renderStars(review?.ratings?.collaboration)}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Problem Solving:</span>
                  <div className="flex items-center space-x-1 mt-1">
                    {renderStars(review?.ratings?.problemSolving)}
                  </div>
                </div>
              </div>

              {review?.evidence && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-700 mb-2">Evidence:</p>
                  <div className="flex items-center space-x-2">
                    <Icon name="Link" size={14} className="text-blue-600" />
                    <a href={review?.evidence?.url} className="text-xs text-blue-600 hover:underline">
                      {review?.evidence?.title}
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Given Reviews Tab */}
      {activeTab === 'given' && (
        <div className="space-y-4">
          {reviews?.given?.map((review, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={review?.reviewee?.avatar}
                    alt={review?.reviewee?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{review?.reviewee?.name}</h4>
                    <p className="text-sm text-gray-600">{review?.reviewee?.title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    {renderStars(review?.rating)}
                  </div>
                  <p className="text-sm text-gray-500">{review?.date}</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSkillLevelColor(review?.skillLevel)}`}>
                    {review?.skill} - {review?.skillLevel}
                  </span>
                  <span className="text-xs text-gray-500">Project: {review?.project}</span>
                </div>
                <p className="text-sm text-gray-700">{review?.comment}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getReviewStatusColor(review?.status)}`}>
                  {review?.status?.charAt(0)?.toUpperCase() + review?.status?.slice(1)}
                </span>
                <Button variant="ghost" size="sm" iconName="Edit">
                  Edit Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Pending Requests Tab */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingReviews?.map((request, index) => (
            <div key={index} className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={request?.requester?.avatar}
                    alt={request?.requester?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{request?.requester?.name}</h4>
                    <p className="text-sm text-gray-600">{request?.requester?.title}</p>
                    <p className="text-xs text-gray-500 mt-1">Requested: {request?.requestDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSubmitReview(request?.id, 'decline')}
                  >
                    Decline
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onSubmitReview(request?.id, 'accept')}
                  >
                    Accept
                  </Button>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSkillLevelColor(request?.skillLevel)}`}>
                    {request?.skill}
                  </span>
                  <span className="text-xs text-gray-500">Project: {request?.project}</span>
                </div>
                <p className="text-sm text-gray-700">{request?.message}</p>
              </div>

              {request?.projectDetails && (
                <div className="mt-3 pt-3 border-t border-yellow-200">
                  <p className="text-xs font-medium text-gray-700 mb-2">Project Context:</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <span>Duration: {request?.projectDetails?.duration}</span>
                    <span>Role: {request?.projectDetails?.role}</span>
                    <span>Team Size: {request?.projectDetails?.teamSize}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PeerReviewSystem;