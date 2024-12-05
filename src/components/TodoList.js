// src/components/TodoList.js
import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ tasks, onDelete }) => (
    <div className="todo-list">
        <h2>Mes tâches</h2>
        <ul>
            {tasks.map(task => (
                <TodoItem
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    </div>
);
