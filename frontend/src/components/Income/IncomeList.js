import React, { useState } from 'react';
import { FiDollarSign, FiTrash2 } from 'react-icons/fi';
import './IncomeList.css';

const IncomeList = ({ incomes, onDelete }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (incomes.length === 0) {
    return (
      <div className="empty-state">
        <FiDollarSign className="empty-icon" />
        <p>No income records yet. Add your first income!</p>
      </div>
    );
  }

  return (
    <div className="income-list">
      {incomes.map((income) => (
        <div
          key={income._id}
          className="income-card"
          onMouseEnter={() => setHoveredId(income._id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="income-icon">
            <FiDollarSign />
          </div>
          <div className="income-details">
            <h4>{income.title}</h4>
            <p className="income-date">{formatDate(income.date)}</p>
            {income.description && (
              <p className="income-description" title={income.description}>
                {income.description}
              </p>
            )}
          </div>
          <div className="income-amount">{formatCurrency(income.amount)}</div>
          {hoveredId === income._id && (
            <button
              className="delete-btn"
              onClick={() => onDelete(income._id)}
              aria-label="Delete income"
              title="Delete income"
            >
              <FiTrash2 />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default IncomeList;

