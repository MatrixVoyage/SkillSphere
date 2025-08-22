import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const KanbanBoard = ({ tasks, onTaskUpdate, onTaskCreate }) => {
  const [draggedTask, setDraggedTask] = useState(null);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-muted', count: tasks?.filter(t => t?.status === 'todo')?.length },
    { id: 'inprogress', title: 'In Progress', color: 'bg-warning/10', count: tasks?.filter(t => t?.status === 'inprogress')?.length },
    { id: 'review', title: 'Review', color: 'bg-secondary/10', count: tasks?.filter(t => t?.status === 'review')?.length },
    { id: 'done', title: 'Done', color: 'bg-success/10', count: tasks?.filter(t => t?.status === 'done')?.length }
  ];

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, columnId) => {
    e?.preventDefault();
    if (draggedTask && draggedTask?.status !== columnId) {
      onTaskUpdate(draggedTask?.id, { status: columnId });
    }
    setDraggedTask(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const TaskCard = ({ task }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
      className="bg-card border border-border rounded-lg p-4 mb-3 cursor-move hover:shadow-md transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-foreground text-sm leading-tight">{task?.title}</h4>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Icon name="Edit" size={12} />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Icon name="MoreHorizontal" size={12} />
          </Button>
        </div>
      </div>

      {task?.description && (
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task?.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {task?.assignee && (
            <Image
              src={task?.assignee?.avatar}
              alt={task?.assignee?.name}
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          <div className="flex items-center space-x-1">
            <Icon name="Flag" size={12} className={getPriorityColor(task?.priority)} />
            <span className="text-xs text-muted-foreground capitalize">{task?.priority}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {task?.comments > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="MessageSquare" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{task?.comments}</span>
            </div>
          )}
          {task?.attachments > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="Paperclip" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{task?.attachments}</span>
            </div>
          )}
        </div>
      </div>

      {task?.dueDate && (
        <div className="flex items-center space-x-1 mt-2 pt-2 border-t border-border">
          <Icon name="Clock" size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Due {new Date(task.dueDate)?.toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Task Board</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onTaskCreate}
          iconName="Plus"
          iconPosition="left"
        >
          Add Task
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns?.map((column) => (
          <div
            key={column?.id}
            className={`${column?.color} rounded-lg p-4 min-h-96`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column?.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-foreground">{column?.title}</h4>
              <div className="bg-background/50 rounded-full px-2 py-1">
                <span className="text-xs font-medium text-foreground">{column?.count}</span>
              </div>
            </div>

            <div className="space-y-3">
              {tasks?.filter(task => task?.status === column?.id)?.map(task => (
                  <TaskCard key={task?.id} task={task} />
                ))}
            </div>

            {column?.id === 'todo' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onTaskCreate}
                className="w-full mt-3 border-2 border-dashed border-border hover:border-primary/50 text-muted-foreground hover:text-primary"
                iconName="Plus"
                iconPosition="left"
              >
                Add Task
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;