import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export const SortDialog = ({ open, onOpenChange, tasks, onConfirm }) => {
  const [keepTasks, setKeepTasks] = useState([]);
  const [deleteTasks, setDeleteTasks] = useState([]);

  useEffect(() => {
    if (open) {
      setKeepTasks([]);
      setDeleteTasks([...tasks]);
    }
  }, [open, tasks]);

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('taskId', task.id.toString());
  };

  const handleDrop = (e, targetList) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const task = tasks.find(t => t.id === taskId);
    
    if (targetList === 'keep') {
      setKeepTasks(prev => [...prev, task]);
      setDeleteTasks(prev => prev.filter(t => t.id !== task.id));
    } else {
      setDeleteTasks(prev => [...prev, task]);
      setKeepTasks(prev => prev.filter(t => t.id !== task.id));
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-background p-6 shadow-lg duration-200">
          <Dialog.Title className="text-xl font-semibold mb-2">
            It's time!
          </Dialog.Title>
          <Dialog.Description className="text-sm text-muted-foreground mb-6">
            Drag and drop todos you want to keep for today
          </Dialog.Description>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Task to delete</h3>
              <div
                className="min-h-[100px] p-4 border rounded-lg space-y-2"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, 'delete')}
              >
                {deleteTasks.map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    className="p-2 bg-muted rounded border cursor-move"
                  >
                    {task.text}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Task to keep</h3>
              <div
                className="min-h-[100px] p-4 border rounded-lg space-y-2"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, 'keep')}
              >
                {keepTasks.map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    className="p-2 bg-muted rounded border cursor-move"
                  >
                    {task.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => onOpenChange(false)}
              className="text-sm opacity-70 hover:opacity-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(keepTasks);
                onOpenChange(false);
              }}
              className="text-sm opacity-70 hover:opacity-100"
            >
              Confirm
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
