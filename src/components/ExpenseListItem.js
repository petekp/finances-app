import React from 'react'

export const ExpenseListItem = ({category, title, date, amount, type, handleItemClick}) =>
  <div className="expense-list-item">
    <div className="title">{title}</div>
    <div className="category">{category}</div>
    <div className="date">{date}</div>
    <div className="amount">{amount}</div>
    <div className="type">{type}</div>
    <div className="controls">
      <div className="edit">
        <span>✎</span>
      </div>
      <div className="remove" onClick={handleItemClick}>
        <span>✕</span>
      </div>
    </div>
  </div>
