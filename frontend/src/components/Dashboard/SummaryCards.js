import React from 'react';
import { FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import './SummaryCards.css';

const SummaryCards = ({ balance, income, expenses }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="summary-cards">
      <div className={`summary-card balance ${balance < 0 ? 'negative' : ''}`}>
        <div className="card-icon">
          <FiDollarSign />
        </div>
        <div className="card-content">
          <h3>Total Balance</h3>
          <p className="amount">{formatCurrency(balance)}</p>
        </div>
      </div>
      <div className="summary-card income-card">
        <div className="card-icon">
          <FiTrendingUp />
        </div>
        <div className="card-content">
          <h3>Total Income</h3>
          <p className="amount">{formatCurrency(income)}</p>
        </div>
      </div>
      <div className="summary-card expense-card">
        <div className="card-icon">
          <FiTrendingDown />
        </div>
        <div className="card-content">
          <h3>Total Expenses</h3>
          <p className="amount">{formatCurrency(expenses)}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;

