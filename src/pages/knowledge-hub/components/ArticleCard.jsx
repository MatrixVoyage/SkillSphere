import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ArticleCard = ({ article, onBookmark, onShare, onRead }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Intermediate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Advanced':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'tutorial':
        return 'BookOpen';
      case 'case-study':
        return 'FileText';
      case 'expert-insight':
        return 'Star';
      case 'community':
        return 'Users';
      default:
        return 'FileText';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-medium transition-all duration-300 group">
      {/* Article Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getTypeIcon(article?.type)} size={20} className="text-primary" />
          </div>
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {article?.type?.replace('-', ' ')}
            </span>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(article?.difficulty)}`}>
                {article?.difficulty}
              </span>
              <span className="text-xs text-muted-foreground">
                {article?.readTime} min read
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBookmark(article?.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            iconName={article?.isBookmarked ? "BookmarkCheck" : "Bookmark"}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onShare(article)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            iconName="Share2"
          />
        </div>
      </div>
      {/* Article Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {article?.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {article?.excerpt}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full"
            >
              #{tag}
            </span>
          ))}
          {article?.tags?.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{article?.tags?.length - 3} more
            </span>
          )}
        </div>
      </div>
      {/* Article Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={article?.author?.avatar}
              alt={article?.author?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {article?.author?.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {article?.publishedAt}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Eye" size={14} />
            <span className="text-xs">{article?.views}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="MessageCircle" size={14} />
            <span className="text-xs">{article?.comments}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="ThumbsUp" size={14} />
            <span className="text-xs">{article?.likes}</span>
          </div>
        </div>
      </div>
      {/* Read Button */}
      <div className="mt-4">
        <Button
          variant="outline"
          fullWidth
          onClick={() => onRead(article)}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Read Article
        </Button>
      </div>
    </div>
  );
};

export default ArticleCard;