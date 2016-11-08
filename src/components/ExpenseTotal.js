import React from 'react'
import {convertToUSD} from '../helpers'
import styled from 'styled-components'

const Padding = styled.div`
  padding: 1em 2em;
  text-align: center;
`

const BigNumbers = styled.div`
  flex: 0 0 auto;
  font-size: 3em;
  font-weight: 600;
`

export const ExpenseTotal = ({expenses}) => {
  const expenseArray = expenses.map(expense => {
    return parseInt(expense.amount)
  })

  const totalExpenses = expenseArray.reduce((a, b) => {
    return a + b
  }, 0)

  return (
    <Padding>
      <p>total expenses:</p>
        <BigNumbers>
            {convertToUSD(totalExpenses)}
        </BigNumbers>
    </Padding>

  )
}
