// src/components/TodoItem.js
import React from 'react';

export const TodoItem = ({ task, onDelete }) => (
    <li className="task-item">
        <span>{task.text}</span>
        <button 
            className="delete-btn"
            onClick={() => onDelete(task.id)}
        >
            Supprimer
        </button>
    </li>
);
