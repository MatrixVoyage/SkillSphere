import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchFilters = ({ 
  searchQuery, 
  onSearchChange, 
  activeFilters, 
  onFilterChange, 
  onClearFilters 
}) => {
  const contentTypes = [
    { id: 'all', label: 'All Content', icon: 'Grid3x3' },
    { id: 'tutorial', label: 'Tutorials', icon: 'BookOpen' },
    { id: 'case-study', label: 'Case Studies', icon: 'FileText' },
    { id: 'expert-insight', label: 'Expert Insights', icon: 'Star' },
    { id: 'community', label: 'Community Posts', icon: 'Users' },
  ];

  const difficulties = [
    { id: 'beginner', label: 'Beginner', color: 'text-green-600 bg-green-50' },
    { id: 'intermediate', label: 'Intermediate', color: 'text-yellow-600 bg-yellow-50' },
    { id: 'advanced', label: 'Advanced', color: 'text-red-600 bg-red-50' },
  ];

  const topics = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 
    'Machine Learning', 'DevOps', 'Cloud Computing', 'Mobile Development', 
    'Web Security', 'Database Design', 'System Architecture'
  ];

  const sortOptions = [
    { id: 'recent', label: 'Most Recent', icon: 'Clock' },
    { id: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { id: 'relevant', label: 'Most Relevant', icon: 'Target' },
    { id: 'bookmarked', label: 'Bookmarked', icon: 'Bookmark' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Search Input */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search articles, tutorials, insights..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Content Type Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Content Type</h3>
        <div className="grid grid-cols-1 gap-2">
          {contentTypes?.map((type) => (
            <button
              key={type?.id}
              onClick={() => onFilterChange('contentType', type?.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilters?.contentType === type?.id
                  ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={type?.icon} size={16} />
              <span>{type?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Difficulty Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Difficulty</h3>
        <div className="flex flex-wrap gap-2">
          {difficulties?.map((difficulty) => (
            <button
              key={difficulty?.id}
              onClick={() => onFilterChange('difficulty', difficulty?.id)}
              className={`text-xs px-3 py-2 rounded-full border transition-all duration-200 ${
                activeFilters?.difficulty === difficulty?.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : `${difficulty?.color} border-current hover:border-primary hover:text-primary`
              }`}
            >
              {difficulty?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Topics Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Topics</h3>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {topics?.map((topic) => (
            <button
              key={topic}
              onClick={() => onFilterChange('topic', topic)}
              className={`text-xs px-3 py-2 rounded-full border transition-all duration-200 ${
                activeFilters?.topics?.includes(topic)
                  ? 'border-secondary bg-secondary/10 text-secondary' :'border-border text-muted-foreground hover:border-secondary hover:text-secondary'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
      {/* Sort Options */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Sort By</h3>
        <div className="space-y-2">
          {sortOptions?.map((option) => (
            <button
              key={option?.id}
              onClick={() => onFilterChange('sortBy', option?.id)}
              className={`flex items-center space-x-3 w-full p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilters?.sortBy === option?.id
                  ? 'bg-accent/10 text-accent' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={option?.icon} size={14} />
              <span>{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Clear Filters */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          onClick={onClearFilters}
          iconName="X"
          iconPosition="left"
          className="text-sm"
        >
          Clear All Filters
        </Button>
      </div>
      {/* Active Filters Summary */}
      {Object.keys(activeFilters)?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
            Active Filters
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters)?.map(([key, value]) => {
              if (!value || (Array.isArray(value) && value?.length === 0)) return null;
              const displayValue = Array.isArray(value) ? value?.join(', ') : value;
              return (
                <span
                  key={key}
                  className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full flex items-center space-x-1"
                >
                  <span>{displayValue}</span>
                  <button
                    onClick={() => onFilterChange(key, null)}
                    className="hover:text-primary/70"
                  >
                    <Icon name="X" size={10} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;