import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ tasks, onDelete }) => (
    <div className="todo-list">
        {tasks.map(task => (
            <TodoItem
                key={task.id}
                task={task}
                onDelete={onDelete}
            />
        ))}
    </div>
);