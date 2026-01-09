import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IncomeForm from './IncomeForm';
import IncomeList from './IncomeList';
import { FiDownload, FiPlus } from 'react-icons/fi';
import { API_ENDPOINTS } from '../../config/api';
import './Income.css';

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      setError('');
      const response = await axios.get(API_ENDPOINTS.INCOME.BASE);
      setIncomes(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
      setError('Failed to load income data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (incomeData) => {
    try {
      const response = await axios.post(API_ENDPOINTS.INCOME.BASE, incomeData);
      setIncomes([response.data, ...incomes]);
      setShowForm(false);
      setError('');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding income. Please try again.';
      setError(errorMessage);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this income?')) {
      return;
    }

    try {
      await axios.delete(`${API_ENDPOINTS.INCOME.BASE}/${id}`);
      setIncomes(incomes.filter(income => income._id !== id));
    } catch (error) {
      console.error('Error deleting income:', error);
      alert('Failed to delete income. Please try again.');
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.INCOME.EXPORT, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `income-report-${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting income:', error);
      alert('Failed to export income data. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading income data...</p>
      </div>
    );
  }

  return (
    <div className="income-page">
      <div className="page-header">
        <h2>Income Management</h2>
        <div className="header-actions">
          {incomes.length > 0 && (
            <button onClick={handleExport} className="btn-export">
              <FiDownload /> Export to Excel
            </button>
          )}
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            <FiPlus /> {showForm ? 'Cancel' : 'Add Income'}
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <IncomeForm 
          onSubmit={handleAdd} 
          onCancel={() => {
            setShowForm(false);
            setError('');
          }} 
        />
      )}

      <IncomeList incomes={incomes} onDelete={handleDelete} />
    </div>
  );
};

export default Income;

