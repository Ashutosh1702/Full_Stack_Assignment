const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
// const auth = require('../middleware/auth'); // Uncomment when auth middleware is ready

// All routes should be protected with auth middleware
// router.use(auth);

// @route   GET /api/todos
// @desc    Get todos (user: own, admin: all)
// @access  Protected
router.get('/', todoController.getTodos);

// @route   POST /api/todos
// @desc    Create a new todo
// @access  Protected
router.post('/', todoController.createTodo);

// @route   PUT /api/todos/:id
// @desc    Update a todo
// @access  Protected
router.put('/:id', todoController.updateTodo);

// @route   DELETE /api/todos/:id
// @desc    Delete a todo
// @access  Protected
router.delete('/:id', todoController.deleteTodo);

module.exports = router; 