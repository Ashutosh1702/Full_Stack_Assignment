import React from 'react';
import AppRouter from './router';
import { TodoProvider } from './context/TodoContext';

const App = () => {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-200">
        <AppRouter />
      </div>
    </TodoProvider>
  );
};

export default App;
