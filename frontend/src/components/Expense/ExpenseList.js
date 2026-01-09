import React, { useState } from 'react';
import { FiTrendingDown, FiTrash2 } from 'react-icons/fi';
import './ExpenseList.css';

const ExpenseList = ({ expenses, onDelete }) => {
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

  const getCategoryColor = (category) => {
    const colors = {
      Food: '#ff6b6b',
      Transport: '#4ecdc4',
      Shopping: '#ffe66d',
      Bills: '#95e1d3',
      Entertainment: '#f38181',
      Health: '#aa96da',
      Education: '#fcbad3',
      Other: '#a8d8ea'
    };
    return colors[category] || '#a8d8ea';
  };

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <FiTrendingDown className="empty-icon" />
        <p>No expense records yet. Add your first expense!</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <div
          key={expense._id}
          className="expense-card"
          onMouseEnter={() => setHoveredId(expense._id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div 
            className="expense-icon"
            style={{ background: getCategoryColor(expense.category) }}
          >
            <FiTrendingDown />
          </div>
          <div className="expense-details">
            <h4>{expense.title}</h4>
            <p className="expense-date">{formatDate(expense.date)}</p>
            <span 
              className="expense-category"
              style={{ 
                backgroundColor: getCategoryColor(expense.category) + '30',
                color: getCategoryColor(expense.category)
              }}
            >
              {expense.category}
            </span>
            {expense.description && (
              <p className="expense-description" title={expense.description}>
                {expense.description}
              </p>
            )}
          </div>
          <div className="expense-amount">{formatCurrency(expense.amount)}</div>
          {hoveredId === expense._id && (
            <button
              className="delete-btn"
              onClick={() => onDelete(expense._id)}
              aria-label="Delete expense"
              title="Delete expense"
            >
              <FiTrash2 />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;

