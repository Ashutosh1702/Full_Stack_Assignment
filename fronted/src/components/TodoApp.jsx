// src/components/TodoApp.jsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // ✅ Requires: npm install uuid
import TodoCard from './TodoCard';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: '',
    completed: false,
  });
  const [editingIndex, setEditingIndex] = useState(null);

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

    if (editingIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = { ...newTodo };
      setTodos(updatedTodos);
      setEditingIndex(null);
    } else {
      setTodos((prev) => [...prev, { ...newTodo, id: uuidv4() }]);
    }

    setNewTodo({
      title: '',
      description: '',
      dueDate: '',
      category: '',
      completed: false,
    });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewTodo({ ...todos[index] });
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
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
    <div className="max-w-xl mx-auto mt-10 p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-4">{editingIndex !== null ? 'Edit Todo' : 'Create Todo'}</h2>

      <input
        name="title"
        value={newTodo.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full mb-2 p-2 border"
      />

      <input
        name="description"
        value={newTodo.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-2 p-2 border"
      />

      <input
        name="dueDate"
        type="date"
        value={newTodo.dueDate}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
      />

      <input
        name="category"
        value={newTodo.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full mb-2 p-2 border"
      />

      <label className="inline-flex items-center mb-4">
        <input
          type="checkbox"
          name="completed"
          checked={newTodo.completed}
          onChange={handleChange}
          className="mr-2"
        />
        <span>Mark as Completed</span>
      </label>

      <div className="flex gap-2 mt-2">
        <button
          onClick={handleCreateOrUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>

        {editingIndex !== null && (
          <button
            onClick={() => {
              setEditingIndex(null);
              setNewTodo({
                title: '',
                description: '',
                dueDate: '',
                category: '',
                completed: false,
              });
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="mt-6">
        {todos.map((todo, index) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
