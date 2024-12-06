import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ tasks, onDelete, onToggle }) => {
    return (
        <div className="flex flex-col space-y-1 mt-8"> {/* Ajout de mt-8 */}
            {tasks.map(task => (
                <TodoItem
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};
