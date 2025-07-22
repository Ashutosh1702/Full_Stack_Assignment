const Todo = require('../models/Todo');

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description, dueDate, category } = req.body;
    if (!title || title.length > 100) {
      return res.status(400).json({ error: 'Title is required and must be at most 100 characters.' });
    }
    if (description && description.length > 500) {
      return res.status(400).json({ error: 'Description must be at most 500 characters.' });
    }
    if (!['Urgent', 'Non-Urgent'].includes(category)) {
      return res.status(400).json({ error: 'Category must be Urgent or Non-Urgent.' });
    }
    const todo = new Todo({
      title,
      description,
      dueDate,
      category,
      user: req.user.userId
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get todos (user: own, admin: all)
exports.getTodos = async (req, res) => {
  try {
    let todos;
    if (req.user.role === 'admin') {
      todos = await Todo.find().populate('user', 'username email');
    } else {
      todos = await Todo.find({ user: req.user.userId });
    }
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, category } = req.body;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    if (req.user.role !== 'admin' && todo.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    if (title && title.length > 100) {
      return res.status(400).json({ error: 'Title must be at most 100 characters.' });
    }
    if (description && description.length > 500) {
      return res.status(400).json({ error: 'Description must be at most 500 characters.' });
    }
    if (category && !['Urgent', 'Non-Urgent'].includes(category)) {
      return res.status(400).json({ error: 'Category must be Urgent or Non-Urgent.' });
    }
    if (title) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (dueDate !== undefined) todo.dueDate = dueDate;
    if (category) todo.category = category;
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    if (req.user.role !== 'admin' && todo.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await todo.deleteOne();
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}; 