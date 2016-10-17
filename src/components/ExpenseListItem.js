import React from 'react'

const convertToUSD = (number) => {
  return '$' + parseInt(number, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}


export const ExpenseListItem = ({category, title, date, amount, type, handleItemClick}) =>
  <div className="expense-list-item">
    {/* <div className="title">{title ? title : category}</div> */}
    <div className="category">{category}</div>
    <div className="amount">{convertToUSD(amount)}</div>
    <div className="date">{date}</div>
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
