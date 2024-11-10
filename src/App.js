import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>Todo App</h1>
        <TodoList />
      </div>
    </div>
  );
}

export default App; 