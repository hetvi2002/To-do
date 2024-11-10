import React, { useState } from 'react';
import TodoForm from './TodoForm';

function TodoItem({ todo, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <div className={todo.isComplete ? 'todo-item complete' : 'todo-item'}>
      <div className="todo-text" onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className="todo-actions">
        <button 
          className="edit-button"
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
        >
          Edit
        </button>
        <button
          className="delete-button"
          onClick={() => removeTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem; 