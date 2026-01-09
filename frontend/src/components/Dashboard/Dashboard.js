import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryCards from './SummaryCards';
import Charts from './Charts';
import RecentTransactions from './RecentTransactions';
import { API_ENDPOINTS } from '../../config/api';
import './Dashboard.css';

const Dashboard = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setError('');
      const [incomeRes, expenseRes] = await Promise.all([
        axios.get(API_ENDPOINTS.INCOME.BASE),
        axios.get(API_ENDPOINTS.EXPENSE.BASE)
      ]);
      setIncome(incomeRes.data);
      setExpenses(expenseRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchData} className="retry-btn">Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <SummaryCards 
        balance={balance}
        income={totalIncome}
        expenses={totalExpenses}
      />
      <Charts income={income} expenses={expenses} />
      <RecentTransactions income={income} expenses={expenses} />
    </div>
  );
};

export default Dashboard;

