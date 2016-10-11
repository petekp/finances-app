import React from 'react'
import {ExpenseListItem} from './ExpenseListItem'

const renderItems = (props) =>
  Object.keys(props).map((prop, i) => {
    const data = props[prop]
    return (<ExpenseListItem {...data} key={i} />)
  })

export const ExpenseList = props =>
  <div className="expense-list">
    {renderItems(props)}
  </div>
