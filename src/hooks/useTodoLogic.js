// src/hooks/useTodoLogic.js
import { useState, useEffect } from 'react';

export const useTodoLogic = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    
    const [showModal, setShowModal] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');
    const [lastSortTime, setLastSortTime] = useState(() => {
        return localStorage.getItem('lastSortTime') || getInitialSortTime();
    });

    // Fonction pour obtenir le prochain temps de tri à 9h
    function getInitialSortTime() {
        const now = new Date();
        const nextSort = new Date();
        nextSort.setHours(9, 0, 0, 0);

        // Si il est déjà plus de 9h, on prend le lendemain à 9h
        if (now.getHours() >= 9) {
            nextSort.setDate(nextSort.getDate() + 1);
        }

        return nextSort.getTime();
    }

    // Fonction pour obtenir le prochain temps de tri
    function getNextSortTime() {
        const nextSort = new Date();
        nextSort.setHours(9, 0, 0, 0);

        // Toujours ajouter un jour pour le prochain tri
        nextSort.setDate(nextSort.getDate() + 1);

        return nextSort.getTime();
    }

    // Sauvegarder les tâches dans localStorage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Sauvegarder le temps du dernier tri
    useEffect(() => {
        localStorage.setItem('lastSortTime', lastSortTime);
    }, [lastSortTime]);

    // Mise à jour du compte à rebours
    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const nextSortTime = parseInt(lastSortTime);
            const remaining = nextSortTime - now;

            if (remaining <= 0) {
                // Si le temps est écoulé, montrer le modal et mettre à jour le prochain temps de tri
                setShowModal(true);
                if (!showModal) {  // Pour éviter les mises à jour en boucle
                    setLastSortTime(getNextSortTime());
                }
                return;
            }

            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

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

    const addTask = (text) => {
        const newTask = {
            id: Date.now(),
            text,
            createdAt: new Date().getTime()
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const deleteTask = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    const confirmSort = (keptTasks) => {
        setTasks(keptTasks);
        setLastSortTime(getNextSortTime());
        setShowModal(false);
    };

    // Vérification initiale
    useEffect(() => {
        const now = new Date().getTime();
        if (now >= parseInt(lastSortTime)) {
            setShowModal(true);
        }
    }, [lastSortTime]);

    return {
        tasks,
        timeLeft,
        showModal,
        addTask,
        deleteTask,
        confirmSort
    };
};
