// src/context/TodoContext.js
import { createContext, useContext, useReducer, useEffect } from 'react';

const TodoContext = createContext();

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                ...state,
                tasks: action.payload
            };
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        case 'UPDATE_SORT_TIME':
            return {
                ...state,
                lastSortTime: action.payload
            };
        default:
            return state;
    }
};

export const TodoProvider = ({ children }) => {
    const initialState = {
        tasks: JSON.parse(localStorage.getItem('tasks')) || [],
        lastSortTime: localStorage.getItem('lastSortTime') || new Date().getTime()
    };

    const [state, dispatch] = useReducer(todoReducer, initialState);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
        localStorage.setItem('lastSortTime', state.lastSortTime);
    }, [state.tasks, state.lastSortTime]);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
};
