// src/components/AddTodo.js
import React, { useState, useRef, useEffect } from 'react';

export const AddTodo = ({ onAdd }) => {
    const [text, setText] = useState('');
    const textareaRef = useRef(null);

    // Fonction pour ajuster la hauteur
    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    // Ajuster la hauteur quand le texte change
    useEffect(() => {
        adjustHeight();
    }, [text]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            if (text.trim()) {
                onAdd(text);
                setText('');
            }
        }
        else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            setText(prev => 
                prev.substring(0, selectionStart) + 
                '\n' + 
                prev.substring(selectionEnd)
            );
        }
    };

    return (
        <form className="todo-input" onSubmit={(e) => e.preventDefault()}>
            <div className="input-wrapper">
            <textarea
    ref={textareaRef}
    value={text}
    onChange={(e) => setText(e.target.value)}
    onKeyDown={handleKeyDown}
    placeholder="My Daily Todo — Start typing..."
    className="fullscreen-input"
    rows="1"
/>
                <div className="enter-hint" title="Entrée pour ajouter, Cmd+Entrée pour nouvelle ligne">
                    <span className="enter-key">⌘↵</span>
                    <span className="hint-text">Nouvelle ligne</span>
                </div>
            </div>
        </form>
    );
};
