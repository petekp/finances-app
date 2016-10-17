import React from 'react'
import {categories} from './config'
import {InputGroup} from './InputGroup'

export const AddExpenseForm = ({...formState, handleFormSubmit, handleChange}) =>
  <form onSubmit={handleFormSubmit}>
    <fieldset>
      {/*
      <InputGroup label="Title">
        <input type="text"
               name="title"
               value={formState.title}
               onChange={handleChange} />
      </InputGroup>
      */}

      <InputGroup label="Category">
        <select name="category"
                value={formState.category}
                onChange={handleChange}>
          {categories.map((category, i) => (
            <option key={i} value={category}>{category}</option>
          ))}
        </select>
      </InputGroup>

      <InputGroup label="Date">
        <input type="date"
               name="date"
               value={formState.date}
               onChange={handleChange}
               autoComplete="off" />
      </InputGroup>

      <InputGroup label="Amount">
        <input type="text"
               name="amount"
               value={formState.amount}
               autoComplete="off"
               onChange={handleChange} />
      </InputGroup>

      <InputGroup label="Type">
        <label>
          <input type="radio"
                 name="type"
                 value="Credit"
                 checked={formState.type === 'Credit'}
                 onChange={handleChange}/>
          <span>Credit</span>
        </label>
        <label>
          <input type="radio"
                 name="type"
                 value="Debit"
                 checked={formState.type === 'Debit'}
                 onChange={handleChange} />
          <span>Debit</span>
        </label>
      </InputGroup>
    </fieldset>
    <button type="submit">Add Expense 👉</button>
  </form>
