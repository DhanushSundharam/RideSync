import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, User, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center h-full">
        <Link to="/" className="navbar-brand flex items-center gap-sm" style={{textDecoration: 'none'}}>
          <Car size={28} color="var(--accent-primary)" />
          <h2 style={{color: 'var(--text-primary)'}}>RideSync</h2>
        </Link>
        
        <div className="navbar-actions flex items-center gap-md">
          {user ? (
            <>
              <div className="user-info flex items-center gap-sm">
                <User size={20} />
                <span>{user.name}</span>
                <span className="role-badge">{user.role}</span>
              </div>
              <button className="btn-icon" onClick={handleLogout} title="Logout">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
