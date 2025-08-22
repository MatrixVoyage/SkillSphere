import React from 'react';

import Button from '../../../components/ui/Button';

const SortOptions = ({ sortBy, sortOrder, onSortChange, viewMode, onViewModeChange }) => {
  const sortOptions = [
    { value: 'compatibility', label: 'Best Match', icon: 'Target' },
    { value: 'trending', label: 'Trending', icon: 'TrendingUp' },
    { value: 'newest', label: 'Newest', icon: 'Clock' },
    { value: 'members', label: 'Most Members', icon: 'Users' },
    { value: 'progress', label: 'Most Active', icon: 'Activity' },
    { value: 'alphabetical', label: 'A-Z', icon: 'ArrowUpDown' }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' },
    { value: 'compact', icon: 'LayoutGrid', label: 'Compact View' }
  ];

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      // Toggle sort order if same sort option is clicked
      onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort option with default order
      const defaultOrder = newSortBy === 'alphabetical' ? 'asc' : 'desc';
      onSortChange(newSortBy, defaultOrder);
    }
  };

  const getSortIcon = (option) => {
    if (sortBy === option?.value) {
      return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
    }
    return option?.icon;
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      {/* Sort Options */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground hidden sm:block">
          Sort by:
        </span>
        <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
          {sortOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={sortBy === option?.value ? "default" : "ghost"}
              size="sm"
              onClick={() => handleSortChange(option?.value)}
              className="text-xs"
              iconName={getSortIcon(option)}
              iconPosition="left"
            >
              <span className="hidden sm:inline">{option?.label}</span>
            </Button>
          ))}
        </div>
      </div>
      {/* View Mode Toggle */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground hidden sm:block">
          View:
        </span>
        <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
          {viewModes?.map((mode) => (
            <Button
              key={mode?.value}
              variant={viewMode === mode?.value ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange(mode?.value)}
              iconName={mode?.icon}
              title={mode?.label}
              className="w-8 h-8 p-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortOptions;