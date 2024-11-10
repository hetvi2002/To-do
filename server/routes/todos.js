const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Todo = require('../models/Todo');

// Get all todos with filter
router.get('/', auth, async (req, res) => {
  try {
    const { filter } = req.query;
    let query = { user: req.user.user.id };

    // Add filter conditions
    if (filter === 'pending') {
      query.completed = false;
    } else if (filter === 'completed') {
      query.completed = true;
    }

    const todos = await Todo.find(query).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create todo
router.post('/', auth, async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      user: req.user.user.id
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update todo status
router.put('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (todo.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (todo.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 