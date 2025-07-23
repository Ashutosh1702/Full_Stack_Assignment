// src/components/TodoApp.jsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // ✅ Requires: npm install uuid
import TodoCard from './TodoCard';
import { useTodos } from '../context/TodoContext';

const TodoApp = () => {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: '',
    completed: false,
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTodo((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreateOrUpdate = () => {
    if (!newTodo.title.trim()) {
      alert('Title is required');
      return;
    }

    if (editingId !== null) {
      updateTodo(editingId, newTodo);
      setEditingId(null);
    } else {
      addTodo(newTodo);
    }

    setNewTodo({
      title: '',
      description: '',
      dueDate: '',
      category: '',
      completed: false,
    });
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setNewTodo({ ...todo });
  };

  const handleDelete = (todoId) => {
    deleteTodo(todoId);
    if (editingId === todoId) {
      setEditingId(null);
      setNewTodo({
        title: '',
        description: '',
        dueDate: '',
        category: '',
        completed: false,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 sm:mt-10 p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
          {editingId !== null ? 'Edit Todo' : 'Create Todo'}
        </h2>

        <div className="space-y-4">
          <div>
            <input
              name="title"
              value={newTodo.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
          </div>

          <div>
            <textarea
              name="description"
              value={newTodo.description}
              onChange={handleChange}
              placeholder="Description"
              rows="3"
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                name="dueDate"
                type="date"
                value={newTodo.dueDate}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
            </div>

            <div>
              <input
                name="category"
                value={newTodo.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 py-2">
            <input
              type="checkbox"
              name="completed"
              checked={newTodo.completed}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-gray-700 text-base">Mark as Completed</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleCreateOrUpdate}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {editingId !== null ? 'Update Todo' : 'Add Todo'}
            </button>

            {editingId !== null && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setNewTodo({
                    title: '',
                    description: '',
                    dueDate: '',
                    category: '',
                    completed: false,
                  });
                }}
                className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Your Todos ({todos.length})
        </h3>
        {todos.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            <p className="text-lg">No todos yet. Create your first todo above!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onEdit={() => handleEdit(todo)}
              onDelete={() => handleDelete(todo.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoApp;
