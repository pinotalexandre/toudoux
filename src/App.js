// src/App.js
import React from 'react';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { SortingModal } from './components/SortingModal';
import { useTodoLogic } from './hooks/useTodoLogic';
import './styles/App.css';

function App() {
    const {
        tasks,
        timeLeft,
        showModal,
        addTask,
        deleteTask,
        confirmSort
    } = useTodoLogic();

    return (
        <div className="container">
            <header>
                <h1>Ma ToDo List Quotidienne</h1>
                <div className="timer">
                    Prochain tri dans: <span>{timeLeft}</span>
                </div>
            </header>

            <AddTodo onAdd={addTask} />
            <TodoList tasks={tasks} onDelete={deleteTask} />
            <SortingModal
                show={showModal}
                tasks={tasks}
                onConfirm={confirmSort}
            />
        </div>
    );
}

export default App;
