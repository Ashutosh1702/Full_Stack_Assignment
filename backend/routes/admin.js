const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const User = require('../models/User');
const Todo = require('../models/Todo');

// All admin routes require authentication and admin role
router.use(auth, role('admin'));

// @route   GET /api/admin/users
// @desc    Get all users (admin only)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/todos
// @desc    Get all todos (admin only)
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find().populate('user', 'username email');
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PATCH /api/admin/users/:id/role
// @desc    Change user role (admin only)
router.patch('/users/:id/role', async (req, res) => {
  try {
    const { role: newRole } = req.body;
    if (!['user', 'admin'].includes(newRole)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: newRole },
      { new: true, runValidators: true }
    ).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 