// src/components/SortingModal.js
import React, { useState, useEffect } from 'react';

export const SortingModal = ({ show, tasks, onConfirm }) => {
    const [keepTasks, setKeepTasks] = useState([]);
    const [deleteTasks, setDeleteTasks] = useState([]);

    useEffect(() => {
        if (show) {
            setKeepTasks(tasks);
            setDeleteTasks([]);
        }
    }, [show, tasks]);

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('taskId', id);
    };

    const handleDrop = (e, targetList) => {
        e.preventDefault();
        const taskId = parseInt(e.dataTransfer.getData('taskId'));
        const task = tasks.find(t => t.id === taskId);
        
        if (targetList === 'keep') {
            setKeepTasks(prev => [...prev.filter(t => t.id !== task.id), task]);
            setDeleteTasks(prev => prev.filter(t => t.id !== task.id));
        } else {
            setDeleteTasks(prev => [...prev.filter(t => t.id !== task.id), task]);
            setKeepTasks(prev => prev.filter(t => t.id !== task.id));
        }
    };

    if (!show) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>C'est l'heure du tri quotidien !</h2>
                <div className="sort-container">
                    <div
                        className="keep-tasks"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, 'keep')}
                    >
                        <h3>Tâches à garder</h3>
                        <ul>
                            {keepTasks.map(task => (
                                <li
                                    key={task.id}
                                    className="task-sort-item"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, task.id)}
                                >
                                    {task.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div
                        className="delete-tasks"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, 'delete')}
                    >
                        <h3>Tâches à supprimer</h3>
                        <ul>
                            {deleteTasks.map(task => (
                                <li
                                    key={task.id}
                                    className="task-sort-item"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, task.id)}
                                >
                                    {task.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button 
                    className="confirm-btn"
                    onClick={() => onConfirm(keepTasks)}
                >
                    Confirmer le tri
                </button>
            </div>
        </div>
    );
};
