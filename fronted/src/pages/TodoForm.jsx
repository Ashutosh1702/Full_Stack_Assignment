// pages/TodoForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodos } from '../context/TodoContext';

const TodoForm = () => {
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: '',
    completed: false,
  });
  const [savedTodo, setSavedTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addTodo } = useTodos();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodo((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo.title.trim()) {
      alert('Title is required');
      return;
    }

    setIsLoading(true);
    try {
      // Save the todo using TodoContext
      const newTodo = addTodo(todo);
      console.log('Todo saved successfully:', newTodo);
      
      // Store the saved todo to display below
      setSavedTodo({ ...todo, id: newTodo.id || Date.now() });
      
      // Reset the form
      setTodo({
        title: '',
        description: '',
        dueDate: '',
        category: '',
        completed: false,
      });
      
      // Show success message
      alert('Todo created successfully!');
    } catch (error) {
      console.error('Error saving todo:', error);
      alert('Failed to save todo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-4 sm:mt-10 p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">Create New Todo</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="title"
            value={todo.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
        </div>

        <div>
          <textarea
            name="description"
            value={todo.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base resize-none"
          />
        </div>

        <div>
          <input
            name="dueDate"
            type="date"
            value={todo.dueDate}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
        </div>

        <div>
          <input
            name="category"
            value={todo.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
        </div>

        <div className="flex items-center space-x-3 py-2">
          <input
            type="checkbox"
            name="completed"
            checked={todo.completed}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <span className="text-gray-700 text-base">Mark as Completed</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? 'Saving...' : 'Save Todo'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/todos')}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Display saved todo below the form */}
      {savedTodo && (
        <div className="mt-8 p-4 sm:p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Todo Saved Successfully!
          </h3>
          
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Title:</span>
              <p className="text-gray-900 mt-1">{savedTodo.title}</p>
            </div>
            
            {savedTodo.description && (
              <div>
                <span className="font-medium text-gray-700">Description:</span>
                <p className="text-gray-900 mt-1">{savedTodo.description}</p>
              </div>
            )}
            
            {savedTodo.dueDate && (
              <div>
                <span className="font-medium text-gray-700">Due Date:</span>
                <p className="text-gray-900 mt-1">{new Date(savedTodo.dueDate).toLocaleDateString()}</p>
              </div>
            )}
            
            {savedTodo.category && (
              <div>
                <span className="font-medium text-gray-700">Category:</span>
                <p className="text-gray-900 mt-1">{savedTodo.category}</p>
              </div>
            )}
            
            <div>
              <span className="font-medium text-gray-700">Status:</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                savedTodo.completed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {savedTodo.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-green-200">
            <button
              onClick={() => navigate('/todos')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              View All Todos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoForm;
