import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onSuggestionSelect, suggestions = [] }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const popularSearches = [
    "Python projects for career switchers",
    "Frontend communities with senior mentors",
    "React 18 migration projects",
    "AI/ML learning cohorts",
    "Open source beginner projects",
    "DevOps automation communities",
    "Mobile app development teams",
    "Blockchain development groups"
  ];

  const recentSearches = [
    "React projects",
    "Python beginners",
    "Open source",
    "AI projects"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef?.current && 
        !inputRef?.current?.contains(event?.target) &&
        suggestionsRef?.current &&
        !suggestionsRef?.current?.contains(event?.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setQuery(value);
    setShowSuggestions(value?.length > 0 || true);
    setSelectedIndex(-1);
    onSearch(value);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    const allSuggestions = [...suggestions, ...popularSearches];
    
    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedIndex(prev => 
          prev < allSuggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedIndex >= 0) {
          const selectedSuggestion = allSuggestions?.[selectedIndex];
          handleSuggestionClick(selectedSuggestion);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef?.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onSuggestionSelect(suggestion);
    onSearch(suggestion);
  };

  const handleSearch = () => {
    if (query?.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    onSearch('');
    inputRef?.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder="Search communities... (e.g., 'Python projects for career switchers')"
          className="w-full pl-12 pr-20 py-4 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              iconName="X"
            />
          )}
          <Button
            variant="default"
            size="sm"
            onClick={handleSearch}
            iconName="Search"
            className="h-8"
          />
        </div>
      </div>
      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-medium z-50 max-h-96 overflow-y-auto"
        >
          {/* AI-powered suggestions */}
          {suggestions?.length > 0 && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Sparkles" size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">AI Suggestions</span>
              </div>
              <div className="space-y-1">
                {suggestions?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedIndex === index
                        ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent searches */}
          {query === '' && recentSearches?.length > 0 && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Recent Searches</span>
              </div>
              <div className="space-y-1">
                {recentSearches?.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors flex items-center justify-between group"
                  >
                    <span>{search}</span>
                    <Icon name="ArrowUpLeft" size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular searches */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {query === '' ? 'Popular Searches' : 'Try These Instead'}
              </span>
            </div>
            <div className="space-y-1">
              {popularSearches?.filter(search => 
                  query === '' || search?.toLowerCase()?.includes(query?.toLowerCase())
                )?.slice(0, 6)?.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedIndex === suggestions?.length + index
                        ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {search}
                  </button>
                ))}
            </div>
          </div>

          {/* Search tips */}
          <div className="p-4 bg-muted/30 border-t border-border">
            <div className="flex items-start gap-2">
              <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Search Tips</p>
                <p className="text-xs text-muted-foreground">
                  Try natural language like "React projects for beginners" or "AI communities with mentorship"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;