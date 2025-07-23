import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodoContext = createContext();

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage on initialization
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoData) => {
    const newTodo = {
      ...todoData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setTodos(prev => [...prev, newTodo]);
    return newTodo;
  };

  const updateTodo = (id, updatedData) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, ...updatedData, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const getTodoById = (id) => {
    return todos.find(todo => todo.id === id);
  };

  const toggleTodoComplete = (id) => {
    updateTodo(id, { 
      completed: !todos.find(todo => todo.id === id)?.completed 
    });
  };

  const value = {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    getTodoById,
    toggleTodoComplete,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
