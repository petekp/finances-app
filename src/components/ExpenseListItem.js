import React from 'react'

export const ExpenseListItem = ({category, title, date, amount, type, handleItemClick}) =>
  <div className="expense-list-item" onClick={handleItemClick}>
    <div className="title">{title}</div>
    <div className="category">{category}</div>
    <div className="date">{date}</div>
    <div className="amount">{amount}</div>
    <div className="type">{type}</div>
  </div>
