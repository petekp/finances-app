import React from 'react'

export const InputGroup = (props) =>
  <div className="input-group">
    <label>
      <span>{props.label}</span>
      {props.children}
    </label>
  </div>
