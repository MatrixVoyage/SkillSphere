import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const BookmarkPanel = ({ bookmarks, onRemoveBookmark, onOpenArticle, onCreateCollection }) => {
  const collections = [
    { id: 1, name: 'React Best Practices', count: 12, color: 'bg-blue-500' },
    { id: 2, name: 'Machine Learning', count: 8, color: 'bg-green-500' },
    { id: 3, name: 'DevOps & Cloud', count: 15, color: 'bg-purple-500' },
    { id: 4, name: 'Career Growth', count: 6, color: 'bg-orange-500' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Bookmark" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            My Bookmarks
          </h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onCreateCollection}
          iconName="Plus"
          iconPosition="left"
        >
          New Collection
        </Button>
      </div>
      {/* Collections */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Collections</h3>
        <div className="space-y-2">
          {collections?.map((collection) => (
            <div
              key={collection?.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${collection?.color}`}></div>
                <span className="text-sm font-medium text-foreground">
                  {collection?.name}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {collection?.count} items
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Bookmarks */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Recent Bookmarks</h3>
        <div className="space-y-3">
          {bookmarks?.slice(0, 5)?.map((bookmark) => (
            <div
              key={bookmark?.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={bookmark?.thumbnail}
                  alt={bookmark?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
                  {bookmark?.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {bookmark?.author} • {bookmark?.readTime} min read
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onOpenArticle(bookmark)}
                    className="text-xs h-6 px-2"
                  >
                    Read
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveBookmark(bookmark?.id)}
                    className="text-xs h-6 px-2 text-red-500 hover:text-red-600"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* View All */}
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All Bookmarks ({bookmarks?.length})
        </Button>
      </div>
    </div>
  );
};

export default BookmarkPanel;