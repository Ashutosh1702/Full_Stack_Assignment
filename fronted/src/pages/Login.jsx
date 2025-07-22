import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import Button from '../components/Button';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ emailOrUsername: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const payload = form.emailOrUsername.includes('@')
        ? { email: form.emailOrUsername, password: form.password }
        : { username: form.emailOrUsername, password: form.password };
      const res = await api.post('/auth/login', payload);
      login(res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="emailOrUsername"
          placeholder="Email or Username"
          value={form.emailOrUsername}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login; 