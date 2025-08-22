import React from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onToggle,
  resultCount 
}) => {
  const categories = [
    'Frontend', 'Backend', 'Mobile', 'AI/ML', 'DevOps', 
    'Data Science', 'Blockchain', 'Game Dev'
  ];

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  
  const techStacks = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java',
    'TypeScript', 'Go', 'Rust', 'Docker', 'Kubernetes', 'AWS'
  ];

  const timeCommitments = [
    '1-5 hours/week', '5-10 hours/week', '10-20 hours/week', '20+ hours/week'
  ];

  const handleCheckboxChange = (filterType, value, checked) => {
    const currentValues = filters?.[filterType] || [];
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues?.filter(v => v !== value);
    
    onFilterChange(filterType, newValues);
  };

  const handleToggleChange = (filterType, checked) => {
    onFilterChange(filterType, checked);
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          className="w-full"
        >
          Filters {resultCount && `(${resultCount} results)`}
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`bg-card border border-border rounded-xl p-6 ${
        isOpen ? 'block' : 'hidden lg:block'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="lg:hidden"
              iconName="X"
            />
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            type="search"
            placeholder="Search communities..."
            value={filters?.search || ''}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Quick Filters */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Quick Filters</h3>
          <div className="space-y-3">
            <Checkbox
              label="Beginner-Friendly"
              checked={filters?.beginnerFriendly || false}
              onChange={(e) => handleToggleChange('beginnerFriendly', e?.target?.checked)}
            />
            <Checkbox
              label="Mentorship Available"
              checked={filters?.mentorshipAvailable || false}
              onChange={(e) => handleToggleChange('mentorshipAvailable', e?.target?.checked)}
            />
            <Checkbox
              label="Open Source"
              checked={filters?.openSource || false}
              onChange={(e) => handleToggleChange('openSource', e?.target?.checked)}
            />
            <Checkbox
              label="Career-Focused"
              checked={filters?.careerFocused || false}
              onChange={(e) => handleToggleChange('careerFocused', e?.target?.checked)}
            />
            <Checkbox
              label="New Communities"
              checked={filters?.newCommunities || false}
              onChange={(e) => handleToggleChange('newCommunities', e?.target?.checked)}
            />
            <Checkbox
              label="Trending"
              checked={filters?.trending || false}
              onChange={(e) => handleToggleChange('trending', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Category */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Category</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {categories?.map((category) => (
              <Checkbox
                key={category}
                label={category}
                checked={(filters?.categories || [])?.includes(category)}
                onChange={(e) => handleCheckboxChange('categories', category, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Difficulty Level */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Difficulty Level</h3>
          <div className="space-y-2">
            {difficulties?.map((difficulty) => (
              <Checkbox
                key={difficulty}
                label={difficulty}
                checked={(filters?.difficulties || [])?.includes(difficulty)}
                onChange={(e) => handleCheckboxChange('difficulties', difficulty, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Tech Stack</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {techStacks?.map((tech) => (
              <Checkbox
                key={tech}
                label={tech}
                checked={(filters?.techStack || [])?.includes(tech)}
                onChange={(e) => handleCheckboxChange('techStack', tech, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Time Commitment */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Time Commitment</h3>
          <div className="space-y-2">
            {timeCommitments?.map((time) => (
              <Checkbox
                key={time}
                label={time}
                checked={(filters?.timeCommitments || [])?.includes(time)}
                onChange={(e) => handleCheckboxChange('timeCommitments', time, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Compatibility Score Range */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Minimum Compatibility</h3>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              value={filters?.minCompatibility || 0}
              onChange={(e) => onFilterChange('minCompatibility', parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span className="font-medium text-foreground">{filters?.minCompatibility || 0}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Member Count Range */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Community Size</h3>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters?.minMembers || ''}
              onChange={(e) => onFilterChange('minMembers', e?.target?.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters?.maxMembers || ''}
              onChange={(e) => onFilterChange('maxMembers', e?.target?.value)}
            />
          </div>
        </div>

        {/* Results Count */}
        {resultCount !== undefined && (
          <div className="pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground text-center">
              {resultCount} communities found
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterPanel;