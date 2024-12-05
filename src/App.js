// src/App.js
import React from 'react';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { SortingModal } from './components/SortingModal';
import { useTodoLogic } from './hooks/useTodoLogic';
import logo from './assets/twodo.svg';
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
            {/* Header */}
            <header className="app-title">
                <img src={logo} alt="Twodo" className="logo" />
                <div className="timer" title="Time remaining until todo list reset">
                    {timeLeft}
                </div>
            </header>

            {/* Main Content */}
            <main>
                <AddTodo onAdd={addTask} />
                <TodoList tasks={tasks} onDelete={deleteTask} />
            </main>

            {/* Modal */}
            <SortingModal
                show={showModal}
                tasks={tasks}
                onConfirm={confirmSort}
            />

            {/* Footer */}
            <footer className="footer">
                Handcrafted by <a href="https://alexandre.ee" target="_blank" rel="noopener noreferrer">Alexandre Pinot</a> with ❤️
            </footer>
        </div>
    );
}

export default App;