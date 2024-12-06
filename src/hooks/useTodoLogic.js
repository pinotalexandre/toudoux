// src/hooks/useTodoLogic.js
import { useState, useEffect } from 'react';
import { findEmoji } from '../utils/emojiMap';

export const useTodoLogic = () => {
    // États initiaux avec localStorage
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    
    const [showModal, setShowModal] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');
    const [lastSortTime, setLastSortTime] = useState(() => {
        return localStorage.getItem('lastSortTime') || getInitialSortTime();
    });

    // Fonction pour obtenir le temps initial (9h du matin)
    function getInitialSortTime() {
        const now = new Date();
        const nextSort = new Date();
        nextSort.setHours(9, 0, 0, 0);

        if (now.getHours() >= 9) {
            nextSort.setDate(nextSort.getDate() + 1);
        }

        return nextSort.getTime().toString();
    }

    // Fonction pour obtenir le prochain temps de tri
    function getNextSortTime() {
        const nextSort = new Date();
        nextSort.setHours(9, 0, 0, 0);
        nextSort.setDate(nextSort.getDate() + 1);
        return nextSort.getTime().toString();
    }

    // Persistance des tâches dans localStorage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Persistance du temps de tri dans localStorage
    useEffect(() => {
        localStorage.setItem('lastSortTime', lastSortTime);
    }, [lastSortTime]);

    // Gestion du compte à rebours et du modal de tri
    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const nextSortTime = parseInt(lastSortTime);
            const remaining = nextSortTime - now;

            // Si le temps est écoulé, montrer le modal
            if (remaining <= 0) {
                setShowModal(true);
                if (!showModal) {
                    setLastSortTime(getNextSortTime());
                }
                return;
            }

            // Calcul du temps restant
            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

            // Formatage du temps restant
            setTimeLeft(
                `${hours.toString().padStart(2, '0')}:${minutes
                    .toString()
                    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
        };

        const interval = setInterval(updateCountdown, 1000);
        updateCountdown();

        return () => clearInterval(interval);
    }, [lastSortTime, showModal]);

    // Ajouter une nouvelle tâche
    const addTask = (text) => {
        if (!text.trim()) return;

        const emoji = findEmoji(text);
        const newTask = {
            id: Date.now(),
            text: text.trim(),
            emoji: emoji,
            completed: false,
            createdAt: new Date().toISOString()
        };

        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    // Supprimer une tâche
    const deleteTask = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    // Basculer l'état d'une tâche (complet/incomplet)
    const toggleTask = (taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    // Confirmer le tri quotidien
    const confirmSort = (keptTasks) => {
        // Rafraîchir les emojis pour les tâches conservées
        const updatedTasks = keptTasks.map(task => ({
            ...task,
            emoji: findEmoji(task.text)
        }));
        
        setTasks(updatedTasks);
        setLastSortTime(getNextSortTime());
        setShowModal(false);
    };

    // Fonctions et états exposés
    return {
        tasks,
        timeLeft,
        showModal,
        addTask,
        deleteTask,
        toggleTask,
        confirmSort,
        setShowModal
    };
};
