import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { FiDownload, FiPlus } from 'react-icons/fi';
import { API_ENDPOINTS } from '../../config/api';
import './Expense.css';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setError('');
      const response = await axios.get(API_ENDPOINTS.EXPENSE.BASE);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setError('Failed to load expense data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (expenseData) => {
    try {
      const response = await axios.post(API_ENDPOINTS.EXPENSE.BASE, expenseData);
      setExpenses([response.data, ...expenses]);
      setShowForm(false);
      setError('');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding expense. Please try again.';
      setError(errorMessage);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      await axios.delete(`${API_ENDPOINTS.EXPENSE.BASE}/${id}`);
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense. Please try again.');
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.EXPENSE.EXPORT, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `expense-report-${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting expense:', error);
      alert('Failed to export expense data. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading expense data...</p>
      </div>
    );
  }

  return (
    <div className="expense-page">
      <div className="page-header">
        <h2>Expense Management</h2>
        <div className="header-actions">
          {expenses.length > 0 && (
            <button onClick={handleExport} className="btn-export">
              <FiDownload /> Export to Excel
            </button>
          )}
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            <FiPlus /> {showForm ? 'Cancel' : 'Add Expense'}
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <ExpenseForm 
          onSubmit={handleAdd} 
          onCancel={() => {
            setShowForm(false);
            setError('');
          }} 
        />
      )}

      <ExpenseList expenses={expenses} onDelete={handleDelete} />
    </div>
  );
};

export default Expense;

