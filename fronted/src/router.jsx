import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TodoForm from './pages/TodoForm';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            {user && <Link to="/" className="text-white font-semibold hover:text-blue-200 transition">Dashboard</Link>}
            {user && <Link to="/todos/new" className="text-white font-semibold hover:text-blue-200 transition">New Todo</Link>}
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-white font-semibold hover:text-blue-200 transition">Admin Dashboard</Link>
            )}
          </div>
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/login" className="text-white hover:text-blue-200 transition">Login</Link>
                <Link to="/register" className="text-white hover:text-blue-200 transition">Register</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="text-white hover:text-blue-200 transition">Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const AppRouter = () => (
  <Router>
    <Navbar />
    <div className="p-4 max-w-5xl mx-auto">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/todos/new" element={<TodoForm />} />
          <Route path="/todos/:id/edit" element={<TodoForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  </Router>
);

export default AppRouter; 