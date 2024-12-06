import React from 'react';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { SortDialog } from './components/SortDialog';
import { useTodoLogic } from './hooks/useTodoLogic';
import logo from './assets/twodo.svg';

function App() {
  const {
    tasks,
    timeLeft,
    showModal,
    addTask,
    deleteTask,
    toggleTask,
    confirmSort,
    setShowModal
  } = useTodoLogic();

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      <header className="flex justify-between items-center mb-6">
        <img 
          src={logo} 
          alt="Twodo" 
          className="h-6 opacity-80 hover:opacity-100 transition-opacity" 
        />
        <div 
          className="text-sm text-muted-foreground opacity-80"
          title="Time remaining until todo list reset"
        >
          {timeLeft}
        </div>
      </header>

      <p className="text-sm text-muted-foreground mb-8">
        Every 24 hours, you are forced to sort your to-do list.
      </p>

      <main>
        <AddTodo onAdd={addTask} />
        <TodoList 
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />
      </main>

      <SortDialog
        open={showModal}
        onOpenChange={setShowModal}
        tasks={tasks}
        onConfirm={confirmSort}
      />

      <footer className="fixed bottom-0 left-0 w-full p-4 text-center text-sm text-muted-foreground bg-background/80 backdrop-blur-sm">
        Handcrafted by{" "}
        <a
          href="https://alexandre.ee"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:opacity-70 transition-opacity"
        >
          Alexandre Pinot
        </a>
        {" "}with ❤️
      </footer>
    </div>
  );
}

export default App;
