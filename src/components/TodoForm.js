import React, { useState } from 'react';

function TodoForm({ onSubmit, edit }) {
  const [input, setInput] = useState(edit ? edit.value : '');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      text: input
    });

    setInput('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a todo"
        value={input}
        name="text"
        className="todo-input"
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="todo-button">
        {edit ? 'Update' : 'Add Todo'}
      </button>
    </form>
  );
}

export default TodoForm; 