// src/components/AddTodo.js
import React, { useState } from 'react';

export const AddTodo = ({ onAdd }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text);
            setText('');
        }
    };

    return (
        <form className="todo-input" onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ajouter une nouvelle tâche..."
            />
            <button type="submit">Ajouter</button>
        </form>
    );
};
