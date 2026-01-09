import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiDollarSign, FiTrendingDown, FiLogOut } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, onLogout, currentPath }) => {
  const navItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/income', icon: FiDollarSign, label: 'Income' },
    { path: '/expense', icon: FiTrendingDown, label: 'Expenses' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>💰 Expense Tracker</h2>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon className="nav-icon" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button className="nav-item logout-btn" onClick={onLogout}>
          <FiLogOut className="nav-icon" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;

