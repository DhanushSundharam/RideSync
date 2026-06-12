import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_USERS } from '../services/mockData';
import './Login.css';

const Login = ({ setUser }) => {
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login by picking the first mock user of the selected role
    const mockUser = Object.values(MOCK_USERS).find(u => u.role === role);
    if (mockUser) {
      setUser(mockUser);
      navigate(`/${mockUser.role}`);
    }
  };

  return (
    <div className="login-container">
      <div className="glass-card login-card">
        <h2>Welcome to RideSync</h2>
        <p className="subtitle">Sign in to book or drive</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="role-selector">
            <button 
              type="button" 
              className={`role-btn ${role === 'customer' ? 'active' : ''}`}
              onClick={() => setRole('customer')}
            >
              Customer
            </button>
            <button 
              type="button" 
              className={`role-btn ${role === 'driver' ? 'active' : ''}`}
              onClick={() => setRole('driver')}
            >
              Driver
            </button>
            <button 
              type="button" 
              className={`role-btn ${role === 'admin' ? 'active' : ''}`}
              onClick={() => setRole('admin')}
            >
              Admin
            </button>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input type="email" className="input-field" placeholder={`Enter ${role} email`} defaultValue={`demo@${role}.com`} required />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input type="password" className="input-field" placeholder="Enter password" defaultValue="password" required />
          </div>

          <button type="submit" className="btn-primary w-full mt-md">
            Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>
        
        <div className="demo-notice">
          <p>This is a prototype. Click Sign In to use demo accounts.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
