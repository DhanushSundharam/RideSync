import React from 'react';
import { Users, Car, Map, DollarSign } from 'lucide-react';
import './Dashboard.css';
import { MOCK_USERS } from '../services/mockData';

const AdminDashboard = () => {
  const users = Object.values(MOCK_USERS);
  const drivers = users.filter(u => u.role === 'driver');
  const customers = users.filter(u => u.role === 'customer');

  return (
    <div className="dashboard-container container">
      <header className="dashboard-header">
        <h1>Admin Control Panel</h1>
        <p>Overview of platform activity and users.</p>
      </header>

      <div className="dashboard-stats">
        <div className="glass-card stat-card">
          <span className="stat-title"><Users size={16} style={{marginRight: 6, verticalAlign: 'middle'}}/> Total Customers</span>
          <span className="stat-value">{customers.length}</span>
        </div>
        <div className="glass-card stat-card">
          <span className="stat-title"><Car size={16} style={{marginRight: 6, verticalAlign: 'middle'}}/> Total Drivers</span>
          <span className="stat-value">{drivers.length}</span>
        </div>
        <div className="glass-card stat-card">
          <span className="stat-title"><Map size={16} style={{marginRight: 6, verticalAlign: 'middle'}}/> Active Rides</span>
          <span className="stat-value">3</span>
        </div>
        <div className="glass-card stat-card">
          <span className="stat-title"><DollarSign size={16} style={{marginRight: 6, verticalAlign: 'middle'}}/> Revenue (Today)</span>
          <span className="stat-value">$1,240</span>
        </div>
      </div>

      <div className="glass-card">
        <h3>Recent User Registrations</h3>
        <div className="list-container mt-md">
          {users.map(user => (
            <div key={user.id} className="list-item">
              <div className="flex items-center gap-md">
                <div style={{width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Users size={20} color="var(--accent-primary)" />
                </div>
                <div>
                  <p style={{fontWeight: 600}}>{user.name}</p>
                  <p className="text-secondary" style={{fontSize: '0.85rem'}}>ID: {user.id}</p>
                </div>
              </div>
              <div>
                <span className="role-badge">{user.role}</span>
                {user.role === 'driver' && (
                  <span style={{marginLeft: 12, fontSize: '0.85rem', color: user.status === 'online' ? 'var(--success)' : 'var(--text-muted)'}}>
                    {user.status === 'online' ? '● Online' : '○ Offline'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
