// src/components/AddTodo.js
import React, { useState, useRef, useEffect } from 'react';

export const AddTodo = ({ onAdd }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  // Auto-focus au chargement
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Gestionnaire pour maintenir le focus
  useEffect(() => {
    const handleClick = () => {
      textareaRef.current?.focus();
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      if (text.trim()) {
        onAdd(text);
        setText('');
      }
    } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      setText(
        text.substring(0, selectionStart) +
        '\n' +
        text.substring(selectionEnd)
      );
    }
  };

  const handleTextAreaClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="relative group">
        <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="My daily todo"
            className="w-full text-[40px] leading-[1.2] font-normal resize-none overflow-hidden bg-transparent border-none outline-none placeholder:text-muted-foreground/20 placeholder:font-normal focus:ring-0 p-0" // Changé font-light à font-normal
            rows="1"
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-60 transition-opacity px-3 py-1.5 pointer-events-none">
            Press <span className="border-2 border-b-[3px] border-muted-foreground/20 rounded px-1">⌘↵</span> for line break
        </div>
    </div>
);
};
