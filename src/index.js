// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { TodoProvider } from './context/TodoContext';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <TodoProvider>
            <App />
        </TodoProvider>
    </React.StrictMode>
);
