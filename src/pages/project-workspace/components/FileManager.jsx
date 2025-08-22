import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FileManager = ({ files, onFileUpload, onFileDelete, onFileShare }) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sortBy, setSortBy] = useState('name'); // 'name', 'date', 'size', 'type'
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fileTypes = {
    'image': { icon: 'Image', color: 'text-success' },
    'document': { icon: 'FileText', color: 'text-primary' },
    'code': { icon: 'Code', color: 'text-accent' },
    'archive': { icon: 'Archive', color: 'text-warning' },
    'video': { icon: 'Video', color: 'text-destructive' },
    'audio': { icon: 'Music', color: 'text-secondary' },
    'other': { icon: 'File', color: 'text-muted-foreground' }
  };

  const getFileType = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp']?.includes(extension)) return 'image';
    if (['pdf', 'doc', 'docx', 'txt', 'md']?.includes(extension)) return 'document';
    if (['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'py', 'java', 'cpp']?.includes(extension)) return 'code';
    if (['zip', 'rar', '7z', 'tar', 'gz']?.includes(extension)) return 'archive';
    if (['mp4', 'avi', 'mov', 'wmv', 'flv']?.includes(extension)) return 'video';
    if (['mp3', 'wav', 'flac', 'aac']?.includes(extension)) return 'audio';
    return 'other';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredFiles = files?.filter(file =>
    file?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    file?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
  );

  const sortedFiles = [...filteredFiles]?.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a?.name?.localeCompare(b?.name);
      case 'date':
        return new Date(b.uploadedAt) - new Date(a.uploadedAt);
      case 'size':
        return b?.size - a?.size;
      case 'type':
        return getFileType(a?.name)?.localeCompare(getFileType(b?.name));
      default:
        return 0;
    }
  });

  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => 
      prev?.includes(fileId) 
        ? prev?.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    setSelectedFiles(
      selectedFiles?.length === sortedFiles?.length 
        ? [] 
        : sortedFiles?.map(file => file?.id)
    );
  };

  const FileItem = ({ file }) => {
    const fileType = getFileType(file?.name);
    const typeInfo = fileTypes?.[fileType];
    const isSelected = selectedFiles?.includes(file?.id);

    return (
      <div className={`group border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-200 ${
        isSelected ? 'bg-primary/5 border-primary/20' : 'bg-background'
      }`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleFileSelect(file?.id)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
            />
          </div>
          
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            fileType === 'image' ? 'bg-success/10' :
            fileType === 'document' ? 'bg-primary/10' :
            fileType === 'code' ? 'bg-accent/10' :
            fileType === 'archive' ? 'bg-warning/10' :
            fileType === 'video' ? 'bg-destructive/10' :
            fileType === 'audio'? 'bg-secondary/10' : 'bg-muted'
          }`}>
            <Icon name={typeInfo?.icon} size={20} className={typeInfo?.color} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground truncate">{file?.name}</h4>
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="Download" size={14} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => onFileShare(file?.id)}
                >
                  <Icon name="Share" size={14} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="MoreHorizontal" size={14} />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
              <span>{formatFileSize(file?.size)}</span>
              <span>•</span>
              <span>{formatDate(file?.uploadedAt)}</span>
              <span>•</span>
              <span>by {file?.uploadedBy}</span>
            </div>
            
            {file?.tags && file?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {file?.tags?.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {file?.description && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {file?.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Folder" size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Project Files</h3>
            <p className="text-sm text-muted-foreground">
              {files?.length} files • {formatFileSize(files?.reduce((sum, file) => sum + file?.size, 0))}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowUploadModal(true)}
            iconName="Upload"
            iconPosition="left"
          >
            Upload
          </Button>
          
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-r-none border-0"
            >
              <Icon name="List" size={16} />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-l-none border-0"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Filters and Search */}
      <div className="flex items-center justify-between mb-6 space-x-4">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
            <option value="size">Sort by Size</option>
            <option value="type">Sort by Type</option>
          </select>
          
          {selectedFiles?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedFiles?.length} selected
              </span>
              <Button variant="outline" size="sm" iconName="Download">
                Download
              </Button>
              <Button variant="outline" size="sm" iconName="Trash2" className="text-destructive">
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* File List Header */}
      {sortedFiles?.length > 0 && (
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedFiles?.length === sortedFiles?.length}
              onChange={handleSelectAll}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-foreground">
              {selectedFiles?.length > 0 ? `${selectedFiles?.length} selected` : 'Select all'}
            </span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Size</span>
            <span>Modified</span>
            <span>Actions</span>
          </div>
        </div>
      )}
      {/* Files List */}
      <div className="space-y-2">
        {sortedFiles?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Folder" size={24} className="text-muted-foreground" />
            </div>
            <h4 className="font-medium text-foreground mb-2">No files found</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery ? 'Try adjusting your search terms' : 'Upload files to get started'}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUploadModal(true)}
              iconName="Upload"
              iconPosition="left"
            >
              Upload Files
            </Button>
          </div>
        ) : (
          sortedFiles?.map((file) => (
            <FileItem key={file?.id} file={file} />
          ))
        )}
      </div>
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Upload Files</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUploadModal(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground font-medium mb-2">Drop files here or click to browse</p>
              <p className="text-sm text-muted-foreground mb-4">
                Support for images, documents, code files, and more
              </p>
              <Button variant="outline" size="sm">
                Choose Files
              </Button>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </Button>
              <Button variant="default" size="sm">
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileManager;