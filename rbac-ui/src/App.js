import React, { useState } from 'react';
import axios from 'axios';

// Configure axios base URL
axios.defaults.baseURL = 'http://localhost:3000';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '' });
    setMessage('');
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login
        const res = await axios.post('/api/auth/login', {
          username: formData.username,
          password: formData.password
        });
        setMessage('Login successful! Token: ' + res.data.token);
      } else {
        // Signup
        const res = await axios.post('/api/auth/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        setMessage('Signup successful! Please login.');
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20, border: '1px solid #ccc', borderRadius: 5 }}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Username</label><br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        {!isLogin && (
          <div style={{ marginBottom: 10 }}>
            <label>Email</label><br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div style={{ marginBottom: 10 }}>
          <label>Password</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p style={{ marginTop: 10 }}>
        {isLogin ? 'New user?' : 'Already have an account?'}{' '}
        <button onClick={toggleMode} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
      {message && <p>{message}</p>}
    </div>
  );
}
