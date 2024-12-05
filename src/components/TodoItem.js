import React from 'react';

export const TodoItem = ({ task, onDelete }) => (
    <div className="task-item">
        <span>{task.text}</span>
        <button 
            className="delete-btn"
            onClick={() => onDelete(task.id)}
        >
            ×
        </button>
    </div>
);