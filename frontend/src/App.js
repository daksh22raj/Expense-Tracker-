import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Income from './components/Income/Income';
import Expense from './components/Expense/Expense';
import Layout from './components/Layout/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

function App() {
  // Basename for GitHub Pages deployment
  // This matches the repository name in the GitHub Pages URL
  const basename = '/Expense-Tracker-';
  
  return (
    <AuthProvider>
      <Router basename={basename}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="expense" element={<Expense />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

