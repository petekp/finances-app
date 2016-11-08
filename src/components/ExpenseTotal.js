import React from 'react'
import {convertToUSD} from '../helpers'

export const ExpenseTotal = ({expenses}) => {
  const expenseArray = expenses.map(expense => {
    return parseInt(expense.amount)
  })

  const totalExpenses = expenseArray.reduce((a, b) => {
    return a + b
  }, 0)

  return (
    <div>
        {convertToUSD(totalExpenses)}
    </div>
  )
}
