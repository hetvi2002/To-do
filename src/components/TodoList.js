import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      text: todo.text,
      isComplete: false,
      createdAt: new Date().toISOString()
    };

    setTodos([newTodo, ...todos]);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? { ...item, text: newValue.text } : item)));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completeTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  return (
    <div className="todo-list">
      <TodoForm onSubmit={addTodo} />
      <div className="todo-items">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList; 