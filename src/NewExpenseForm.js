import React from 'react'
import {categories} from './config'

export const NewExpenseForm = (props) =>
  <form onSubmit={props.handleFormSubmit}>
    <fieldset>
      <div className="input-group">
        <label>
          <span>Title</span>
          <input type="text"
                 name="title"
                 placeholder={props.formState.category}
                 size="15"
                 value={props.formState.title}
                 onChange={props.handleChange} />
        </label>
      </div>

      <div className="input-group">
        <label>
          <span>Category</span>
          <select name="category"
                  value={props.formState.category}
                  onChange={props.handleChange}>
            {categories.map((category, i) => (
              <option key={i} value={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="input-group">
        <label>
          <span>Date</span>
          <input type="date"
                 name="date"
                 value={props.formState.date}
                 onChange={props.handleChange} />
        </label>
      </div>

      <div className="input-group">
        <label>
          <span>Amount</span>
          <input type="text"
                 name="amount"
                 value={props.formState.amount}
                 onChange={props.handleChange} />
        </label>
      </div>

      <div className="input-group">
        <label>
          <span>Type</span>
          <label>
            <input type="radio"
                   name="type"
                   value="Credit"
                   checked={props.formState.type === 'Credit'}
                   onChange={props.handleChange}/>
            <span>Credit</span>
          </label>
          <label>
            <input type="radio"
                   name="type"
                   value="Debit"
                   checked={props.formState.type === 'Debit'}
                   onChange={props.handleChange} />
            <span>Debit</span>
          </label>
        </label>
      </div>
    </fieldset>

    <button type="submit">Add Expense 👉</button>
  </form>
