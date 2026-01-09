import React from 'react';
import { FiDollarSign, FiTrendingDown } from 'react-icons/fi';
import './RecentTransactions.css';

const RecentTransactions = ({ income, expenses }) => {
  const allTransactions = [
    ...income.slice(0, 5).map(item => ({ ...item, type: 'income' })),
    ...expenses.slice(0, 5).map(item => ({ ...item, type: 'expense' }))
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

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

  return (
    <div className="recent-transactions">
      <h2>Recent Transactions</h2>
      {allTransactions.length > 0 ? (
        <div className="transactions-list">
          {allTransactions.map((transaction) => (
            <div key={transaction._id} className={`transaction-item ${transaction.type}`}>
              <div className="transaction-icon">
                {transaction.type === 'income' ? (
                  <FiDollarSign />
                ) : (
                  <FiTrendingDown />
                )}
              </div>
              <div className="transaction-details">
                <h4>{transaction.title}</h4>
                <p className="transaction-date">{formatDate(transaction.date)}</p>
                {transaction.category && (
                  <span className="transaction-category">{transaction.category}</span>
                )}
              </div>
              <div className={`transaction-amount ${transaction.type}`}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-transactions">
          <p>No transactions yet. Start by adding income or expenses!</p>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;

