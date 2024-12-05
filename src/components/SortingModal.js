// src/components/SortingModal.js
import React, { useState, useEffect } from 'react';

export const SortingModal = ({ show, tasks, onConfirm }) => {
    const [keepTasks, setKeepTasks] = useState([]);
    const [deleteTasks, setDeleteTasks] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);

    // Reset tasks when modal opens
    useEffect(() => {
        if (show) {
            setKeepTasks(tasks);
            setDeleteTasks([]);
        }
    }, [show, tasks]);

    // Drag start handler
    const handleDragStart = (e, task) => {
        setDraggedItem(task);
        e.dataTransfer.effectAllowed = 'move';
        // Add styling to dragged item
        e.target.classList.add('dragging');
    };

    // Drag end handler
    const handleDragEnd = (e) => {
        e.target.classList.remove('dragging');
        setDraggedItem(null);
    };

    // Drag over handler
    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    // Drop handler
    const handleDrop = (targetList) => {
        if (!draggedItem) return;

        if (targetList === 'keep') {
            setKeepTasks(prev => {
                const filtered = prev.filter(t => t.id !== draggedItem.id);
                return [...filtered, draggedItem];
            });
            setDeleteTasks(prev => prev.filter(t => t.id !== draggedItem.id));
        } else {
            setDeleteTasks(prev => {
                const filtered = prev.filter(t => t.id !== draggedItem.id);
                return [...filtered, draggedItem];
            });
            setKeepTasks(prev => prev.filter(t => t.id !== draggedItem.id));
        }
    };

    // Handle confirm
    const handleConfirm = () => {
        onConfirm(keepTasks);
    };

    if (!show) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <header className="modal-header">
                    <h2>Time for your daily sort</h2>
                    <p className="modal-subtitle">
                        Drag and drop tasks to organize them
                    </p>
                </header>

                <div className="sort-container">
                    {/* Keep Section */}
                    <section 
                        className="sort-section keep-tasks"
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop('keep')}
                    >
                        <h3>
                            Keep
                            <span className="task-count">
                                {keepTasks.length}
                            </span>
                        </h3>
                        <div className="sort-items">
                            {keepTasks.map(task => (
                                <div
                                    key={task.id}
                                    className="task-sort-item"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, task)}
                                    onDragEnd={handleDragEnd}
                                >
                                    <span className="task-text">{task.text}</span>
                                    <div className="task-drag-handle">
                                        ⋮
                                    </div>
                                </div>
                            ))}
                            {keepTasks.length === 0 && (
                                <div className="empty-state">
                                    Drop tasks here to keep them
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Delete Section */}
                    <section 
                        className="sort-section delete-tasks"
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop('delete')}
                    >
                        <h3>
                            Remove
                            <span className="task-count">
                                {deleteTasks.length}
                            </span>
                        </h3>
                        <div className="sort-items">
                            {deleteTasks.map(task => (
                                <div
                                    key={task.id}
                                    className="task-sort-item"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, task)}
                                    onDragEnd={handleDragEnd}
                                >
                                    <span className="task-text">{task.text}</span>
                                    <div className="task-drag-handle">
                                        ⋮
                                    </div>
                                </div>
                            ))}
                            {deleteTasks.length === 0 && (
                                <div className="empty-state">
                                    Drop tasks here to remove them
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                <footer className="modal-footer">
                    <button 
                        className="confirm-btn"
                        onClick={handleConfirm}
                    >
                        Confirm and continue
                    </button>
                </footer>
            </div>
        </div>
    );
};
